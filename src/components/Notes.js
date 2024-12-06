import React, { useContext, useRef, useState } from 'react';
import NoteContext from '../Context/notes/NoteContext';
import NoteItem from './NoteItem';

function Notes() {
  const { allNotes, updateNote } = useContext(NoteContext);
  const modalRef = useRef(); // Ref for the modal dialog
  const ref = useRef('');
  const [note, setNote] = useState({
    title: '',
    author: '',
    description: '',
    tags: '',
  });

  const update = (note) => {
    ref.current.click();
    setNote(note);
  };

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value, // Dynamically update state
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Save changes
    updateNote(note);

    // Reset the form
    setNote({ title: '', author: '', description: '', tags: '' });

    // Close the modal
    const modalInstance = window.bootstrap.Modal.getInstance(modalRef.current);
    modalInstance.hide();
  };

  return (
    <div>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit Your Note
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        ref={modalRef} // Attach the modal reference
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form className="mb-3" onSubmit={handleSubmit}>
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={note.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Author:</label>
                <input
                  type="text"
                  name="author"
                  value={note.author}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Description:</label>
                <input
                  type="text"
                  name="description"
                  value={note.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Tags:</label>
                <input
                  type="text"
                  name="tag"
                  value={note.tag}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <h2>Your notes</h2>
      <NoteItem allNotes={allNotes} update={update} />
    </div>
  );
}

export default Notes;
