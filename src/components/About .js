import React,{useContext, useEffect} from 'react'
import NoteContext from '../Context/notes/NoteContext'
function About () {
  const {update,ChangeState} = useContext(NoteContext)

  useEffect(() => {
  ChangeState()
  },[])
  return (
    <div>about{update?.name}  and age {update?.age}</div>
  )
}

export default About 