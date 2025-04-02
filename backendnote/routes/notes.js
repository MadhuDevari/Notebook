const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

//Route 1: Fetch Notes
router.get('/getnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})


//Route 2: Add notes
router.post('/addnotes', fetchuser, [
    body('title', 'Please enter title').isLength({ min: 5 }),
    body('description', 'Please enter description').isLength({ min: 5 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {title, description, tag} = req.body;

        const notes = new Notes({title, description, tag, user: req.user.id});

        const savedNotes = await notes.save();

        res.json(savedNotes);


    } catch(error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})


//Route 3: Update Notes
router.put('/updatenotes/:id', fetchuser,  async (req, res) => {

    try {

    const {title, description, tag} = req.body;

    const newNotes = {};

    if(title){newNotes.title = title};
    if(description){newNotes.description = description};
    if(tag){newNotes.tag = tag};

    let notes = await Notes.findById(req.params.id);
    if(!notes) { return res.status(404).send("Not Found"); }

    if(notes.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }

    notes = await Notes.findByIdAndUpdate(req.params.id, {$set: newNotes}, {new: true})

    res.json({notes});

} catch(error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
}

})


//Route 4: Delete Note
router.delete('/deletenote/:id', fetchuser,  async (req, res) => {

    try {

    const {title, description, tag} = req.body;

    let notes = await Notes.findById(req.params.id);
    if(!notes) { return res.status(404).send("Not Found"); }

    if(notes.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }

    notes = await Notes.findByIdAndDelete(req.params.id)

    res.json({"Success": "Note has been deleted"});

} catch(error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
}

})

module.exports = router