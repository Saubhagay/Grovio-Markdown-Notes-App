import React from 'react';
import ReactMarkdown from 'react-markdown';

const Preview = ({ note }) => {
    if (!note) return <div className="empty-state card-panel">Preview will appear here</div>;
    return (
        <section className="preview-panel card-panel">
            <div className="panel-heading">
                <h2>Preview</h2>
            </div>
            <div className="markdown-body">
                <ReactMarkdown>{note.content}</ReactMarkdown>
            </div>
        </section>
    );
};

export default Preview;