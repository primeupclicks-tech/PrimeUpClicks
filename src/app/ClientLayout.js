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
    primary: { main: '#0055b1ff', light: '#007bffff', dark: '#003063ff' },
    secondary: { main: '#0055b1ff', light: '#007bffff', dark: '#003063ff' },
    background: { default: '#ffff', paper: '#ffff' },
    text: { primary: '#000000ff', secondary: '#000000ff' }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(90deg, #0055b1ff, #fff)",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: '#ffffff',
          color: '#ffffff',
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
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          margin: 0,
          padding: 0,
          backgroundColor: '#fff',
        }}>
          
          {/* Header */}
          {isClient && !isAdminRoute && <Header />}
          
          {/* Conteúdo */}
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1,
              pt: 0,
              pb: 0,
              margin: 0,
              backgroundColor: '#fff',
            }}
          >
            {children}
          </Box>
          
          {/* Footer */}
          {isClient && !isAdminRoute && <Footer />}
        </Box>
      </Providers>
    </ThemeProvider>
  );
}
