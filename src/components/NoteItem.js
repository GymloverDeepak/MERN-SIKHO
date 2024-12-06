import React, { useContext, useEffect } from 'react';
import NoteContext from '../Context/notes/NoteContext';

function NoteItem({ allNotes }) {
  const { fetchData } = useContext(NoteContext);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {allNotes?.length > 0 ? (
        allNotes.map((note, index) => (
          <div className="card my-3" style={{ width: '18rem' }} key={index}>
            <img src="..." className="card-img-top" alt="Note" />
            <div className="card-body">
              <h5 className="card-title">{note?.title || 'No Title'}</h5>
              <p className="card-text">{note?.description || 'No Description'}</p>
              <i className="fa-solid fa-trash mx-2"></i>
              <i className="fa-regular fa-pen-to-square mx-2"></i>
            </div>
          </div>
        ))
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
}

export default NoteItem;
