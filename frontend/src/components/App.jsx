import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8000/")
    .then(res => {
      console.log(res.data);
      setNotes(res.data);
    })
    .catch(e => {
      console.error(e)
    });
  },[]);

  function addNote(newNote) {
    //console.log(newNote);
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => { 
        return noteItem._id !== id;
      });
    });
  }

  return (
    <div>
        <Header />
        <CreateArea onAdd={addNote} />
        {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
        })}
        <Footer />
      </div>
  );
}

export default App;
