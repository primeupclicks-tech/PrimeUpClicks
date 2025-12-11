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
    FormControlLabel,
    Checkbox,
    useTheme,
    useMediaQuery,
  } from '@mui/material';
  import Image from 'next/image';
  import {
    Email,
    Lock,
    Visibility,
    VisibilityOff,  
    Google,
    ArrowForward,
  } from '@mui/icons-material';

  export default function LoginPage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    const handleSubmit = (e) => {
      e.preventDefault();

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
        <Container maxWidth="sm" disableGutters sx={{px: { xs: 2, sm: 0 }, }}>
          <Paper
            elevation={10}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(106, 27, 154, 0.15)',
            }}
          >
            <Grid container >
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  p: { xs: 4, md: 6 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <Box sx={{
                      position: 'relative',
                      width: 50,
                      height: 50,
                      mr: 1.5,
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
                    Faça login para acessar sua conta
                  </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
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

                  <TextField
                    fullWidth
                    label="Senha"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Lembrar-me"
                    />
                    <Link href="/forgot-password" style={{ textDecoration: 'none' }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#6a1b9a',
                          fontWeight: 600,
                          '&:hover': { textDecoration: 'underline' },
                        }}
                      >
                        Esqueceu a senha?
                      </Typography>
                    </Link>
                  </Box>

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
                    Entrar
                  </Button>

                  <Divider sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', px: 2 }}>
                      Ou entre com
                    </Typography>
                  </Divider>

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

                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Não tem uma conta?{' '}
                      <Link href="/register" style={{ textDecoration: 'none' }}>
                        <Typography
                          component="span"
                          sx={{
                            color: '#6a1b9a',
                            fontWeight: 700,
                            '&:hover': { textDecoration: 'underline' },
                          }}
                        >
                          Cadastre-se
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