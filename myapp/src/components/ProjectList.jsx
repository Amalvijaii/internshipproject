// src/components/ProjectList.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Card,
  CardContent,
} from '@mui/material';

const ProjectList = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Website Redesign' },
    { id: 2, name: 'Mobile App Development' },
  ]);

  const [newProject, setNewProject] = useState('');

  const handleAddProject = () => {
    if (!newProject.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: newProject.trim(),
    };

    setProjects([...projects, newEntry]);
    setNewProject('');
  };

  const handleDelete = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" gutterBottom>
        📁 Project List
      </Typography>

      {/* Add project form */}
      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          label="New Project"
          variant="outlined"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddProject}>
          Add
        </Button>
      </Stack>

      {/* Project cards */}
      <Stack spacing={2}>
        {projects.map((project) => (
          <Card key={project.id}>
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography>{project.name}</Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(project.id)}
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