
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = () => {
    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newTask }),
    })
      .then(response => response.json())
      .then(task => setTasks([...tasks, task]))
      .catch(error => console.error('Error adding task:', error));
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
        <input
          className='input-task'
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
        />
        <button className='btn-add' onClick={addTask}>Add Task</button>
        <ul>
          {tasks.map(task => (
            <li key={task._id}>
              {task.text}
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;