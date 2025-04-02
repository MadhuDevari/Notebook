import React, { useContext, useState } from 'react'
import noteContext from '../context/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ "title": "", "description": "", "tag": "" });

    const handleClick = (e)=> {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        props.showAlert("success", "Note added Successfully");
        setNote({ "title": "", "description": "", "tag": "" });
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }

  return (
    <div>
      <h2 className="mb-3">Add Notes</h2>
      <form className="mb-12">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" onChange={onChange} name="title" value={note.title} placeholder="" minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" onChange={onChange} name="description" value={note.description} rows="3" minLength={5}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" onChange={onChange} name="tag" value={note.tag} placeholder="" />
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary mb-3" onClick={handleClick}>Submit</button>
      </form>
    </div>
  )
}

export default AddNote
