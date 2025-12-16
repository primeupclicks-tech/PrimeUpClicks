'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Divider
} from '@mui/material';
import Image from 'next/image';
import {
  VerifiedUser,
  Check,
  Send,
  ArrowBack,
  Email,
  ArrowForward
} from '@mui/icons-material';
import Link from 'next/link';
import { signOut } from "next-auth/react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const usuario_id = searchParams.get('usuario_id');
  
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [verificationTimer, setVerificationTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const inputRefs = useRef([]);

  useEffect(() => {
  if (!usuario_id) {
    router.replace('/login');
  }
}, [usuario_id]);

  // Timer para reenvio
  useEffect(() => {
    let interval;
    if (verificationTimer > 0) {
      interval = setInterval(() => {
        setVerificationTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [verificationTimer]);

  // Verificar código
  const verifyCode = async () => {
    const code = verificationCode.join('');

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/autenticacao/verify-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          usuario_id: usuario_id,
          codigo: code
        })
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage(data.message || "Email verificado com sucesso!");
        setAlertSeverity("success");
        setOpenAlert(true);

        setTimeout(async () => {
          await signOut({
            callbackUrl: "/login?message=Email verificado com sucesso, faça login"
          });
        }, 2000);
      } else {
        setAlertMessage(data.error || "Código inválido");
        setAlertSeverity("error");
        setOpenAlert(true);
        // Limpar código para nova tentativa
        setVerificationCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      setAlertMessage("Erro ao verificar código");
      setAlertSeverity("error");
      setOpenAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reenviar código
  const resendCode = async () => {
    setIsResending(true);
    try {
      const response = await fetch('/api/autenticacao/resend-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id })
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage("Novo código enviado para seu email!");
        setAlertSeverity("success");
        setVerificationTimer(60); // 60 segundos para reenvio
        setCanResend(false);
      } else {
        setAlertMessage(data.error || "Erro ao reenviar código");
        setAlertSeverity("error");
      }
      setOpenAlert(true);
    } catch (error) {
      setAlertMessage("Erro ao conectar ao servidor");
      setAlertSeverity("error");
      setOpenAlert(true);
    } finally {
      setIsResending(false);
    }
  };

  // Manipulação do código
  const handleCodeChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...verificationCode];
    newCode[index] = value.slice(-1);
    setVerificationCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isCodeComplete = verificationCode.every(digit => digit !== '');

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
              {/* LOGO + TÍTULO - ESTILO IDÊNTICO AO CADASTRO */}
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
                  Verificação de Email
                </Typography>
              </Box>

              {/* ÍCONE E MENSAGEM */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Enviamos um código de 6 dígitos para o email cadastrado.
                  Digite o código abaixo para ativar sua conta.
                </Typography>
              </Box>

              {/* INPUTS DO CÓDIGO - ESTILO SIMILAR AOS CAMPOS DO CADASTRO */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                  Código de verificação
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <TextField
                      key={index}
                      inputRef={el => inputRefs.current[index] = el}
                      value={verificationCode[index]}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      inputProps={{
                        maxLength: 1,
                        style: { 
                          textAlign: 'center',
                          fontSize: '24px',
                          fontWeight: 'bold',
                          padding: '12px 0'
                        }
                      }}
                      sx={{
                        width: '60px',
                        '& .MuiOutlinedInput-root': {
                          height: '60px',
                          borderRadius: 2,
                          '& input': { 
                            textAlign: 'center',
                            padding: '12px 0'
                          }
                        }
                      }}
                    />
                  ))}
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 2, textAlign: 'center', display: 'block' }}>
                  O código expira em 15 minutos
                </Typography>
              </Box>

              {/* BOTÃO VERIFICAR - ESTILO IDÊNTICO AO CADASTRO */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={verifyCode}
                disabled={isSubmitting || !isCodeComplete}
                endIcon={isSubmitting ? null : <ArrowForward />}
                sx={{
                  background: isCodeComplete && !isSubmitting 
                    ? 'linear-gradient(135deg, #00315fff 0%, #0055b1ff 50%, #00315fff 100%)'
                    : '#e0e0e0',
                  color: isCodeComplete && !isSubmitting ? 'white' : '#9e9e9e',
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  mb: 3,
                  '&:hover': isCodeComplete && !isSubmitting ? {
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
                {isSubmitting ? 'Verificando...' : 'Verificar Código'}
              </Button>

              {/* REENVIAR CÓDIGO */}
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                {verificationTimer > 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    Pode reenviar em: {Math.floor(verificationTimer / 60)}:
                    {(verificationTimer % 60).toString().padStart(2, '0')}
                  </Typography>
                ) : (
                  <Button
                    variant="text"
                    startIcon={isResending ? <CircularProgress size={20} /> : <Send />}
                    onClick={resendCode}
                    disabled={isResending || !canResend}
                    sx={{ 
                      color: '#0055b1ff',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: 'rgba(0, 85, 177, 0.04)',
                      }
                    }}
                  >
                    {isResending ? 'Enviando...' : 'Reenviar Código'}
                  </Button>
                )}
              </Box>


              {/* VOLTAR PARA Register - ESTILO SIMILAR */}
              <Box sx={{ textAlign: 'center' }}>
                
                <Link href="/register" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    sx={{
                      borderColor: '#0055b1ff',
                      color: '#0055b1ff',
                      px: 4,
                      '&:hover': {
                        borderColor: '#0055b1ff',
                        backgroundColor: 'rgba(0, 85, 177, 0.04)',
                      },
                    }}
                  >
                    Voltar para Cadastro
                  </Button>
                </Link>
              </Box>

              {/* ALERTAS - ESTILO IDÊNTICO */}
              <Snackbar
                open={openAlert}
                autoHideDuration={5000}
                onClose={() => setOpenAlert(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert 
                  onClose={() => setOpenAlert(false)} 
                  severity={alertSeverity} 
                  variant="filled"
                  sx={{ width: '100%' }}
                >
                  {alertMessage}
                </Alert>
              </Snackbar>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}       