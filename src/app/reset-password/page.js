'use client';

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react';
import {
  Box, Container, Typography, TextField, Button, Paper,
  Grid, InputAdornment, Snackbar, Alert, IconButton,
  LinearProgress, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import Image from 'next/image';
import {
  Email,
  ArrowForward,
  Password,
  Visibility,
  VisibilityOff,
  Lock,
  CheckCircle,
  Cancel
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
  const [formData, setFormData] = useState({ 
    senha: '', 
    confirmar_senha: '' 
  });
  const token = useSearchParams().get('token');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    passwordsMatch: false
  });
  const router = useRouter();
  useEffect(() => {
    const validatePassword = () => {
      const errors = {
        minLength: formData.senha.length >= 8,
        hasUpperCase: /[A-Z]/.test(formData.senha),
        hasLowerCase: /[a-z]/.test(formData.senha),
        hasNumber: /\d/.test(formData.senha),
        hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.senha),
        passwordsMatch: formData.senha === formData.confirmar_senha && formData.senha.length > 0
      };
      setPasswordErrors(errors);
    };

    validatePassword();
  }, [formData.senha, formData.confirmar_senha]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculatePasswordStrength = () => {
    let strength = 0;
    const { minLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar } = passwordErrors;
    
    if (minLength) strength += 20;
    if (hasUpperCase) strength += 20;
    if (hasLowerCase) strength += 20;
    if (hasNumber) strength += 20;
    if (hasSpecialChar) strength += 20;
    
    return strength;
  };

  const getPasswordStrengthColor = () => {
    const strength = calculatePasswordStrength();
    if (strength < 40) return 'error';
    if (strength < 80) return 'warning';
    return 'success';
  };

  const getPasswordStrengthLabel = () => {
    const strength = calculatePasswordStrength();
    if (strength === 0) return 'Muito fraca';
    if (strength < 40) return 'Fraca';
    if (strength < 60) return 'Razoável';
    if (strength < 80) return 'Boa';
    return 'Excelente';
  };

  const isPasswordValid = () => {
    return Object.values(passwordErrors).every(error => error === true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação 1: As senhas coincidem
    if (formData.senha !== formData.confirmar_senha) {
      setAlertMessage("As senhas não coincidem");
      setOpenAlert(true);
      return;
    }

    // Validação 2: Senha forte o suficiente
    if (!isPasswordValid()) {
      setAlertMessage("A senha não atende todos os requisitos de segurança");
      setOpenAlert(true);
      return;
    }

    // Validação 3: Token presente
    if (!token) {
      setAlertMessage("Token inválido ou expirado");
      setOpenAlert(true);
      return;
    }

    setIsSubmitting(true);

    const dados = { 
      password: formData.senha,
      token
    };
    
    try {
      const response = await fetch('/api/autenticacao/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });

      const data = await response.json();

      if (response.ok) {
        // Sucesso - redirecionar com mensagem
        router.push(`/login?message=Senha+redefinida+com+sucesso`);
      } else {
        setAlertMessage(data.error || "Erro ao redefinir senha");
        setOpenAlert(true);
      }
    } catch (error) {
      setAlertMessage("Erro ao conectar ao servidor.");
      setOpenAlert(true);
    } finally {
      setIsSubmitting(false);
    }
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
            boxShadow: '0 20px 60px rgba(0, 144, 246, 0.15)',
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
                      background: 'linear-gradient(135deg, #00315fff 0%, #0055b1ff 50%, #00315fff 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    PrimeUp Clicks
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                  Informe sua nova senha
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Senha"
                  name="senha"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.senha}
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

                {/* Indicador de força da senha */}
                {formData.senha && (
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        Força da senha:
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontWeight: 'bold',
                          color: getPasswordStrengthColor() === 'error' ? 'error.main' : 
                                 getPasswordStrengthColor() === 'warning' ? 'warning.main' : 
                                 'success.main'
                        }}
                      >
                        {getPasswordStrengthLabel()}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={calculatePasswordStrength()} 
                      color={getPasswordStrengthColor()}
                      sx={{ 
                        height: 6, 
                        borderRadius: 3,
                        mb: 2 
                      }}
                    />

                    {/* Lista de requisitos */}
                    <List dense sx={{ p: 0 }}>
                      <ListItem sx={{ p: 0, mb: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          {passwordErrors.minLength ? 
                            <CheckCircle color="success" fontSize="small" /> : 
                            <Cancel color="error" fontSize="small" />
                          }
                        </ListItemIcon>
                        <ListItemText 
                          primary="Mínimo 8 caracteres" 
                          primaryTypographyProps={{ 
                            variant: 'caption',
                            color: passwordErrors.minLength ? 'text.primary' : 'text.secondary'
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ p: 0, mb: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          {passwordErrors.hasUpperCase ? 
                            <CheckCircle color="success" fontSize="small" /> : 
                            <Cancel color="error" fontSize="small" />
                          }
                        </ListItemIcon>
                        <ListItemText 
                          primary="Pelo menos uma letra maiúscula" 
                          primaryTypographyProps={{ 
                            variant: 'caption',
                            color: passwordErrors.hasUpperCase ? 'text.primary' : 'text.secondary'
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ p: 0, mb: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          {passwordErrors.hasLowerCase ? 
                            <CheckCircle color="success" fontSize="small" /> : 
                            <Cancel color="error" fontSize="small" />
                          }
                        </ListItemIcon>
                        <ListItemText 
                          primary="Pelo menos uma letra minúscula" 
                          primaryTypographyProps={{ 
                            variant: 'caption',
                            color: passwordErrors.hasLowerCase ? 'text.primary' : 'text.secondary'
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ p: 0, mb: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          {passwordErrors.hasNumber ? 
                            <CheckCircle color="success" fontSize="small" /> : 
                            <Cancel color="error" fontSize="small" />
                          }
                        </ListItemIcon>
                        <ListItemText 
                          primary="Pelo menos um número" 
                          primaryTypographyProps={{ 
                            variant: 'caption',
                            color: passwordErrors.hasNumber ? 'text.primary' : 'text.secondary'
                          }}
                        />
                      </ListItem>
                      <ListItem sx={{ p: 0, mb: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          {passwordErrors.hasSpecialChar ? 
                            <CheckCircle color="success" fontSize="small" /> : 
                            <Cancel color="error" fontSize="small" />
                          }
                        </ListItemIcon>
                        <ListItemText 
                          primary="Pelo menos um caractere especial (!@#$% etc.)" 
                          primaryTypographyProps={{ 
                            variant: 'caption',
                            color: passwordErrors.hasSpecialChar ? 'text.primary' : 'text.secondary'
                          }}
                        />
                      </ListItem>
                    </List>
                  </Box>
                )}

                <TextField
                  fullWidth
                  label="Confirmar Senha"
                  name="confirmar_senha"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmar_senha}
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
                  error={formData.confirmar_senha.length > 0 && !passwordErrors.passwordsMatch}
                  helperText={formData.confirmar_senha.length > 0 && !passwordErrors.passwordsMatch ? "As senhas não coincidem" : ""}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isSubmitting || !isPasswordValid()}
                  endIcon={isSubmitting ? null : <ArrowForward />}
                  sx={{
                    background: 'linear-gradient(135deg, #00315fff 0%, #0055b1ff 50%, #00315fff 100%)',
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    mb: 3,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #00509bff 0%, #006bdeff 50%, #00509bff 100%)',
                      transform: 'translateY(-2px)',
                    },
                    '&:disabled': {
                      background: '#e0e0e0',
                      color: '#9e9e9e',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isSubmitting ? 'Redefinindo...' : 'Redefinir Senha'}
                </Button>

                <Snackbar
                  open={openAlert}
                  autoHideDuration={5000}
                  onClose={() => setOpenAlert(false)}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <Alert 
                    onClose={() => setOpenAlert(false)} 
                    severity="error" 
                    variant="filled"
                    sx={{ width: '100%' }}
                  >
                    {alertMessage}
                  </Alert>
                </Snackbar>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}