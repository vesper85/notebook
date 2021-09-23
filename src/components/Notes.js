import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import noteContext from '../context/Notes/noteContext';
import { NoteItem } from './NoteItem';
import Addnote from './Addnote'




 const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getnotes  } = context;

  
  useEffect(() => {
    getnotes();
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const [note, setNote] = useState({etitle:"", edescription:"",etag: ""})

  const updateNote = (currentNote)=>{
    console.log('edit btn clicked');
    ref.current.click()
    setNote({etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
  }

  const handleClick = (e)=>{
    e.preventDefault();
    console.log('updating the note');
  }
  const onChange = (e)=>{
   setNote({...note, [e.target.name]:e.target.value})
  }





  return (
    <div className="container">
      {/* MODAL */}
        <div>
        <Addnote />
          <button ref={ref} type="button" className="btn btn-primary invisible" data-bs-toggle="modal" data-bs-target="#exampleModal">
            
          </button>

          
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                 {/* Edit form */}

                      <div>
                          <div className="container my-5">
                            <h2>Add a note </h2>
                            <div className="mb-3">
                              <label htmlFor="etitle" className="form-label">Title</label>
                              <input value={note.etitle} onChange={onChange} type="text" className="form-control" id="etitle" name="etitle" placeholder="Title"  />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="edescription" className="form-label">Description</label>
                              <textarea value={note.edescription} onChange={onChange} className="form-control" id="edescription" name="edescription" rows="3"  ></textarea>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="etag" className="form-label">Tag</label>
                              <input value={note.etag} onChange={onChange} type="text" className="form-control" id="etag" name="etag" placeholder="Tag" />
                            </div>
                          </div>
                      </div>


                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-dark" onClick= {handleClick}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
      </div>

      
      <h2>View notes </h2>
      <div className="row my-3">
        {notes.map((note) => {
          return <NoteItem updateNote={updateNote} note={note} />;
        })}
      </div>
    </div>
  );
};
 export default Notes

