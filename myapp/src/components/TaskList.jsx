// TaskList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Checkbox,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TaskList = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [newTask, setNewTask] = useState({
    taskName: '',
    assignedTo: '',
    projectId: '',
    dueDate: '',
    status: 'To do',
  });

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      let allTasks = response.data;

      if (user.role === 'Team Member') {
        allTasks = allTasks.filter(
          (task) =>
            task.assignedTo?.toLowerCase().trim() ===
            user.name?.toLowerCase().trim()
        );
      }

      setTasks(allTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/projects');
      setProjects(res.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/teammembers');
      setTeamMembers(res.data);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
    if (user.role === 'Admin') {
      fetchProjects();
      fetchTeamMembers();
    }
  }, [user]);

  const handleToggleComplete = async (taskId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Completed' ? 'To do' : 'Completed';
      await axios.put(`http://localhost:5000/tasks/${taskId}`, {
        status: newStatus,
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleAddTask = async () => {
    const { taskName, assignedTo, projectId, dueDate, status } = newTask;
    if (!taskName || !assignedTo || !projectId || !dueDate || !status) return;

    try {
      await axios.post('http://localhost:5000/tasks', {
        taskName,
        assignedTo,
        projectId,
        dueDate,
        status,
      });
      setNewTask({
        taskName: '',
        assignedTo: '',
        projectId: '',
        dueDate: '',
        status: 'To do',
      });
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditOpen = (task) => {
    setEditingTask(task);
    setEditDialogOpen(true);
  };

  const handleEditChange = (field, value) => {
    setEditingTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`http://localhost:5000/tasks/${editingTask._id}`, editingTask);
      setEditDialogOpen(false);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const getProjectName = (projectId) => {
    const project = projects.find((proj) => proj._id === projectId);
    return project ? project.projectName : 'Unknown Project';
  };

  const completedCount = tasks.filter((task) => task.status === 'Completed').length;

  return (
    <Box p={4} sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        {user.role === 'Team Member' ? 'Your Tasks' : 'All Tasks'} ({completedCount} of {tasks.length} Completed)
      </Typography>

      {user.role === 'Admin' && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
            gap: 2,
            mb: 4,
            backgroundColor: '#fff',
            p: 3,
            borderRadius: 2,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          <TextField
            label="Task Name"
            value={newTask.taskName}
            onChange={(e) => setNewTask((prev) => ({ ...prev, taskName: e.target.value }))}
          />
          <TextField
            select
            label="Assign To"
            value={newTask.assignedTo}
            onChange={(e) => setNewTask((prev) => ({ ...prev, assignedTo: e.target.value }))}
          >
            {teamMembers.map((member) => (
              <MenuItem key={member._id} value={member.name}>
                {member.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Select Project"
            value={newTask.projectId}
            onChange={(e) => setNewTask((prev) => ({ ...prev, projectId: e.target.value }))}
          >
            {projects.map((project) => (
              <MenuItem key={project._id} value={project._id}>
                {project.projectName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type="date"
            label="Due Date"
            InputLabelProps={{ shrink: true }}
            value={newTask.dueDate}
            onChange={(e) => setNewTask((prev) => ({ ...prev, dueDate: e.target.value }))}
          />
          <TextField
            select
            label="Status"
            value={newTask.status}
            onChange={(e) => setNewTask((prev) => ({ ...prev, status: e.target.value }))}
          >
            <MenuItem value="To do">To do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>
          <Button variant="contained" onClick={handleAddTask}>
            Add Task
          </Button>
        </Box>
      )}

      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task._id}>
            <Card
              sx={{
                height: 240,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: task.status === 'Completed' ? '6px solid green' : '6px solid orange',
                backgroundColor: '#fff',
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" alignItems="center" mb={1}>
                  <Checkbox
                    checked={task.status === 'Completed'}
                    onChange={() => handleToggleComplete(task._id, task.status)}
                  />
                  <Typography variant="h6" sx={{ textDecoration: task.status === 'Completed' ? 'line-through' : 'none' }}>
                    {task.taskName}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Assigned to: {task.assignedTo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Project: {getProjectName(task.projectId)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: {task.status}
                </Typography>
              </CardContent>
              {user.role === 'Admin' && (
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Tooltip title="Edit Task">
                    <IconButton color="primary" onClick={() => handleEditOpen(task)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Task">
                    <IconButton color="error" onClick={() => handleDelete(task._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Task Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Task</DialogTitle>
        {editingTask && (
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Task Name"
              value={editingTask.taskName}
              onChange={(e) => handleEditChange('taskName', e.target.value)}
            />
            <TextField
              select
              label="Assign To"
              value={editingTask.assignedTo}
              onChange={(e) => handleEditChange('assignedTo', e.target.value)}
            >
              {teamMembers.map((member) => (
                <MenuItem key={member._id} value={member.name}>
                  {member.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Project"
              value={editingTask.projectId}
              onChange={(e) => handleEditChange('projectId', e.target.value)}
            >
              {projects.map((proj) => (
                <MenuItem key={proj._id} value={proj._id}>
                  {proj.projectName}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              type="date"
              label="Due Date"
              InputLabelProps={{ shrink: true }}
              value={editingTask.dueDate}
              onChange={(e) => handleEditChange('dueDate', e.target.value)}
            />
            <TextField
              select
              label="Status"
              value={editingTask.status}
              onChange={(e) => handleEditChange('status', e.target.value)}
            >
              <MenuItem value="To do">To do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </TextField>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskList;