// src/components/TeamList.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Card,
  CardContent,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import axios from 'axios';

const TeamList = () => {
  const [team, setTeam] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Team Member');

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = () => {
    axios
      .get('http://localhost:5000/teammembers')
      .then((res) => setTeam(res.data))
      .catch((err) => console.error('Error fetching team:', err));
  };

  const handleAddMember = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail) return;

    // 🔍 Check for existing member
    const exists = team.some(
      (member) =>
        member.name.toLowerCase() === trimmedName.toLowerCase() ||
        member.email.toLowerCase() === trimmedEmail
    );

    if (exists) {
      alert('Member with same name or email already exists!');
      return;
    }

    const newMember = {
      name: capitalize(trimmedName),
      email: trimmedEmail,
      role,
    };

    axios
      .post('http://localhost:5000/teammembers', newMember)
      .then(() => {
        fetchTeam();
        setName('');
        setEmail('');
        setRole('Team Member');
      })
      .catch((err) => console.error('Error adding member:', err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/teammembers/${id}`)
      .then(() => setTeam((prev) => prev.filter((member) => member._id !== id)))
      .catch((err) => console.error('Error deleting member:', err));
  };

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" gutterBottom>
        👥 Team Members
      </Typography>

      {/* ➕ Add Team Member Form */}
      <Stack direction="row" spacing={2} mb={2} flexWrap="wrap">
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            label="Role"
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Team Member">Team Member</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleAddMember}>
          Add Member
        </Button>
      </Stack>

      {/* 📄 Team Member List */}
      <Stack spacing={2}>
        {team.map((member) => (
          <Card key={member._id}>
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant="subtitle1">{member.name}</Typography>
                <Typography variant="body2">Email: {member.email}</Typography>
                <Typography variant="body2">Role: {member.role}</Typography>
              </Box>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(member._id)}
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default TeamList;