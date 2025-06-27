import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  LinearProgress,
  Grid,
  Skeleton,
  Paper,
} from '@mui/material';
import axios from 'axios';

const Dashboard = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/tasks');
      const filtered =
        user.role === 'Team Member'
          ? res.data.filter(
              (task) =>
                task.assignedTo?.toLowerCase().trim() ===
                user.name?.toLowerCase().trim()
            )
          : res.data;
      setTasks(filtered);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const LoadingSkeleton = () => (
    <Grid container spacing={2}>
      {[1, 2, 3].map((i) => (
        <Grid item xs={12} md={6} key={i}>
          <Skeleton variant="rectangular" height={100} animation="wave" />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        👋 Welcome, {user.name} <Typography component="span" color="text.secondary">({user.role})</Typography>
      </Typography>

      <Divider sx={{ my: 3 }} />

      {loading ? (
        <LoadingSkeleton />
      ) : user.role === 'Team Member' ? (
        (() => {
          const completed = tasks.filter((task) => task.status === 'Completed').length;
          const progress = tasks.length ? (completed / tasks.length) * 100 : 0;

          return (
            <Paper
              elevation={4}
              sx={{
                maxWidth: 600,
                borderRadius: 3,
                p: 3,
                backgroundColor: '#f9fafc',
              }}
            >
              <Typography variant="h6" color="primary" gutterBottom>
                📋 My Task Summary
              </Typography>

              <Typography variant="body2" sx={{ mb: 1 }}>
                You’ve completed <strong>{completed}</strong> of <strong>{tasks.length}</strong> assigned tasks
              </Typography>

              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ height: 12, borderRadius: 6 }}
              />

              <Typography variant="caption" display="block" align="right" sx={{ mt: 1 }}>
                {progress.toFixed(0)}% completed
              </Typography>
            </Paper>
          );
        })()
      ) : (
        (() => {
          const projectMap = {};
          tasks.forEach((task) => {
            const project = task.project || 'Unnamed Project';
            if (!projectMap[project]) {
              projectMap[project] = [];
            }
            projectMap[project].push(task);
          });

          return (
            <>
              <Typography variant="h6" color="primary" gutterBottom>
                📊 Project Progress Overview
              </Typography>

              <Grid container spacing={3}>
                {Object.entries(projectMap).map(([project, projectTasks]) => {
                  const completed = projectTasks.filter((task) => task.status === 'Completed').length;
                  const progress = projectTasks.length
                    ? (completed / projectTasks.length) * 100
                    : 0;

                  return (
                    <Grid item xs={12} md={6} key={project}>
                      <Card
                        elevation={3}
                        sx={{
                          borderRadius: 3,
                          backgroundColor: '#fff',
                          boxShadow: '0 3px 8px rgba(0,0,0,0.08)',
                        }}
                      >
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 1 }}>
                            {project}
                          </Typography>

                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {completed} of {projectTasks.length} tasks completed
                          </Typography>

                          <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{ height: 10, borderRadius: 5 }}
                          />

                          <Typography
                            variant="caption"
                            display="block"
                            align="right"
                            sx={{ mt: 1 }}
                          >
                            {progress.toFixed(0)}% done
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </>
          );
        })()
      )}
    </Box>
  );
};

export default Dashboard;