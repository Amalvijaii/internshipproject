import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, Button, Stack, Card, CardContent,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [team, setTeam] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [project, setProject] = useState('');
  const [status, setStatus] = useState('Pending');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchTeam();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:5000/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error('Error fetching tasks:', err));
  };

  const fetchProjects = () => {
    axios.get('http://localhost:5000/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error('Error fetching projects:', err));
  };

  const fetchTeam = () => {
    axios.get('http://localhost:5000/teammembers')
      .then(res => setTeam(res.data))
      .catch(err => console.error('Error fetching team:', err));
  };

  const handleAddTask = () => {
    if (!taskName.trim() || !assignedTo || !project) return;

    const newTask = {
      taskName: taskName.trim(),
      assignedTo,
      project,
      status,
      dueDate
    };

    axios.post('http://localhost:5000/tasks', newTask)
      .then(() => {
        fetchTasks();
        setTaskName('');
        setAssignedTo('');
        setProject('');
        setStatus('Pending');
        setDueDate('');
      })
      .catch(err => console.error('Error adding task:', err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter(t => t._id !== id)))
      .catch(err => console.error('Error deleting task:', err));
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" gutterBottom>📝 Tasks</Typography>

      {/* Task Form */}
      <Stack direction="row" spacing={2} mb={2} flexWrap="wrap">
        <TextField label="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Assign To</InputLabel>
          <Select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} label="Assign To">
            {team.map(member => (
              <MenuItem key={member._id} value={member.name}>{member.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Project</InputLabel>
          <Select value={project} onChange={(e) => setProject(e.target.value)} label="Project">
            {projects.map(p => (
              <MenuItem key={p._id} value={p.projectName}>{p.projectName}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)} label="Status">
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>

        <TextField type="date" label="Due Date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} InputLabelProps={{ shrink: true }} />

        <Button variant="contained" onClick={handleAddTask}>Add Task</Button>
      </Stack>

      {/* Task List */}
      <Stack spacing={2}>
        {tasks.map(task => (
          <Card key={task._id}>
            <CardContent>
              <Typography variant="subtitle1">{task.taskName}</Typography>
              <Typography>Assigned To: {task.assignedTo}</Typography>
              <Typography>Project: {task.project}</Typography>
              <Typography>Status: {task.status}</Typography>
              <Typography>
                Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
              </Typography>
              <Button variant="contained" color="error" onClick={() => handleDelete(task._id)}>Delete</Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default TaskList;