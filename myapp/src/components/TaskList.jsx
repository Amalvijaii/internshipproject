// src/components/TaskList.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Card,
  CardContent,
  Stack,
  InputLabel,
  FormControl,
} from '@mui/material';

const teamMembers = ['Juliet', 'Bob', 'Charlie']; // You can later fetch this dynamically

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('To Do');

  const handleAddTask = () => {
    if (!title.trim() || !assignedTo) return;

    const newTask = {
      id: Date.now(),
      title,
      assignedTo,
      status,
    };

    setTasks([...tasks, newTask]);
    setTitle('');
    setAssignedTo('');
    setStatus('To Do');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" gutterBottom>
        ✅ Task Management
      </Typography>

      {/* Task Creation Form */}
      <Stack direction="row" spacing={2} mb={2} flexWrap="wrap">
        <TextField
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Assign To</InputLabel>
          <Select
            value={assignedTo}
            label="Assign To"
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            {teamMembers.map((member, idx) => (
              <MenuItem key={idx} value={member}>
                {member}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleAddTask}>
          Add Task
        </Button>
      </Stack>

      {/* Task List */}
      <Stack spacing={2}>
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant="subtitle1">{task.title}</Typography>
                <Typography variant="body2">
                  Assigned To: {task.assignedTo}
                </Typography>
                <Typography variant="body2">Status: {task.status}</Typography>
              </Box>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default TaskList;