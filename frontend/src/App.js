import React, { useEffect, useMemo, useState } from 'react';
import NotesList from './components/NotesList';
import Editor from './components/Editor';
import Preview from './components/Preview';
import { useNotes } from './hooks/useNotes';
import './styles.css';

function App() {
  const {
    notes,
    currentNote,
    saveStatus,
    addNote,
    updateCurrentNote,
    deleteNoteById,
    selectNote,
  } = useNotes();

  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const filteredNotes = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return notes;

    return notes.filter((note) =>
      `${note.title} ${note.content}`.toLowerCase().includes(query)
    );
  }, [notes, searchTerm]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    return () => document.body.classList.remove('dark-mode');
  }, [isDarkMode]);

  return (
    <div className="app-shell">
      <header className="app-hero">
        <div>
          <p className="eyebrow">Markdown notes</p>
          <h1>Write, preview, and organize notes in one workspace.</h1>
        </div>
        <div className="hero-actions">
          <button className="secondary-button" onClick={() => setIsDarkMode((prev) => !prev)}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button className="primary-button" onClick={addNote}>Add Note</button>
        </div>
      </header>

      <div className="app-container">
        <aside className="sidebar card-panel">
          <div className="panel-heading">
            <h2>Notes</h2>
            <span>{filteredNotes.length}</span>
          </div>
          <input
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search notes"
          />
          <NotesList
            notes={filteredNotes}
            currentNoteId={currentNote?.id}
            selectNote={selectNote}
            deleteNote={deleteNoteById}
          />
        </aside>
        <div className="editor-preview">
          <Editor note={currentNote} updateNote={updateCurrentNote} saveStatus={saveStatus} />
          <Preview note={currentNote} />
        </div>
      </div>
    </div>
  );
}

export default App;