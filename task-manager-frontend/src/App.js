import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import TaskForm from './TaskForm';
import TaskCard from './TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tasks');
      // Normalize task property names if necessary
      const normalizedTasks = response.data.map(task => ({
        ...task,
        dueDate: task.due_date,
        due_date: undefined, // Remove snake_case property
      }));
      setTasks(normalizedTasks); // Update state with fetched tasks
    } catch (error) {
      toast.error('Error fetching tasks');
    }
  };

  useEffect(() => {
    fetchTasks(); // Call fetchTasks when the component mounts
  }, []); // Empty dependency array ensures it runs once on initial render

  const addOrUpdateTask = async (task) => {
    try {
      const taskToSend = {
        ...task,
        due_date: task.dueDate, // Convert to snake_case
        dueDate: undefined, // Remove camelCase property
      };

      if (editingTask) {
        await axios.put(`http://localhost:3000/tasks/${editingTask.id}`, taskToSend);
        toast.success('Task updated successfully!');
      } else {
        await axios.post('http://localhost:3000/tasks', taskToSend);
        toast.success('Task added successfully!');
      }

      setEditingTask(null);
      fetchTasks(); // Fetch updated tasks after adding/updating
    } catch (error) {
      toast.error('Error adding/updating task');
    }
  };

  const deleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`http://localhost:3000/tasks/${id}`);
        toast.warn('Task deleted!');
        fetchTasks(); // Refresh tasks list after deleting
      } catch (error) {
        toast.error('Error deleting task');
      }
    }
  };

  const updateStatus = async (taskId, currentStatus) => {
    const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
    try {
      await axios.put(`http://localhost:3000/tasks/${taskId}/status`, { status: newStatus });
      toast.info(`Task marked as ${newStatus}`);
      fetchTasks(); // Refresh tasks list after updating status
    } catch (error) {
      toast.error('Error updating task status');
    }
  };

  return (
    <Container maxWidth="md">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick />
      <Box mt={5}>
        <Typography variant="h3" gutterBottom align="center">
          Task Management System
        </Typography>
        <TaskForm addOrUpdateTask={addOrUpdateTask} editingTask={editingTask} />
        <Grid container spacing={2} mt={2}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} key={task.id}>
              <TaskCard 
                task={task} 
                updateStatus={updateStatus} 
                editTask={setEditingTask} 
                deleteTask={deleteTask} 
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
