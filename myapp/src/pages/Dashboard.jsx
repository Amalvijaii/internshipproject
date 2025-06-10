// src/pages/Dashboard.jsx
import React from 'react';
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';

const Dashboard = ({ user }) => {
  // 📝 Dummy Task Data
  const allTasks = [
    { id: 1, project: 'Website Redesign', assignee: 'Juliet', status: 'Done' },
    { id: 2, project: 'Website Redesign', assignee: 'Juliet', status: 'In Progress' },
    { id: 3, project: 'Mobile App', assignee: 'Bob', status: 'To Do' },
    { id: 4, project: 'Mobile App', assignee: 'Bob', status: 'Done' },
    { id: 5, project: 'Mobile App', assignee: 'Bob', status: 'Done' },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        👋 Welcome, {user.name} ({user.role})
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* 👤 Team Member View */}
      {user.role === 'Team Member' ? (
        (() => {
          const myTasks = allTasks.filter(task => task.assignee === user.name);
          const completed = myTasks.filter(task => task.status === 'Done').length;
          const progress = myTasks.length ? (completed / myTasks.length) * 100 : 0;

          return (
            <Card sx={{ maxWidth: 600 }}>
              <CardContent>
                <Typography variant="h6">📋 My Task Summary</Typography>
                <Typography variant="body2">
                  {completed} of {myTasks.length} tasks completed
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{ height: 10, borderRadius: 5, mt: 1 }}
                />
              </CardContent>
            </Card>
          );
        })()
      ) : (
        // 🧑‍💼 Admin View
        (() => {
          const projects = [...new Set(allTasks.map(task => task.project))];

          return (
            <>
              <Typography variant="h6" gutterBottom>📊 Project Overview</Typography>
              {projects.map(project => {
                const projectTasks = allTasks.filter(task => task.project === project);
                const completed = projectTasks.filter(task => task.status === 'Done').length;
                const progress = projectTasks.length ? (completed / projectTasks.length) * 100 : 0;

                return (
                  <Card key={project} sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6">{project}</Typography>
                      <Typography variant="body2">
                        {completed} of {projectTasks.length} tasks completed
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{ height: 10, borderRadius: 5, mt: 1 }}
                      />
                    </CardContent>
                  </Card>
                );
              })}
            </>
          );
        })()
      )}
    </Box>
  );
};

export default Dashboard;