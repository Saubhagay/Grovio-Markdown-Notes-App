const db = require('../config/db');

exports.getNotes = (req, res, next) => {
    db.all('SELECT * FROM notes', [], (err, rows) => {
        if (err) return next(err);
        res.json(rows);
    });
};

exports.createNote = (req, res, next) => {
    const { title, content } = req.body;
    db.run('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content], function (err) {
        if (err) return next(err);
        res.status(201).json({ id: this.lastID });
    });
};

exports.updateNote = (req, res, next) => {
    const { title, content } = req.body;
    const { id } = req.params;
    db.run('UPDATE notes SET title=?, content=? WHERE id=?', [title, content, id], function (err) {
        if (err) return next(err);
        res.json({ updated: this.changes });
    });
};

exports.deleteNote = (req, res, next) => {
    const { id } = req.params;
    db.run('DELETE FROM notes WHERE id=?', [id], function (err) {
        if (err) return next(err);
        res.json({ deleted: this.changes });
    });
};