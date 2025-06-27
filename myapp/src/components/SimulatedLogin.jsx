import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  CardActions,
  Divider,
  Fade,
  Avatar,
  CircularProgress,
  Stack,
} from '@mui/material';
import { Login } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SimulatedLogin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Only fetch users – no auto redirect here
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/teammembers')
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch users:', err);
        setLoading(false);
      });
  }, []);

  const handleLogin = () => {
    const user = users.find((u) => u.email === selectedEmail);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      onLogin(user); // Pass to parent (App.jsx)
      if (user.role === 'admin') {
        navigate('/AdminPage');
      } else {
        navigate('/dashboard');
      }
    } else {
      alert('User not found.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #1a237e, #3949ab, #3f51b5)',
        backgroundSize: '300% 300%',
        animation: 'gradientShift 15s ease infinite',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: { xs: 2, sm: 4 },
        '@keyframes gradientShift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      }}
    >
      <Fade in={true} timeout={800}>
        <Card
          elevation={20}
          sx={{
            width: { xs: '100%', sm: 450 },
            maxWidth: 450,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 15px 50px rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Stack alignItems="center" spacing={2} mb={4}>
              <Avatar
                sx={{
                  bgcolor: '#3f51b5',
                  width: 60,
                  height: 60,
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                    '100%': { transform: 'scale(1)' },
                  },
                }}
              >
                <Login fontSize="large" />
              </Avatar>
              <Typography
                variant="h4"
                fontWeight={700}
                color="primary"
                textAlign="center"
                sx={{
                  background: 'linear-gradient(45deg, #3f51b5, #1a237e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Welcome Back
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Select your account to login
              </Typography>
            </Stack>

            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel sx={{ color: 'text.primary', fontWeight: 500 }}>
                Select User
              </InputLabel>
              <Select
                value={selectedEmail}
                label="Select User"
                onChange={(e) => setSelectedEmail(e.target.value)}
                sx={{
                  color: 'text.primary',
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: 2,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.dark',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                  '& .MuiSvgIcon-root': { color: 'primary.main' },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: 2,
                      boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
                      mt: 1,
                    },
                  },
                }}
              >
                {users.map((user) => (
                  <MenuItem key={user._id} value={user.email}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: '#3f51b5',
                          fontSize: '1rem',
                        }}
                      >
                        {user.name[0].toUpperCase()}
                      </Avatar>
                      <Stack>
                        <Typography variant="body1">{user.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {user.email}
                        </Typography>
                      </Stack>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <CircularProgress size={24} color="primary" />
              </Box>
            )}
          </CardContent>

          <CardActions sx={{ justifyContent: 'center', pb: 4, pt: 2 }}>
            <Button
              variant="contained"
              startIcon={<Login />}
              onClick={handleLogin}
              disabled={!selectedEmail || loading}
              sx={{
                width: '90%',
                py: 1.5,
                borderRadius: 3,
                fontWeight: 600,
                fontSize: '1rem',
                bgcolor: 'primary.main',
                color: '#fff',
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(63, 81, 181, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  boxShadow: '0 6px 16px rgba(63, 81, 181, 0.5)',
                  transform: 'translateY(-2px)',
                },
                '&:disabled': {
                  bgcolor: 'grey.300',
                  color: 'grey.600',
                },
              }}
            >
              Sign In
            </Button>
          </CardActions>

          <Divider sx={{ mx: 3, borderColor: 'grey.200' }} />

          <Fade in={!!currentUser}>
            <Box sx={{ p: 3, textAlign: 'center' }}>
              {currentUser && (
                <Typography variant="body2" color="text.secondary">
                  ✅ Logged in as: <strong style={{ color: '#3f51b5' }}>{currentUser.name}</strong> (
                  {currentUser.role})
                </Typography>
              )}
            </Box>
          </Fade>
        </Card>
      </Fade>
    </Box>
  );
};

export default SimulatedLogin;