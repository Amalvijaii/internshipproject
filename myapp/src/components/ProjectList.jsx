import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  Paper,
} from '@mui/material';
import { Edit, Save, Cancel } from '@mui/icons-material';
import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedProject, setEditedProject] = useState({});

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    axios
      .get('http://localhost:5000/projects')
      .then((res) => setProjects(res.data))
      .catch((err) => console.error('Error fetching projects:', err));
  };

  const handleAddProject = () => {
    if (!newProjectName.trim()) return;

    axios
      .post('http://localhost:5000/projects', {
        projectName: newProjectName.trim(),
        description: newProjectDesc.trim(),
      })
      .then((res) => {
        setProjects([...projects, res.data]);
        setNewProjectName('');
        setNewProjectDesc('');
      })
      .catch((err) => console.error('Error adding project:', err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/projects/${id}`)
      .then(() => {
        setProjects(projects.filter((project) => project._id !== id));
      })
      .catch((err) => console.error('Error deleting project:', err));
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setEditedProject({ ...project });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedProject({});
  };

  const handleSaveEdit = () => {
    axios
      .put(`http://localhost:5000/projects/${editingId}`, editedProject)
      .then(() => {
        setProjects(projects.map(p => (p._id === editingId ? editedProject : p)));
        setEditingId(null);
        setEditedProject({});
      })
      .catch((err) => console.error('Error updating project:', err));
  };

  return (
    <Box sx={{ minHeight: '100vh', p: 4, backgroundColor: '#f1f3f6' }}>
      <Typography
        variant="h4"
        fontWeight="medium"
        gutterBottom
        sx={{ mb: 4, textAlign: 'center', color: '#333' }}
      >
        Project List
      </Typography>

      {/* Add Form */}
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          p: 3,
          mb: 4,
          backgroundColor: '#ffffff',
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label="Project Name"
            variant="outlined"
            fullWidth
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={newProjectDesc}
            onChange={(e) => setNewProjectDesc(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ px: 4 }}
            onClick={handleAddProject}
          >
            Add
          </Button>
        </Stack>
      </Paper>

      {/* Project Cards */}
      <Grid container spacing={4}>
        {projects.map((project) => (
          <Grid
            item
            key={project._id}
            sx={{
              width: {
                xs: '100%',
                sm: '50%',
                md: '33.33%',
              },
            }}
          >
            <Paper
              elevation={4}
              sx={{
                borderRadius: 3,
                backgroundColor: '#ffffff',
                p: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                },
              }}
            >
              <Card sx={{ boxShadow: 'none', backgroundColor: 'transparent' }}>
                <CardContent>
                  {editingId === project._id ? (
                    <>
                      <TextField
                        fullWidth
                        label="Project Name"
                        variant="outlined"
                        value={editedProject.projectName}
                        onChange={(e) =>
                          setEditedProject({ ...editedProject, projectName: e.target.value })
                        }
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="Description"
                        variant="outlined"
                        multiline
                        value={editedProject.description}
                        onChange={(e) =>
                          setEditedProject({ ...editedProject, description: e.target.value })
                        }
                      />
                    </>
                  ) : (
                    <>
                      <Typography variant="h6" fontWeight="bold" color="#333" gutterBottom>
                        {project.projectName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {project.description}
                      </Typography>
                    </>
                  )}
                </CardContent>

                <CardActions sx={{ justifyContent: 'space-between', px: 1, pb: 1 }}>
                  {editingId === project._id ? (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<Save />}
                        onClick={handleSaveEdit}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<Cancel />}
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(project._id)}
                      >
                        Delete
                      </Button>
                      <IconButton color="primary" onClick={() => handleEdit(project)}>
                        <Edit />
                      </IconButton>
                    </>
                  )}
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProjectList;