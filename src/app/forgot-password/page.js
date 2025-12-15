'use client';

import { useState,  } from 'react';
import {
  Box, Container, Typography, TextField, Button, Paper,
  Grid,  InputAdornment, Snackbar, Alert, 
} from '@mui/material';
import Image from 'next/image';
import {
  Email,  ArrowForward
} from '@mui/icons-material';

export default function LoginForm() {
    const [formData, setFormData] = useState({ email: ''});
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [messageTrue, setMessageTrue] = useState("");
    const [openAlertMessage, setOpenAlertMessage] = useState(false);


  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

  const handleSubmit = async (e) => {
  e.preventDefault()
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    setAlertMessage("Por favor, insira um email válido");
    setOpenAlert(true);
    return;
  }

    const dados = { email: formData.email
};
    try {
      const response = await fetch('/api/autenticacao/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })

      if (response.ok) {
  const data = await response.json()
  setMessageTrue(`redifina sua senha acessando o link enviado no seu email`)
  setOpenAlertMessage(true);
} else {
  const errorData = await response.json();
  setAlertMessage(errorData.message || "Erro ao enviar email de recuperação");
  setOpenAlert(true);
}
    } catch (error) {
      setAlertMessage("Erro ao conectar ao servidor.");
      setOpenAlert(true);
    }
  }

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
                  Informe o email utilizado no cadastro
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

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
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
                    transition: 'all 0.3s ease',
                  }}
                >
                    Enviar código de verificação
                </Button>


                <Snackbar
                    open={openAlertMessage}
                    autoHideDuration={3000}
                    onClose={() => setOpenAlertMessage(false)}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                <Alert onClose={() => setOpenAlertMessage(false)} severity="success" variant="filled">
                {messageTrue}
                </Alert>
                </Snackbar>

                <Snackbar
                    open={openAlert}
                    autoHideDuration={3000}
                    onClose={() => setOpenAlert(false)}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                <Alert onClose={() => setOpenAlert(false)} severity="error" variant="filled">
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
