// src/components/TeamMemberPage.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
} from '@mui/material';

const sampleTasks = [
  { id: 1, title: 'Fix Bug #404', assignedTo: 'Bob', status: 'To Do' },
  { id: 2, title: 'Write Unit Tests', assignedTo: 'Bob', status: 'In Progress' },
  { id: 3, title: 'Design Login UI', assignedTo: 'Alice', status: 'Done' },
];

const TeamMemberPage = ({ user }) => {
  const [tasks, setTasks] = useState(sampleTasks);

  const userTasks = tasks.filter((task) => task.assignedTo === user.name);

  const handleStatusChange = (id, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const completedCount = userTasks.filter((t) => t.status === 'Done').length;

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" gutterBottom>
        🗂 Your Tasks ({completedCount} of {userTasks.length} Completed)
      </Typography>

      <Stack spacing={2}>
        {userTasks.map((task) => (
          <Card key={task.id}>
            <CardContent>
              <Typography variant="subtitle1">{task.title}</Typography>
              <Typography variant="body2" gutterBottom>
                Status:
              </Typography>

              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={task.status}
                  label="Status"
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                >
                  <MenuItem value="To Do">To Do</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Done">Done</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default TeamMemberPage;