// src/App.jsx
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import SimulatedLogin from './components/SimulatedLogin';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import ProjectList from './components/ProjectList';
import TaskList from './components/TaskList';
import TeamList from './components/TeamList';
import TeamMemberPage from './pages/TeamMemberPage';
import { useState } from 'react';

function App({ toggleTheme }) {
  const theme = useTheme();
  const [user, setUser] = useState(null);

  const backgroundImage =
    theme.palette.mode === 'light'
      ? 'url(https://www.transparenttextures.com/patterns/white-wall-3.png)'
      : 'url(https://www.transparenttextures.com/patterns/dark-mosaic.png)';

  if (!user) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage,
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
        }}
      >
        <SimulatedLogin onLogin={setUser} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
      }}
    >
      <Navbar user={user} onLogout={() => setUser(null)} toggleTheme={toggleTheme} />

      <Routes>
        {/* Admin Routes */}
        {user.role === 'Admin' && (
          <>
            <Route path="/" element={<AdminPage />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/team" element={<TeamList />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
          </>
        )}

        {/* Team Member Routes */}
        {user.role === 'Team Member' && (
          <>
            <Route path="/" element={<TeamMemberPage user={user} />} />
            <Route path="/my-tasks" element={<TeamMemberPage user={user} />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
          </>
        )}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  );
}

export default App;