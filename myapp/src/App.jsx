// src/App.jsx
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import SimulatedLogin from './components/SimulatedLogin';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import ProjectList from './components/ProjectList';
import TaskList from './components/TaskList';
import TeamList from './components/TeamList';
import TeamMemberPage from './pages/TeamMemberPage';

function App({ toggleTheme }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  // Login page if no user
  if (!user) {
    return (
      <Box sx={{ minHeight: '100vh' }}>
        <SimulatedLogin
          onLogin={(data) => {
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
          }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navbar user={user} onLogout={handleLogout} toggleTheme={toggleTheme} />

      <Routes>
        {/* ✅ Redirect root to proper page */}
        <Route
          path="/"
          element={
            <Navigate
              to={user.role === 'Admin' ? '/dashboard' : '/my-tasks'}
              replace
            />
          }
        />

        {/* ✅ Admin Routes */}
        {user.role === 'Admin' && (
          <>
            <Route path="/dashboard" element={<AdminPage />} />
            <Route path="/projects" element={<ProjectList user={user} />} />
            <Route path="/tasks" element={<TaskList user={user} />} />
            <Route path="/team" element={<TeamList user={user} />} />
          </>
        )}

        {/* ✅ Team Member Routes */}
        {user.role === 'Team Member' && (
          <>
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/my-tasks" element={<TeamMemberPage user={user} />} />
          </>
        )}

        {/* 🧪 Dev Reset Route */}
        <Route
          path="/reset"
          element={
            <Box sx={{ p: 4 }}>
              <Button
                variant="contained"
                onClick={() => {
                  localStorage.removeItem('user');
                  window.location.href = '/';
                }}
              >
                Reset Login (Dev)
              </Button>
            </Box>
          }
        />

        {/* Fallback for unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Box>
  );
}

export default App;