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
  }
});

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setMounted(true);

    const token = localStorage.getItem('auth_token');
    setIsLogged(!!token);
  }, []);

  // ⚠️ IMPORTANTE: só calcula após mount (cliente)
  if (!mounted) {
    // Renderiza markup neutro idêntico no SSR e cliente
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Providers>
          <Box component="main">{children}</Box>
        </Providers>
      </ThemeProvider>
    );
  }

  const isInternalRoute =
    pathname?.startsWith('/perfil');

  const hideLayout = isInternalRoute || isLogged;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Providers>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {!hideLayout && <Header />}

          <Box component="main" sx={{ flexGrow: 1 }}>
            {children}
          </Box>

          {!hideLayout && <Footer />}
        </Box>
      </Providers>
    </ThemeProvider>
  );
}
