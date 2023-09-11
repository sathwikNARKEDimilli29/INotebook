import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: " ",
    description: " ",
    tag: " ",
  });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    // console.log(note.tag);
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note Added  Successfully!!", "success");
  };

  return (
    <div className="container my-3">
      <h2>Add Notes</h2>
      <form action="" className="my-3">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">
            <strong>Title :</strong>
          </label>
          <input
            className="form-control"
            type="text"
            id="title"
            name="title"
            value={note.title}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">
            <strong>Description : </strong>
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="5"
            value={note.description}
            onChange={onChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">
            <strong>Tags :</strong>
          </label>
          <input
            className="form-control"
            type="text"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>
        <div className="container my-5">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
}
