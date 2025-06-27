import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Collapse,
  TextField,
  Button,
  MenuItem,
  IconButton,
  Divider,
  Stack,
  Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

const TeamMemberPage = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState({});

  const fetchData = async () => {
    try {
      const taskRes = await axios.get('http://localhost:5000/tasks');
      const projectRes = await axios.get('http://localhost:5000/projects');

      const userTasks = taskRes.data.filter(
        (task) =>
          task.assignedTo?.toLowerCase().trim() ===
          user.name?.toLowerCase().trim()
      );

      setTasks(userTasks);
      setProjects(projectRes.data);
    } catch (err) {
      console.error('Error loading tasks or projects:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const getProjectDetails = (projectId) =>
    projects.find((project) => project._id === projectId);

  const handleExpand = (taskId) => {
    setExpandedTaskId((prev) => (prev === taskId ? null : taskId));
  };

  const handleStatusChange = (taskId, value) => {
    setStatusUpdates((prev) => ({ ...prev, [taskId]: value }));
  };

  const handleStatusSubmit = async (taskId) => {
    try {
      const newStatus = statusUpdates[taskId];
      await axios.put(`http://localhost:5000/tasks/${taskId}`, {
        status: newStatus,
      });
      await fetchData();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const completedCount = tasks.filter((task) => task.status === 'Completed').length;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        My Tasks
      </Typography>
      <Typography variant="subtitle1" gutterBottom color="text.secondary">
        Completed: {completedCount} / {tasks.length}
      </Typography>

      {tasks.map((task) => {
        const project = getProjectDetails(task.projectId);
        const isExpanded = expandedTaskId === task._id;

        return (
          <Card key={task._id} variant="outlined" sx={{ mb: 3, boxShadow: 2 }}>
            <CardContent>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={2}
              >
                <Box>
                  <Typography variant="h6">
                    {task.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Project:</strong> {project?.projectName || 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Due Date:</strong>{' '}
                    {new Date(task.dueDate).toLocaleDateString()}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <Tooltip title={isExpanded ? 'Hide Details' : 'Show Project Description'}>
                    <IconButton onClick={() => handleExpand(task._id)}>
                      {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Tooltip>

                  {task.status === 'Completed' ? (
                    <Tooltip title="Completed">
                      <TaskAltIcon color="success" />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Pending">
                      <HourglassTopIcon color="warning" />
                    </Tooltip>
                  )}
                </Box>
              </Stack>

              <Collapse in={isExpanded}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" mb={2}>
                  <strong>Project Description:</strong>{' '}
                  {project?.description || 'No description available.'}
                </Typography>

                <TextField
                  select
                  fullWidth
                  label="Update Task Status"
                  value={statusUpdates[task._id] || task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="To do">To do</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </TextField>

                <Button
                  variant="contained"
                  onClick={() => handleStatusSubmit(task._id)}
                  disabled={!statusUpdates[task._id] || statusUpdates[task._id] === task.status}
                >
                  Submit Status
                </Button>
              </Collapse>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default TeamMemberPage;