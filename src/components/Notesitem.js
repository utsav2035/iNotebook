import React, { useContext } from 'react'
import noteContext from "../context/notes/NoteContext"



const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-item-center">
                        <h5 className="card-title mx-2">{note.title}</h5>
                        <i className="fa-solid fa-trash my-1 mx-2" onClick={() => { deleteNote(note._id) }}></i>
                        <i className="fa-solid fa-pen-to-square my-1 mx-2" onClick={() => { updateNote(note) }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem