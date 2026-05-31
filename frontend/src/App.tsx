import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PolicyListPage from './pages/PolicyListPage';
import PolicyComparePage from './pages/PolicyComparePage';
import { Policy } from './types/policy';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function App() {
  const [selected, setSelected] = useState<Policy[]>(() => {
    if (typeof window === 'undefined') return [];
    const raw = window.localStorage.getItem('policyCompare.selected');
    return raw ? (JSON.parse(raw) as Policy[]) : [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    window.localStorage.setItem('policyCompare.selected', JSON.stringify(selected));
  }, [selected]);

  const handleToggle = (policy: Policy) => {
    setSelected((current) => {
      const exists = current.some((item) => item.id === policy.id);
      if (exists) {
        return current.filter((item) => item.id !== policy.id);
      }
      if (current.length >= 4) return current;
      return [...current, policy];
    });
  };

  const handleClear = () => setSelected([]);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PolicyCompare
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>Policy List</Button>
          <Button disabled={selected.length < 2} color="inherit" onClick={() => navigate('/compare')}>
            Compare ({selected.length})
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<PolicyListPage selected={selected} onToggle={handleToggle} onCompare={() => navigate('/compare')} onClear={handleClear} />} />
          <Route path="/compare" element={<PolicyComparePage selected={selected} onClear={handleClear} />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
