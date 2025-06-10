// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Project Task Tracker
        </Typography>

        <Stack direction="row" spacing={2}>
          {user?.role === 'Admin' && (
            <>
              <Button color="inherit" onClick={() => navigate('/projects')}>
                Projects
              </Button>
              <Button color="inherit" onClick={() => navigate('/tasks')}>
                Tasks
              </Button>
              <Button color="inherit" onClick={() => navigate('/team')}>
                Team
              </Button>
              <Button color="inherit" onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
            </>
          )}

          {user?.role === 'Team Member' && (
            <>
              <Button color="inherit" onClick={() => navigate('/my-tasks')}>
                My Tasks
              </Button>
              <Button color="inherit" onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
            </>
          )}

          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;