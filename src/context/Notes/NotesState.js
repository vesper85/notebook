import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props)=>{
    const InitialNote = []
    const [notes, setnotes] = useState(InitialNote)


    // GET all notes of a user from db
    const getnotes = async ()=>{
      // api end point to fetch all the notes
      const url = "http://localhost:5000/api/notes/fetchallnotes";
      // sending a GET request with authtoken for verification
      const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          // no need of user if because the JWT token already has one
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzYjQ3OTM2YzVjOTRkMDhjODc3NmJhIn0sImlhdCI6MTYzMTM3OTU4MH0.caxOkkPNHJQIjMEIPHjIRig-YTBbuz3UWgEGeMFaqos'
        },
      })
      // converting the response into json format
      const json = await response.json();
      //console.log(json);
      console.log('get all notes check');
      setnotes(json)
    }





    // ADD a note 
    const addnote = async (title, description, tag)=>{
    

      // API call
      const url = "http://localhost:5000/api/notes/addnote"
      // eslint-disable-next-line
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          // no need of user if because the JWT token already has one
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzYjQ3OTM2YzVjOTRkMDhjODc3NmJhIn0sImlhdCI6MTYzMTM3OTU4MH0.caxOkkPNHJQIjMEIPHjIRig-YTBbuz3UWgEGeMFaqos'
        },
        body:JSON.stringify({title, description, tag})
        
      })
      //console.log(response);
      console.log('add a note check');

    }





    // delete a note || will take id of the note to be deleted
    const deletenote = async (id)=>{
      //console.log('deleting note with id', id);
      //to delete a note we use filter then set the new note to the note without the keyid
      // delete for backend
      // API call
      const url =`http://localhost:5000/api/notes/deletenote/${id}`;
      // eslint-disable-next-line
      const response = await fetch(url,{
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          // no need of user if because the JWT token already has one
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzYjQ3OTM2YzVjOTRkMDhjODc3NmJhIn0sImlhdCI6MTYzMTM3OTU4MH0.caxOkkPNHJQIjMEIPHjIRig-YTBbuz3UWgEGeMFaqos'
        },
      })
      //console.log('note deleted');
      //console.log(response);
      console.log('delete a note check');
      // delete for front end
      const newNote = notes.filter((note)=>{ return note._id !== id})
      setnotes(newNote)


    }


    // EDIT a note
    const editnote = async(id, title, description, tag)=>{

      //API call
      const url = `http://localhost:5000/api/notes/updatenote/${id}`;
      // eslint-disable-next-line
      const response = await fetch(url,{
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
        // no need of user if because the JWT token already has one
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzYjQ3OTM2YzVjOTRkMDhjODc3NmJhIn0sImlhdCI6MTYzMTM3OTU4MH0.caxOkkPNHJQIjMEIPHjIRig-YTBbuz3UWgEGeMFaqos'
        },
        body:JSON.stringify({title, description, tag})
      })


      // logic to edit in client
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id === id)
        {
          element.title = title;
          element.description = description;
          element.tag = tag;
        }
        
      }
    }
        

    return (
        <noteContext.Provider value={{notes,addnote,deletenote, getnotes, editnote}}>
            {/* the below code means that the components that are 
            wrapped by the noteState tag will all be the chlidren */}
            {props.children}    
        </noteContext.Provider>
    )
}
export default NoteState