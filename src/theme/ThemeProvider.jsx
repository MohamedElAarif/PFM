// src/theme/ThemeProvider.jsx
import { createContext, useMemo, useState, useContext } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark'
            ? {
                primary: { main: '#1976d2' },
                background: { default: '#f4f1e6', paper: '#fff' },
                text: { primary: '#000', secondary: '#444' },
              }
            : {
                primary: { main: '#90caf9' },
                background: { default: '#121212', paper: '#1e1e1e' },
                text: { primary: '#fff', secondary: '#aaa' },
              }),
        },
        shape: { borderRadius: 8 },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}
