import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AdminPage = () => {
  return (
    <Box sx={{ my: 4, px: { xs: 2, md: 4 } }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
     <DashboardIcon fontSize="large" color="primary" />
     Admin Dashboard
      </Typography>

      {/* About Section */}
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: '#f5f7fa',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          color="primary"
        >
          📋 About the Project Tasks Tracker
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="body1" sx={{ mb: 2 }}>
          The <strong>Project Tasks Tracker</strong> is a streamlined tool designed for modern teams to efficiently manage and track their project workflows. Whether you're an admin overseeing complex projects or a team member focusing on task execution — this platform keeps everyone aligned, productive, and informed.
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          This dashboard provides an at-a-glance overview of team structure, task distribution, and project progress. It’s built with scalability, simplicity, and collaboration at its core — empowering teams to meet deadlines and goals without hassle.
        </Typography>

        {/* Highlights List */}
        <List>
          <ListItem>
            <ListItemIcon>
              <AssignmentIcon color="secondary" />
            </ListItemIcon>
            <ListItemText
              primary="Create, assign, and manage tasks seamlessly"
              secondary="Admins can delegate responsibilities and track completion status."
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <GroupIcon color="info" />
            </ListItemIcon>
            <ListItemText
              primary="Organize your team efficiently"
              secondary="Manage members, assign roles, and ensure everyone is on the same page."
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <TrackChangesIcon color="success" />
            </ListItemIcon>
            <ListItemText
              primary="Track project progress in real-time"
              secondary="Stay updated on task status, deadlines, and workloads."
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="success" />
            </ListItemIcon>
            <ListItemText
              primary="Empower productivity and accountability"
              secondary="Team members have clear visibility into their tasks and responsibilities."
            />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default AdminPage;