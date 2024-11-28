import React from 'react';

const TaskItem = ({ task, deleteTask, editTask }) => {
  return (
    <li className="task-item">
      <div>
        <strong>{task.title}</strong> - {task.description} (Due: {task.due_date || 'No date'}) [{task.status}]
      </div>
      <div>
        <button onClick={() => editTask(task)}>Edit</button>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;
