import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Notes = (props) => {
    let history = useHistory();
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else {
            history.push("/login");
        }
    }, [getNotes, history])

    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: "" });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("success", "Updated Note Successfully");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" onChange={onChange} name="etitle" value={note.etitle} placeholder="" minLength={5} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="edescription" onChange={onChange} name="edescription" value={note.edescription} rows="3" minLength={5}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" onChange={onChange} name="etag" value={note.etag} placeholder="" />
                                </div>
                                {/* <button type="submit" className="btn btn-primary mb-3" onClick={handleClick}>Submit</button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <h2>Notes as follows:</h2>
            <div className="row">

                <div className='container mb-2 text-center'>
                    {notes.length===0 && 'No notes to display'}
                </div>
                {
                    notes.map((note) => {
                        return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />;
                    })
                }
            </div>
        </>
    )
}

export default Notes
