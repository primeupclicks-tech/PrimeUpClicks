'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Divider,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Snackbar, Alert,  
} from '@mui/material';
import Image from 'next/image';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Google,
  ArrowForward,
  Person,
} from '@mui/icons-material';

export default function RegisterPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [formData, setFormData] = useState({
  nome_completo: '',
  email: '',
  password: '',
  confirmPassword: '',
});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cadastro:", formData);
    if (formData.password !== formData.confirmPassword) {
     setOpenAlert(true);
    return;
}
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f5f5 0%, #f0e6f5 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="sm" disableGutters sx={{ px: { xs: 2, sm: 0 } }}>
        <Paper
          elevation={10}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(106, 27, 154, 0.15)',
          }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                p: { xs: 4, md: 6 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {/* LOGO + TÍTULO */}
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: 50,
                      height: 50,
                      mr: 1.5,
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    }}
                  >
                    <Image
                      src="/logo.png"
                      alt="PrimeUp Clicks"
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      background: 'linear-gradient(45deg, #6a1b9a, #8e24aa)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    PrimeUp Clicks
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                  Crie sua conta para continuar.
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Tenha acesso às suas fotos e eventos.
                </Typography>
              </Box>

              {/* FORMULÁRIO */}
              <form onSubmit={handleSubmit}>
                {/* Nome Completo */}
                <TextField
                  fullWidth
                  label="Nome completo"
                  name="nome_completo"
                  value={formData.nome_completo}
                  onChange={handleChange}
                  required
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Email */}
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Senha */}
                <TextField
                  fullWidth
                  label="Senha"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                    fullWidth
                    label="Confirmar Senha"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    sx={{ mb: 3 }}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <Lock color="primary" />
                        </InputAdornment>
                        ),
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                            >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                    />

                    <Snackbar
                        open={openAlert}
                        autoHideDuration={3000}
                        onClose={() => setOpenAlert(false)}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                        <Alert onClose={() => setOpenAlert(false)} severity="error" variant="filled">
                        As senhas não coincidem!
                        </Alert>
                    </Snackbar>

                {/* BOTÃO CADASTRAR */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    background: 'linear-gradient(45deg, #6a1b9a, #8e24aa)',
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    mb: 3,
                    '&:hover': {
                      background: 'linear-gradient(45deg, #8e24aa, #ab47bc)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Criar conta
                </Button>

                {/* Divider */}
                <Divider sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', px: 2 }}>
                    Ou cadastre-se com
                  </Typography>
                </Divider>

                {/* Google */}
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Google />}
                    sx={{
                      borderColor: '#db4437',
                      color: '#db4437',
                      px: 4,
                      '&:hover': {
                        borderColor: '#db4437',
                        backgroundColor: 'rgba(219, 68, 55, 0.04)',
                      },
                    }}
                  >
                    GOOGLE
                  </Button>
                </Box>

                {/* Link para login */}
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Já tem uma conta?{' '}
                    <Link href="/login" style={{ textDecoration: 'none' }}>
                      <Typography
                        component="span"
                        sx={{
                          color: '#6a1b9a',
                          fontWeight: 700,
                          '&:hover': { textDecoration: 'underline' },
                        }}
                      >
                        Entre aqui
                      </Typography>
                    </Link>
                  </Typography>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
