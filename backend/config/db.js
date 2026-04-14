const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const dbFilePath = process.env.SQLITE_DB_PATH
  ? path.resolve(process.env.SQLITE_DB_PATH)
  : path.resolve(__dirname, '../notes.db');

let db = null;

const initDb = async () => {
  const SQL = await initSqlJs();

  let fileBuffer = null;
  try {
    if (fs.existsSync(dbFilePath)) {
      fileBuffer = fs.readFileSync(dbFilePath);
    }
  } catch (err) {
    console.log('No existing database file, creating new one');
  }

  if (fileBuffer) {
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            content TEXT
        )
    `);

  saveDb();
  console.log('Connected to SQLite DB');

  return db;
};

const saveDb = () => {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbFilePath, buffer);
  }
};

const getAllNotes = () => {
  return db.exec('SELECT * FROM notes');
};

const createNote = (title, content) => {
  db.run('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content]);
  saveDb();
  return db.getRowsModified();
};

const updateNote = (id, title, content) => {
  db.run('UPDATE notes SET title=?, content=? WHERE id=?', [title, content, id]);
  saveDb();
  return db.getRowsModified();
};

const deleteNote = (id) => {
  db.run('DELETE FROM notes WHERE id=?', [id]);
  saveDb();
  return db.getRowsModified();
};

module.exports = {
  initDb,
  getAllNotes,
  createNote,
  updateNote,
  deleteNote
};