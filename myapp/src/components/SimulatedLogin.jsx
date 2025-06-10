// src/components/SimulatedLogin.jsx
import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

const users = [
  { name: 'Juliet', role: 'Admin' },
  { name: 'Bob', role: 'Team Member' },
  { name: 'Charlie', role: 'Team Member' },
];

const SimulatedLogin = ({ onLogin }) => {
  const [selectedUser, setSelectedUser] = useState('');

  const handleChange = (event) => {
    const user = JSON.parse(event.target.value);
    setSelectedUser(user.name);
    onLogin(user); // send selected user to App.jsx
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        padding: 2,
        marginBottom: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        🔐 Simulated Login
      </Typography>

      <FormControl fullWidth>
        <InputLabel>Select User</InputLabel>
        <Select
          label="Select User"
          value={selectedUser}
          onChange={handleChange}
        >
          {users.map((user, idx) => (
            <MenuItem key={idx} value={JSON.stringify(user)}>
              {user.name} ({user.role})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SimulatedLogin;