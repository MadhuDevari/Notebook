import React, {useState} from 'react';
import NoteContext from './noteContext';


const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);
 

    const getNotes = async () => {
      const myRequest = new Request(`${host}/api/notes/getnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      const response = await fetch(myRequest);
      const json = await response.json();
      setNotes(json);
    }


    const addNote = async (title, description, tag) => {

      const myRequest = new Request(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag}),
      });
      const response = await fetch(myRequest);
      const note = await response.json();
    //   console.log(json);
    // const note = json;
      setNotes(notes.concat(note));
    }

    const deleteNote = async (id) => {

      const myRequest = new Request(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const response = await fetch(myRequest);
      const json = await response.json();
      console.log(json);

      const delNote = notes.filter((note)=>{return note._id!==id});
      setNotes(delNote);
    }

    const editNote = async (id, title, description, tag) => {

      const myRequest = new Request(`${host}/api/notes/updatenotes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag}),
      });
      const response = await fetch(myRequest);
      const json = await response.json();
      console.log(json);


      let newNotes = JSON.parse(JSON.stringify(notes))

      for(let index=0; index<newNotes.length; index++){
        const element=newNotes[index];
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
      
    }

  return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes }}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;