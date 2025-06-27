import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  IconButton,
  Tooltip,
  Avatar,
  Fade,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Logout, Dashboard, Assignment, Group, Folder, Task } from '@mui/icons-material';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    onLogout();
    navigate('/login');
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(90deg, #1a237e, #3949ab, #3f51b5)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 10s ease infinite',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        '@keyframes gradientShift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1,
          px: { xs: 2, sm: 3 },
        }}
      >
        {/* Logo + App Title */}
        <Fade in={true} timeout={600}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Avatar
              sx={{
                bgcolor: '#fff',
                color: '#3f51b5',
                width: 46,
                height: 46,
                fontWeight: 'bold',
                fontSize: '1.2rem',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.05)' },
                  '100%': { transform: 'scale(1)' },
                },
              }}
            >
              P
            </Avatar>
            <Stack spacing={0}>
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{
                  color: '#fff',
                  letterSpacing: 1,
                }}
              >
                ProjeX
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#e0e0e0',
                  letterSpacing: 0.5,
                }}
              >
                Project Task Tracker
              </Typography>
            </Stack>
          </Stack>
        </Fade>

        {/* Navigation Buttons */}
        <Stack direction="row" spacing={{ xs: 1, sm: 2 }} alignItems="center">
          {user?.role === 'Admin' && (
            <>
              <Button startIcon={<Folder />} onClick={() => navigate('/projects')} sx={navButtonStyle}>
                Projects
              </Button>
              <Button startIcon={<Task />} onClick={() => navigate('/tasks')} sx={navButtonStyle}>
                Tasks
              </Button>
              <Button startIcon={<Group />} onClick={() => navigate('/team')} sx={navButtonStyle}>
                Team
              </Button>
              <Button startIcon={<Dashboard />} onClick={() => navigate('/dashboard')} sx={navButtonStyle}>
                Dashboard
              </Button>
            </>
          )}

          {user?.role === 'Team Member' && (
            <>
              <Button startIcon={<Assignment />} onClick={() => navigate('/my-tasks')} sx={navButtonStyle}>
                My Tasks
              </Button>
              <Button startIcon={<Dashboard />} onClick={() => navigate('/dashboard')} sx={navButtonStyle}>
                Dashboard
              </Button>
            </>
          )}

          {/* User Info & Logout */}
          <Stack direction="row" alignItems="center" spacing={1}>
            {user && (
              <Tooltip title={user.name}>
                <Avatar
                  sx={{
                    bgcolor: '#3f51b5',
                    width: 32,
                    height: 32,
                    fontSize: '0.9rem',
                  }}
                >
                  {user.name[0].toUpperCase()}
                </Avatar>
              </Tooltip>
            )}
            <Tooltip title="Logout">
              <IconButton
                onClick={handleLogout}
                sx={{
                  color: '#fff',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <Logout />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

// Styled Button Style
const navButtonStyle = {
  color: '#fff',
  bgcolor: 'rgba(255, 255, 255, 0.15)',
  borderRadius: 2,
  fontWeight: 500,
  px: { xs: 1.5, sm: 2.5 },
  py: 1,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    bgcolor: 'rgba(255, 255, 255, 0.25)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },
  '& .MuiButton-startIcon': {
    mr: { xs: 0.5, sm: 1 },
  },
};

export default Navbar;