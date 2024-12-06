import React, { useState,useCallback } from "react";
import NoteContext from "./NoteContext";
import axios from "axios";
const NoteState = (props) => {
  const blog = {
    name: "Deepak",
    age: 28,
  };

const [allNotes,setAllNotes]= useState([null])

  const GET_API_URL = "http://localhost:5000";

  const [update, setUpdate] = useState(blog);
  // Fetch data function
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${GET_API_URL}/api/notes/fetchallnotes`, {
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczNDdkOWY2YjZhODcwN2U0YWRjMjA1In0sImlhdCI6MTczMTQ5MzI3OX0.tDDz0rVSGu-_ccVSi61TSURPajVfedqoCfLjlkrkc-c", // Replace with your actual token
          "Content-Type": "application/json",
        },
      });
      setAllNotes(response.data); // Set notes
    } catch (err) {
      console.error("Error fetching data:", err.message);
    }
  }, []);
  const ChangeState = () => {
    setTimeout(() => {
      setUpdate({
        name: "Sona",
        age: 30,
      });
    }, 2000);
  };

  // Add note

  const addNote = async (data) => {
    try {
      const response = await axios.post(
        `${GET_API_URL}/api/notes/addnote`,
        data, // Pass the actual data as the body
        {
          headers: {
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczNDdkOWY2YjZhODcwN2U0YWRjMjA1In0sImlhdCI6MTczMTQ5MzI3OX0.tDDz0rVSGu-_ccVSi61TSURPajVfedqoCfLjlkrkc-c", // Replace with your actual token
            "Content-Type": "application/json",
          },
        }
      );
  
      // Fetch the updated notes after adding
      fetchData();
      console.log("addNote", response.data);
    } catch (err) {
      console.error("Error adding note:", err.message);
    }
  };
  

  // delete note

  const deleteNote = (id) => {};

  // update edit  note

  const updateNote = async (data) => {
    try {
      const response = await axios.post(`${GET_API_URL}/api/notes//updatenote/${data.id}`, {
        headers: {
         "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczNDdkOWY2YjZhODcwN2U0YWRjMjA1In0sImlhdCI6MTczMTQ5MzI3OX0.tDDz0rVSGu-_ccVSi61TSURPajVfedqoCfLjlkrkc-c", // Replace with your actual token
          "Content-Type": "application/json",
        },
      });
      // Use the response data
      console.log( "updateNote",response.data);
      // setData(response.data);
    } catch (err) {
      console.error("Error fetching data:", err.message);
      // setError(err.message);
    }
    // const json = response.json();

    for (let index = 0; index < allNotes.length; index++) {
      const element = allNotes[index];
      if(element._id === data.id ){
        element.title = data.title;
        element.author = data.author;
        element.description=data.description;
        element.tag=data.tag;
      }
      
    }
  };

  return (
    <NoteContext.Provider value={{ update,allNotes,fetchData, ChangeState ,deleteNote,updateNote,addNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
