import { useEffect, useState } from 'react';
import api from '../api';

const Home = () => {

    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    const getNotes = () => {
        api.get("/api/notes/")
        .then((res) => res.data)
        .then((data) => { 
            setNotes(data); 
            console.log(data)
        })
        .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
        .then((res) => {
            if (res.status === 204) alert("Note deleted!");
            else alert("Failed to delete the note.");
        })
        .catch((err) => alert(err));

        getNotes()
    }


    const createNote = (e) => {
        e.preventDefault();
        api.post("api/notes/", {content, title})
        .then((res) => {
            if (res.status === 201) alert("Note created!");
            else alert("Failed to make note.");
        })
        .catch((err) => alert(err));

        getNotes();
    }

    return(
        <div></div>
    )
}

export default Home;