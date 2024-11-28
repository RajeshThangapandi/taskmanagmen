const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

// Update task status by ID
app.put('/tasks/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // Status should be 'Pending' or 'Completed'

    try {
        const sql = 'UPDATE tasks SET status = ? WHERE id = ?';
        await db.run(sql, [status, id]);
        res.status(200).json({ message: 'Task status updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task status' });
    }
});

// Create a new task
app.post('/tasks', (req, res) => {
  const { title, description, due_date, status } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  db.run(
    'INSERT INTO tasks (title, description, due_date, status) VALUES (?, ?, ?, ?)',
    [title, description, due_date, status || 'Pending'],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, title, description, due_date, status: status || 'Pending' });
    }
  );
});

// Get all tasks
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, due_date, status } = req.body;

  db.run(
    'UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ? WHERE id = ?',
    [title, description, due_date, status, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Task updated successfully' });
    }
  );
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM tasks WHERE id = ?', id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Task deleted successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
