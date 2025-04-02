import React, { useContext } from 'react'
import noteContext from '../context/noteContext'

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const { note, updateNote } = props;
    return (
        <div className="col-md-3 mb-4">
            <div className='card'>
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">{note.title}</h5>
                    <div className='d-flex align-items-center gap-2'>
                        <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
                        <i className="fa-solid fa-trash-can" onClick={()=>{deleteNote(note._id); props.showAlert("success", "Deleted Successfully");}}></i>
                    </div>
                </div>
                <p className="card-text mb-2">{note.description}</p>
                <p className="card-text">{note.tag}</p>
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div>
        </div>
        </div>
    )
}

export default NoteItem
