import React,{useContext} from 'react'
import NoteContext from '../Context/notes/NoteContext'
import NoteItem from './NoteItem'
function Notes() {
  const {allNotes} = useContext(NoteContext)
  return (
  <div>
    <h2>Your notes</h2>
    <NoteItem allNotes={allNotes}/>
  </div>
   
  )
}

export default Notes