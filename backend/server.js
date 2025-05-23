const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./notes.db');

app.use(cors());
app.use(bodyParser.json());

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    content TEXT
  )`);
});

app.get('/pages', (req, res) => {
  db.all("SELECT DISTINCT name FROM pages", (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows.map(row => row.name));
  });
});

app.get('/page/:name', (req, res) => {
  const pageName = req.params.name;
  db.all("SELECT id, content FROM pages WHERE name = ?", [pageName], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

app.post('/page/:name', (req, res) => {
  const pageName = req.params.name;
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Note content is required" });

  db.run("INSERT INTO pages (name, content) VALUES (?, ?)", [pageName, content], function (err) {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: this.lastID, content });
  });
});

app.delete('/page/:name', (req, res) => {
  db.run("DELETE FROM pages WHERE name = ?", [req.params.name], function (err) {
    if (err) return res.status(500).json({ error: err });
    res.json({ deleted: this.changes });
  });
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
