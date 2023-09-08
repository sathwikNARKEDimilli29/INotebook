//this file contains a list of state variables

import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  //sending the function and states

  const host = "http://localhost:5000";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  // Get all Notes
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlYjk0MWRmOGNmOTMyZDlkZDIxOWNkIn0sImlhdCI6MTY5MzE2MDQ5MH0.WDWYIUF1mT2nyRk6MX9tVAql0kIddHj7naL2Ycf6o7U",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlYjk0MWRmOGNmOTMyZDlkZDIxOWNkIn0sImlhdCI6MTY5MzE2MDQ5MH0.WDWYIUF1mT2nyRk6MX9tVAql0kIddHj7naL2Ycf6o7U",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // delete a note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlYjk0MWRmOGNmOTMyZDlkZDIxOWNkIn0sImlhdCI6MTY5MzE2MDQ5MH0.WDWYIUF1mT2nyRk6MX9tVAql0kIddHj7naL2Ycf6o7U",
      },
    });
    const json = await response.json();
    if (!json) {
      console.log("Error in edit note");
    }
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlYjk0MWRmOGNmOTMyZDlkZDIxOWNkIn0sImlhdCI6MTY5MzE2MDQ5MH0.WDWYIUF1mT2nyRk6MX9tVAql0kIddHj7naL2Ycf6o7U",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
