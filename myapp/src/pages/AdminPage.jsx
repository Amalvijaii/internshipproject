// src/pages/AdminPage.jsx
import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" gutterBottom>
        👨‍💼 Admin Dashboard
      </Typography>

      <Stack spacing={2} direction="column">
        <Button variant="contained" onClick={() => navigate('/projects')}>
          Manage Projects
        </Button>
        <Button variant="contained" onClick={() => navigate('/tasks')}>
          Manage Tasks
        </Button>
        <Button variant="contained" onClick={() => navigate('/team')}>
          Manage Team Members
        </Button>
      </Stack>
    </Box>
  );
};

export default AdminPage;