import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

function Note(props) {
  
  let toDelete= {};

  function handleClick() {

    axios.get("http://localhost:8000/")
    .then(res => {
      
      console.log(res.data);
      toDelete = (res.data).slice(-1);
      console.log(toDelete[0]);

      axios.delete(`http://localhost:8000/${toDelete[0]._id}`).catch(e => {console.error(e)});

    })
    .catch(e => {
      console.error(e)
    });

    props.onDelete(props.id);

  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;

