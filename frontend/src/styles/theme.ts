import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1565c0',
    },
    secondary: {
      main: '#00acc1',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
  },
});

export default theme;
