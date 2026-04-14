const { getAllNotes, createNote, updateNote, deleteNote } = require('../config/db');

exports.getNotes = (req, res, next) => {
    try {
        const results = getAllNotes();
        const notes = results[0] ? results[0].values.map(row => ({
            id: row[0],
            title: row[1],
            content: row[2]
        })) : [];
        res.json(notes);
    } catch (err) {
        next(err);
    }
};

exports.createNote = (req, res, next) => {
    try {
        const { title, content } = req.body;
        createNote(title, content);
        res.status(201).json({ success: true });
    } catch (err) {
        next(err);
    }
};

exports.updateNote = (req, res, next) => {
    try {
        const { title, content } = req.body;
        const { id } = req.params;
        const changes = updateNote(id, title, content);
        res.json({ updated: changes });
    } catch (err) {
        next(err);
    }
};

exports.deleteNote = (req, res, next) => {
    try {
        const { id } = req.params;
        const changes = deleteNote(id);
        res.json({ deleted: changes });
    } catch (err) {
        next(err);
    }
};