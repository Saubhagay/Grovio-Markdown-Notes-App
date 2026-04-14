const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbFilePath = process.env.SQLITE_DB_PATH
    ? path.resolve(process.env.SQLITE_DB_PATH)
    : path.resolve(__dirname, '../notes.db');

const db = new sqlite3.Database(dbFilePath, (err) => {
    if (err) console.error(err.message);
    else console.log('Connected to SQLite DB');
});

db.run(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT
  )
`);

module.exports = db;