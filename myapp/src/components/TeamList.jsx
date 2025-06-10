// src/components/TeamList.jsx
import React, { useState } from 'react';
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

const TeamList = () => {
  const [team, setTeam] = useState([
    { id: 1, name: 'Juliet', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'Team Member' },
    { id: 3, name: 'Charlie', role: 'Team Member' },
  ]);

  const [name, setName] = useState('');
  const [role, setRole] = useState('Team Member');

  const handleAddMember = () => {
    if (!name.trim()) return;

    const newMember = {
      id: Date.now(),
      name: name.trim(),
      role,
    };

    setTeam([...team, newMember]);
    setName('');
    setRole('Team Member');
  };

  const handleDelete = (id) => {
    setTeam(team.filter((member) => member.id !== id));
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" gutterBottom>
        👥 Team Members
      </Typography>

      {/* Add Member Form */}
      <Stack direction="row" spacing={2} mb={2} flexWrap="wrap">
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

      {/* Team List */}
      <Stack spacing={2}>
        {team.map((member) => (
          <Card key={member.id}>
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant="subtitle1">{member.name}</Typography>
                <Typography variant="body2">Role: {member.role}</Typography>
              </Box>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(member.id)}
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