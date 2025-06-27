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
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Team Member');
  const [editingMemberId, setEditingMemberId] = useState(null);

  useEffect(() => {
    fetchTeam();
    fetchTasks();
  }, []);

  const fetchTeam = () => {
    axios
      .get('http://localhost:5000/teammembers')
      .then((res) => setTeam(res.data))
      .catch((err) => console.error('Error fetching team:', err));
  };

  const fetchTasks = () => {
    axios
      .get('http://localhost:5000/tasks')
      .then((res) => setTasks(res.data))
      .catch((err) => console.error('Error fetching tasks:', err));
  };

  const handleAddOrUpdateMember = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail) return;

    const newMember = {
      name: capitalize(trimmedName),
      email: trimmedEmail,
      role,
    };

    if (editingMemberId) {
      axios
        .put(`http://localhost:5000/teammembers/${editingMemberId}`, newMember)
        .then(() => {
          fetchTeam();
          clearForm();
        })
        .catch((err) => console.error('Error updating member:', err));
    } else {
      const exists = team.some(
        (member) =>
          member.name.toLowerCase() === trimmedName.toLowerCase() ||
          member.email.toLowerCase() === trimmedEmail
      );

      if (exists) {
        alert('Member with same name or email already exists!');
        return;
      }

      axios
        .post('http://localhost:5000/teammembers', newMember)
        .then(() => {
          fetchTeam();
          clearForm();
        })
        .catch((err) => console.error('Error adding member:', err));
    }
  };

  const handleEdit = (member) => {
    setName(member.name);
    setEmail(member.email);
    setRole(member.role);
    setEditingMemberId(member._id);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/teammembers/${id}`)
      .then(() => setTeam((prev) => prev.filter((member) => member._id !== id)))
      .catch((err) => console.error('Error deleting member:', err));
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setRole('Team Member');
    setEditingMemberId(null);
  };

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const countTasksForMember = (memberName) => {
    return tasks.filter((task) => task.assignedTo === memberName).length;
  };

  return (
    <Box sx={{ my: 4, px: 2 }}>
      <Typography variant="h6" gutterBottom>
        👥 Team Members
      </Typography>

      {/* ➕ Add/Edit Team Member Form */}
      <Stack direction="row" spacing={2} mb={3} flexWrap="wrap">
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

        <Button
          variant="contained"
          onClick={handleAddOrUpdateMember}
          color={editingMemberId ? 'success' : 'primary'}
        >
          {editingMemberId ? 'Update' : 'Add Member'}
        </Button>

        {editingMemberId && (
          <Button variant="contained" color="warning" onClick={clearForm}>
            Cancel
          </Button>
        )}
      </Stack>

      {/* 📄 Team Member List (Carousel Style) */}
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 2,
          py: 1,
          pb: 3,
          scrollSnapType: 'x mandatory',
        }}
      >
        {team.map((member) => (
          <Card
            key={member._id}
            sx={{
              minWidth: 280,
              scrollSnapAlign: 'start',
              flexShrink: 0,
              boxShadow: 3,
              borderRadius: 3,
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
              }}
            >
              <Box mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {member.name}
                </Typography>
                <Typography variant="body2">📧 {member.email}</Typography>
                <Typography variant="body2">⚫{member.role}</Typography>
                <Typography variant="body2" mt={1}>
                  ✅ Assigned Tasks: {countTasksForMember(member.name)}
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => handleEdit(member)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(member._id)}
                >
                  Remove
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default TeamList;