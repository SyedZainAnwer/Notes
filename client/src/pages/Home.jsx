import { useEffect, useState } from 'react';
import api from '../api';
import Note from '../components/Note';
import '../styles/Home.css'

const Home = () => {

    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    const getNotes = () => {
        api.get("/api/note/")
        .then((res) => res.data)
        .then((data) => { 
            setNotes(data); 
            console.log(data)
        })
        .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api.delete(`/api/note/delete/${id}/`)
        .then((res) => {
            if (res.status === 204) alert("Note deleted!");
            else alert("Failed to delete the note.");
            getNotes();
        })
        .catch((err) => alert(err));

    }


    const createNote = (e) => {
        e.preventDefault();
        api.post("api/note/", {content, title})
        .then((res) => {
            if (res.status === 201) alert("Note created!");
            else alert("Failed to make note.");
            getNotes();
        })
        .catch((err) => alert(err));

    }

    return(
        <div>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => 
                    <Note 
                        note={note} 
                        onDelete={deleteNote} 
                        key={note.id}
                    />
                )}
            </div>

            <h2>Create a Notes</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />

                <input 
                    type="text" 
                    id='title' 
                    name='title' 
                    required 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                
                <label htmlFor="content">Content:</label>
                <br />
                
                <textarea 
                    id='content' 
                    name='content' 
                    required 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                />
                <br />

                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Home;