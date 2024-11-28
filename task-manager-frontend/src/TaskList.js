import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';

function TaskCard({ task, updateStatus, editTask, deleteTask }) {
  // Handle if dueDate is null or empty
  const dueDateFormatted = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString('en-GB') // Format to dd/mm/yyyy
    : 'Not Set'; // Display "Not Set" if no due date

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5">{task.title}</Typography>
        <Typography variant="body1">{task.description}</Typography>
        <Typography variant="body2" color="textSecondary">
          Status: {task.status}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Due Date: {dueDateFormatted} {/* Display the formatted due date */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color={task.status === 'Pending' ? 'primary' : 'success'}
          onClick={() => updateStatus(task.id, task.status)}
        >
          Mark as {task.status === 'Pending' ? 'Completed' : 'Pending'}
        </Button>
        <Button variant="outlined" color="warning" onClick={() => editTask(task)}>
          Edit
        </Button>
        <Button variant="outlined" color="error" onClick={() => deleteTask(task.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default TaskCard;
