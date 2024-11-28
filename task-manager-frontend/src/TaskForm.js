import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';

function TaskForm({ addOrUpdateTask, editingTask }) {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '', // Ensure this is set to an empty string initially
    status: 'Pending',
  });

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title && task.description && task.dueDate) {
      addOrUpdateTask(task); // Pass task data (including dueDate)
      setTask({ title: '', description: '', dueDate: '', status: 'Pending' });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        name="title"
        label="Task Title"
        value={task.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="description"
        label="Description"
        value={task.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={3}
        required
      />
      <TextField
        name="dueDate"
        label="Due Date"
        type="date"
        value={task.dueDate}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        select
        name="status"
        label="Status"
        value={task.status}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      >
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </TextField>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {editingTask ? 'Update Task' : 'Add Task'}
      </Button>
    </Box>
  );
}

export default TaskForm;
