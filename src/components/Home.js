import React, { useContext, useState } from 'react';
import Notes from './Notes';
import NoteContext from '../Context/notes/NoteContext';

function Home() {
  const { addNote } = useContext(NoteContext);

  // State to manage form inputs
  const [note, setNote] = useState({
    title: '',
    author: '',
    description: '',
    tag: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value, // Dynamically update state
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    addNote(note); // Call addNote function
    setNote({ title: '', author: '', description: '', tag: '' }); // Reset the form
  };

  return (
    <>
      <div className="container my-3">
        <h4>Add a Note</h4>
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
              name="tags"
              value={note.tag}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Notes />
    </>
  );
}

export default Home;
