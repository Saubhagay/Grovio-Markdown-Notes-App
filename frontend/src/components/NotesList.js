import React from 'react';

const NotesList = ({ notes, currentNoteId, selectNote, deleteNote }) => {
    if (notes.length === 0) {
        return <p className="notes-empty">No notes found</p>;
    }

    return (
        <div className="notes-list">
            {notes.map((note) => (
                <div key={note.id} className="note-item">
                    <button
                        className={`note-select ${currentNoteId === note.id ? 'active' : ''}`}
                        onClick={() => selectNote(note)}
                    >
                        <span className="note-title">{note.title}</span>
                        <span className="note-hint">Open</span>
                    </button>
                    <button className="note-delete" onClick={() => deleteNote(note.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default NotesList;