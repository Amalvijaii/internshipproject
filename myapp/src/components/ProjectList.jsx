// src/components/ProjectList.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Card,
  CardContent,
} from '@mui/material';
import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');

  // Fetch projects from backend on mount
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
        setProjects([...projects, res.data]); // ✅ Add the newly created project
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

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" gutterBottom>
        📁 Project List
      </Typography>

      {/* Add project form */}
      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          label="Project Name"
          variant="outlined"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          value={newProjectDesc}
          onChange={(e) => setNewProjectDesc(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddProject}>
          Add
        </Button>
      </Stack>

      {/* Project cards */}
      <Stack spacing={2}>
        {projects.map((project) => (
          <Card key={project._id}>
            <CardContent>
              <Typography variant="h6">{project.projectName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {project.description}
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(project._id)}
                sx={{ mt: 1 }}
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

export default ProjectList;