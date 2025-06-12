import React, { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import axios from 'axios';

const SimulatedLogin = ({ onLogin }) => {
  const [users, setUsers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // 🔁 Load users from backend
  useEffect(() => {
    axios.get('http://localhost:5000/teammembers')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Failed to fetch users:', err));
  }, []);

  const handleLogin = () => {
    const user = users.find((u) => u.email === selectedEmail);
    if (user) {
      setCurrentUser(user);
      onLogin(user); // Pass user to parent
    } else {
      alert('User not found.');
    }
  };

  return (
    <Box sx={{ my: 4, maxWidth: 400, mx: 'auto', textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        👤 Simulated Login
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Email</InputLabel>
        <Select
          value={selectedEmail}
          label="Select Email"
          onChange={(e) => setSelectedEmail(e.target.value)}
        >
          {users.map((user) => (
            <MenuItem key={user._id} value={user.email}>
              {user.name} ({user.email})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        fullWidth
        disabled={!selectedEmail}
        onClick={handleLogin}
      >
        Login
      </Button>

      {currentUser && (
        <Typography mt={2}>
          Logged in as: {currentUser.name} ({currentUser.role})
        </Typography>
      )}
    </Box>
  );
};

export default SimulatedLogin;