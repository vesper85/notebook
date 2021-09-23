import React, { useContext } from 'react'
import noteContext from '../context/Notes/noteContext';




export const NoteItem = (props) => {
    const context = useContext(noteContext)
    
    const { updateNote, note } = props;
    const {deletenote} = context;
    return (
        <div className="col-md-3 my-3" key = {props.note._id}>
            <div className="card" >
            <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>  
            <i className="far fa-trash-alt mx-2 del-btn" onClick={()=>{ deletenote(props.note._id) }}></i>
            <i className="far fa-edit mx-2 edit-btn " onClick={()=>{updateNote(note)}}  ></i>
            </div>
            </div>
        </div>
    )
}
export default NoteItem
