'use client';

import { useState, useEffect } from 'react';
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
  Snackbar, 
  Alert,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
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
  CheckCircle,
  Cancel
} from '@mui/icons-material';
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    passwordsMatch: false
  });

  // Dados do formulário
  const [formData, setFormData] = useState({
    nome_completo: '',
    email: '',
    senha: '',
    confirmar_senha: ''
  });

  const router = useRouter();

  // Validação em tempo real da senha
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

  // Validações
  const isPasswordValid = () => {
    return Object.values(passwordErrors).every(error => error === true);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateNome = (nome) => {
    return nome.trim().length >= 2 && nome.trim().split(' ').length >= 2;
  };

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

  const isFormValid = () => {
    return (
      validateNome(formData.nome_completo) &&
      validateEmail(formData.email) &&
      isPasswordValid()
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validação 1: Nome completo
    if (!validateNome(formData.nome_completo)) {
      setAlertMessage("Por favor, insira seu nome completo (nome e sobrenome)");
      setOpenAlert(true);
      return;
    }

    // Validação 2: Email válido
    if (!validateEmail(formData.email)) {
      setAlertMessage("Por favor, insira um email válido");
      setOpenAlert(true);
      return;
    }

    // Validação 3: Senhas coincidem
    if (formData.senha !== formData.confirmar_senha) {
      setAlertMessage("As senhas não coincidem!");
      setOpenAlert(true);
      return;
    }

    // Validação 4: Senha forte
    if (!isPasswordValid()) {
      setAlertMessage("A senha não atende todos os requisitos de segurança");
      setOpenAlert(true);
      return;
    }

    setIsSubmitting(true);

    const usuario = { 
      nome_completo: formData.nome_completo, 
      email: formData.email, 
      senha: formData.senha
    };

    try {
      const response = await fetch('/api/autenticacao/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      });

      const data = await response.json();

      if (response.ok) {
        // Redirecionar para página de verificação com o ID do usuário
        router.push(`/verificar-email?usuario_id=${data.usuario_id}`);
      } else {
        setAlertMessage(data.error || "Erro ao cadastrar usuário");
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
                      background: 'linear-gradient(135deg, #00315fff 0%, #0055b1ff 50%, #00315fff 100%)',
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
                  Com uma conta você pode comprar ou vender fotos.
                </Typography>
              </Box>

              {/* FORMULÁRIO */}
              <form onSubmit={handleRegister}>
                {/* Nome Completo */}
                <TextField
                  fullWidth
                  label="Nome completo"
                  name="nome_completo"
                  value={formData.nome_completo}
                  onChange={handleChange}
                  required
                  error={formData.nome_completo.length > 0 && !validateNome(formData.nome_completo)}
                  helperText={formData.nome_completo.length > 0 && !validateNome(formData.nome_completo) ? "Digite nome e sobrenome" : ""}
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
                  error={formData.email.length > 0 && !validateEmail(formData.email)}
                  helperText={formData.email.length > 0 && !validateEmail(formData.email) ? "Digite um email válido" : ""}
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
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Indicador de força da senha */}
                {formData.senha && (
                  <Box sx={{ mb: 2 }}>
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

                {/* Confirmar Senha */}
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

                {/* Alertas */}
                <Snackbar
                  open={openAlert}
                  autoHideDuration={5000}
                  onClose={() => setOpenAlert(false)}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <Alert onClose={() => setOpenAlert(false)} severity="error" variant="filled">
                    {alertMessage}
                  </Alert>
                </Snackbar>

                {/* BOTÃO CADASTRAR */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isSubmitting || !isFormValid()}
                  endIcon={isSubmitting ? null : <ArrowForward />}
                  sx={{
                    background: isFormValid() && !isSubmitting 
                      ? 'linear-gradient(135deg, #00315fff 0%, #0055b1ff 50%, #00315fff 100%)'
                      : '#e0e0e0',
                    color: isFormValid() && !isSubmitting ? 'white' : '#9e9e9e',
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    mb: 3,
                    '&:hover': isFormValid() && !isSubmitting ? {
                      background: 'linear-gradient(135deg, #00509bff 0%, #006bdeff 50%, #00509bff 100%)',
                      transform: 'translateY(-2px)',
                    } : {
                      background: '#e0e0e0',
                      cursor: 'not-allowed'
                    },
                    '&:disabled': {
                      background: '#e0e0e0',
                      color: '#9e9e9e',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isSubmitting ? 'Cadastrando...' : 'Criar conta'}
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
                          color: '#0055b1ff',
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