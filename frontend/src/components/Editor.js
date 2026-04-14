import React from 'react';

const Editor = ({ note, updateNote, saveStatus }) => {
    if (!note) return <div className="empty-state card-panel">Select a note to edit</div>;

    return (
        <section className="editor-panel card-panel">
            <div className="panel-heading">
                <h2>Editor</h2>
                <span className="save-status">{saveStatus}</span>
            </div>
            <input
                className="editor-title"
                value={note.title}
                onChange={(e) => updateNote({ ...note, title: e.target.value })}
                placeholder="Title"
            />
            <textarea
                className="editor-textarea"
                value={note.content}
                onChange={(e) => updateNote({ ...note, content: e.target.value })}
                placeholder="Write your markdown..."
            />
        </section>
    );
};

export default Editor;