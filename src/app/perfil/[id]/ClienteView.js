'use client'

import { signOut } from 'next-auth/react';
import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  Button,
  TextField,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
  InputAdornment
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Download,
  Person,
  Email,
  DateRange,
  Logout
} from '@mui/icons-material';

export default function PerfilComprador({ usuario }) {
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  const [userData, setUserData] = useState({
    nome_completo: usuario?.nome_completo?.trim() || '',
    email: usuario?.email || '',
    data_nascimento: usuario?.data_nascimento || ''
  });

  // Dados de fotos compradas
  const fotosCompradas = [
    {
      id: 1,
      titulo: 'Pôr do Sol na Praia',
      fotografo: 'João Silva',
      dataCompra: '15/03/2024',
      preco: 49.90,
      imagem: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      titulo: 'Retrato Urbano',
      fotografo: 'Maria Santos',
      dataCompra: '10/03/2024',
      preco: 79.90,
      imagem: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop',
    }
  ];

  const handleLogout = async () => {
    await signOut({ 
      callbackUrl: '/',
      redirect: true
    });
  };

  const handleEditClick = () => setIsEditing(true);
  
  const handleSaveClick = () => {
    setIsEditing(false);
  };
  
  const handleCancelClick = () => {
    setIsEditing(false);
    setUserData({
      nome_completo: usuario?.nome_completo?.trim() || '',
      email: usuario?.email || '',
      data_nascimento: usuario?.data_nascimento || ''
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePhotoClick = (foto) => {
    setSelectedPhoto(foto);
    setOpenDialog(true);
  };
  
  const handleDownload = (foto) => {
    console.log(`Download: ${foto.titulo}`);
    // Lógica de download aqui
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="outlined"
          color="error"
          startIcon={<Logout />}
          onClick={handleLogout}
        >
          Sair
        </Button>
      </Box>

      {/* Cabeçalho do Perfil */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar 
            sx={{ 
              width: 100, 
              height: 100, 
              mr: 3,
              bgcolor: 'primary.main',
              fontSize: '2rem'
            }}
          >
            {userData.nome_completo?.charAt(0) || 'U'}
          </Avatar>
          
          <Box flex={1}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h4" component="h1">
                {isEditing ? (
                  <TextField
                    name="nome_completo"
                    value={userData.nome_completo}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  />
                ) : (
                  userData.nome_completo
                )}
              </Typography>
              
              {isEditing ? (
                <Box>
                  <IconButton onClick={handleSaveClick} color="primary">
                    <SaveIcon />
                  </IconButton>
                  <IconButton onClick={handleCancelClick} color="error">
                    <CancelIcon />
                  </IconButton>
                </Box>
              ) : (
                <IconButton onClick={handleEditClick} color="primary">
                  <EditIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Informações do Usuário */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              <Person sx={{ verticalAlign: 'middle', mr: 1 }} />
              Informações Pessoais
            </Typography>
            
            {isEditing ? (
              <>
                <TextField
                  label="Nome Completo"
                  name="nome_completo"
                  value={userData.nome_completo}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  label="Data de Nascimento"
                  name="data_nascimento"
                  value={userData.data_nascimento}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DateRange />
                      </InputAdornment>
                    )
                  }}
                />
              </>
            ) : (
              <>
                <Typography><strong>Email:</strong> {userData.email}</Typography>
                <Typography><strong>Data de Nascimento:</strong> {userData.data_nascimento || 'Não informada'}</Typography>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>

      {/* Fotos Compradas */}
      <Typography variant="h5" gutterBottom>
        Minhas Fotos Compradas
      </Typography>
      
      <Grid container spacing={3} mb={4}>
        {fotosCompradas.map((foto) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={foto.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={foto.imagem}
                alt={foto.titulo}
                sx={{ cursor: 'pointer' }}
                onClick={() => handlePhotoClick(foto)}
              />
              <CardContent>
                <Typography variant="h6" noWrap>{foto.titulo}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Fotógrafo: {foto.fotografo}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                  <Chip label={foto.categoria} size="small" />
                  <Typography variant="h6" color="primary">
                    R$ {foto.preco.toFixed(2)}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Button
                    size="small"
                    startIcon={<Download />}
                    onClick={() => handleDownload(foto)}
                  >
                    Baixar
                  </Button>
                  <Chip label={foto.licenca} size="small" variant="outlined" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal de Detalhes da Foto */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md">
        {selectedPhoto && (
          <>
            <DialogTitle>{selectedPhoto.titulo}</DialogTitle>
            <DialogContent>
              <img
                src={selectedPhoto.imagem}
                alt={selectedPhoto.titulo}
                style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }}
              />
              <Typography><strong>Fotógrafo:</strong> {selectedPhoto.fotografo}</Typography>
              <Typography><strong>Data da Compra:</strong> {selectedPhoto.dataCompra}</Typography>
              <Typography variant="h6" color="primary" mt={2}>
                Preço: R$ {selectedPhoto.preco.toFixed(2)}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Fechar</Button>
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={() => {
                  handleDownload(selectedPhoto);
                  setOpenDialog(false);
                }}
              >
                Baixar Foto
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}