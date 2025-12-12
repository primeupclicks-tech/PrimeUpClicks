'use client';

import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
  Fade
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Image from "next/image";
import { useEffect, useState } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };  

  return (
    <>
      {/* Botão de voltar ao topo */}
      <Fade in={showScrollTop}>
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
            background: "#0055b1ff",
            color: 'white',   
            '&:hover': {
              backgroundColor: '#0055b1ff',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease',
            boxShadow: 3,
            width: 48,
            height: 48,
          }}
        >
          <ArrowUpwardIcon />
        </IconButton>
      </Fade>

      <Box
        component="footer"
        sx={{
          background: 'linear-gradient(135deg, #00315fff 0%, #0055b1ff 50%, #00315fff 100%)',
          color: 'white',
          py: 8,
          mt: 'auto',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #007bffff, #007bffff)',
          }
        }}
      >
        {/* Elementos decorativos */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            opacity: 0.5,
          }}
        />
        
        <Container maxWidth="lg">
          {/* Grid principal */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr',
            gap: 6,
            mb: 6,
          }}>
            {/* Coluna esquerda - Logo e descrição */}
            <Box>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 3,
                gap: 2
              }}>
                <Box sx={{
                  position: 'relative',
                  width: 60,
                  height: 60,
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                }}>
                  <Image
                    src="/logo.png"
                    alt="PrimeUp Clicks"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 800,
                    background: 'linear-gradient(45deg, #ffffff, #e0e0e0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 0.5
                  }}>
                    PrimeUp Clicks
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    opacity: 0.9,
                    fontStyle: 'italic'
                  }}>
                    Elevando sua presença digital
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Coluna direita - Contato */}
            <Box sx={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 4,
              p: 4,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 700,
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '&::before': {
                  content: '""',
                  width: 30,
                  height: 3,
                  background: 'linear-gradient(90deg, #007bffff, #007bffff)',
                  borderRadius: 2,
                }
              }}>
                Entre em Contato
              </Typography>
              
              <Stack spacing={3}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateX(4px)',
                  }
                }}>
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <EmailIcon sx={{ fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ opacity: 0.7, display: 'block' }}>
                      Email
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      primeupclicks@gmail.com
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateX(4px)',
                  }
                }}>
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <LocationOnIcon sx={{ fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ opacity: 0.7, display: 'block' }}>
                      Localização
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Brasil
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Box>

          {/* Divisor */}
          <Box sx={{ 
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            my: 4 
          }} />

          {/* Créditos */}
          <Box sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: 2,
            pt: 3,
          }}>
            <Box>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                © {currentYear || '2024'} PrimeUp Clicks. Todos os direitos reservados.
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.6 }}>
                Fundador: <Box component="span" sx={{ fontWeight: 600, opacity: 0.9 }}>Jose Gabriel da Silva Lima</Box>
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ opacity: 0.6, textAlign: isMobile ? 'left' : 'right' }}>
              Desenvolvido por{' '}
              <MuiLink
                href="https://www.linkedin.com/in/henrique-bruno-4522073a0/"
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#007bffff',
                    borderBottomColor: '#007bffff',
                  }
                }}
              >
                Henrique Bruno da Costa Oliveira
              </MuiLink>
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}