import React, { useContext, useState } from 'react'
import noteContext from "../context/Notes/noteContext";


const Addnote = () => {

    // adding context so that we can update the state i.e. adding a note
    const context = useContext(noteContext)
    const {addnote} = context;

    // we need to create a state to update the note that we are creating 
    // this state will only be accessible to this component
    const [note, setnote] = useState({title:"", description:"", tag:"default"})

    const onChange = (e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }

    const handleOnClick = (e)=>{
        e.preventDefault();
        addnote(note.title, note.description, note.tag)
    }

    return (
        <div>
            <div className="container my-5">
            <h2>Add a note </h2>
            <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" placeholder="Title" onChange={onChange} />
            </div>
            <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name="description" rows="3" onChange={onChange} ></textarea>
            </div>
            <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" placeholder="Tag" onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-dark" onClick={handleOnClick}>Add note</button>
            </div>
        </div>
    )
}

export default Addnote
