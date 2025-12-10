'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Providers } from './providers';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: { main: '#6a1b9a', light: '#8e24aa', dark: '#4a148c' },
    secondary: { main: '#ab47bc', light: '#ce93d8', dark: '#9c27b0' },
    background: { default: '#f5f5f5', paper: '#FFFFFF' },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#6a1b9a',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: '#f5f5f5',
        },
        html: {
          margin: 0,
          padding: 0,
        },
      },
    },
  },
});

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Providers>
        {/* Layout principal - SEM margin/padding extra */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          margin: 0,
          padding: 0,
        }}>
          {/* Header condicional */}
          {isClient && !isAdminRoute && <Header />}
          
          {/* Conteúdo principal - removendo padding top */}
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1,
              backgroundColor: '#f5f5f5',
              pt: 0, // Removi o padding top
              pb: 0, // Removi o padding bottom também
              margin: 0,
            }}
          >
            {children}
          </Box>
          
          {/* Footer condicional */}
          {isClient && !isAdminRoute && <Footer />}
        </Box>
      </Providers>
    </ThemeProvider>
  );
}