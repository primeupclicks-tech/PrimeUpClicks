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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
  IconButton,
  alpha,
  useTheme,
  styled,
  Grow,
  Tab,
  Tabs
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Download,
  Person,
  Email,
  DateRange,
  Logout,
  Store,
  PhotoLibrary,
  Settings,
  ShoppingBag,
  Visibility,
  Event,
  Notifications,
  Home,
  ArrowBack,
  PhotoCamera,
  AccountCircle  // Adicionando este import
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

// Componente Card com efeito moderno
const ModernCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  borderRadius: '16px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[6],
    borderColor: alpha(theme.palette.primary.main, 0.3)
  }
}));

// Componente de Avatar com gradiente
const GradientAvatar = styled(Avatar)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[2],
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)'
  }
}));

export default function PerfilComprador({ usuario }) {
  const theme = useTheme();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  
  const [userData, setUserData] = useState({
    nome_completo: usuario?.nome_completo?.trim() || '',
    email: usuario?.email || '',
    data_nascimento: usuario?.data_nascimento || '',
    telefone: usuario?.telefone || '',
    localizacao: usuario?.localizacao || ''
  });

  // Dados de fotos compradas (individuais)
  const fotosCompradas = [
    {
      id: 1,
      titulo: 'Pôr do Sol na Praia',
      fotografo: 'João Silva',
      dataCompra: '15/03/2024',
      preco: 49.90,
      imagem: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
      categoria: 'Natureza',
      licenca: 'Uso Pessoal',
      downloadCount: 128,
      novidade: true
    },
    {
      id: 2,
      titulo: 'Retrato Urbano Moderno',
      fotografo: 'Maria Santos',
      dataCompra: '10/03/2024',
      preco: 79.90,
      imagem: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop',
      categoria: 'Retrato',
      licenca: 'Comercial',
      downloadCount: 256
    },
    {
      id: 3,
      titulo: 'Arquitetura Futurista',
      fotografo: 'Carlos Andrade',
      dataCompra: '05/03/2024',
      preco: 89.90,
      imagem: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?w=800&h=600&fit=crop',
      categoria: 'Arquitetura',
      licenca: 'Premium',
      downloadCount: 89
    },
    {
      id: 4,
      titulo: 'Natureza Selvagem',
      fotografo: 'Ana Costa',
      dataCompra: '01/03/2024',
      preco: 69.90,
      imagem: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      categoria: 'Natureza',
      licenca: 'Básica',
      downloadCount: 156
    },
    {
      id: 5,
      titulo: 'Cidade Noturna',
      fotografo: 'Roberto Lima',
      dataCompra: '28/02/2024',
      preco: 99.90,
      imagem: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=600&fit=crop',
      categoria: 'Urbana',
      licenca: 'Premium',
      downloadCount: 210
    },
    {
      id: 6,
      titulo: 'Floresta Mística',
      fotografo: 'Patrícia Alves',
      dataCompra: '25/02/2024',
      preco: 59.90,
      imagem: 'https://images.unsplash.com/phone-1448375240586-882707db888b?w=800&h=600&fit=crop',
      categoria: 'Natureza',
      licenca: 'Uso Pessoal',
      downloadCount: 178
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
    // Aqui você faria a chamada API para salvar
  };
  
  const handleCancelClick = () => {
    setIsEditing(false);
    setUserData({
      nome_completo: usuario?.nome_completo?.trim() || '',
      email: usuario?.email || '',
      data_nascimento: usuario?.data_nascimento || '',
      telefone: usuario?.telefone || '',
      localizacao: usuario?.localizacao || ''
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
    // Lógica de download
    console.log(`Download: ${foto.titulo}`);
    // Aqui você pode implementar a lógica de download real
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Estatísticas rápidas
  const estatisticas = {
    totalFotos: fotosCompradas.length,
    totalGasto: fotosCompradas.reduce((total, foto) => total + foto.preco, 0),
    totalDownloads: fotosCompradas.reduce((total, foto) => total + foto.downloadCount, 0)
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
      {/* Header Principal */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          mb: 3,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.secondary.light, 0.05)} 100%)`,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={8}>
            <Box display="flex" alignItems="center" flexWrap="wrap" gap={2}>
              <IconButton 
                onClick={handleBackToHome} 
                sx={{ 
                  background: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.2)
                  }
                }}
              >
                <ArrowBack />
              </IconButton>
              <Box display="flex" alignItems="center" gap={2}>
                <GradientAvatar sx={{ width: 60, height: 60 }}>
                  {userData.nome_completo?.charAt(0) || 'U'}
                </GradientAvatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {userData.nome_completo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {userData.email}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" justifyContent={{ xs: 'flex-start', md: 'flex-end' }} gap={1} flexWrap="wrap">
              <Button
                variant="outlined"
                startIcon={<Home />}
                onClick={handleBackToHome}
                sx={{ borderRadius: 2 }}
              >
                Início
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{ borderRadius: 2 }}
              >
                Sair
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Abas de Navegação */}
      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              fontWeight: 600,
              py: 2
            }
          }}
        >
          <Tab icon={<ShoppingBag />} iconPosition="start" label="Minhas Fotos" />
          <Tab icon={<AccountCircle />} iconPosition="start" label="Minha Conta" />
          <Tab icon={<Store />} iconPosition="start" label="Vender Fotos" />
        </Tabs>
      </Paper>

      {/* Conteúdo das Abas */}
      {activeTab === 0 && (
        <Box>
          {/* Resumo Estatístico */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={4}>
              <ModernCard>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                    {estatisticas.totalFotos}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fotos Compradas
                  </Typography>
                </CardContent>
              </ModernCard>
            </Grid>
            <Grid item xs={12} sm={4}>
              <ModernCard>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h4" color="secondary" sx={{ fontWeight: 700, mb: 1 }}>
                    R$ {estatisticas.totalGasto.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Investido
                  </Typography>
                </CardContent>
              </ModernCard>
            </Grid>
            <Grid item xs={12} sm={4}>
              <ModernCard>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h4" color="success" sx={{ fontWeight: 700, mb: 1 }}>
                    {estatisticas.totalDownloads}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Downloads Realizados
                  </Typography>
                </CardContent>
              </ModernCard>
            </Grid>
          </Grid>

          {/* Galeria de Fotos */}
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
            Minhas Fotos Compradas
          </Typography>

          <Grid container spacing={3}>
            {fotosCompradas.map((foto, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={foto.id}>
                <Grow in={true} timeout={index * 100}>
                  <ModernCard>
                    <Box 
                      sx={{ 
                        position: 'relative',
                        height: 200,
                        overflow: 'hidden',
                        cursor: 'pointer'
                      }}
                      onClick={() => handlePhotoClick(foto)}
                    >
                      <Box
                        component="img"
                        src={foto.imagem}
                        alt={foto.titulo}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)'
                          }
                        }}
                      />
                      {foto.novidade && (
                        <Chip
                          label="NOVO"
                          size="small"
                          color="error"
                          sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            fontWeight: 600
                          }}
                        />
                      )}
                    </Box>
                    
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {foto.titulo}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                        Fotógrafo: {foto.fotografo}
                      </Typography>
                      
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Chip 
                          label={foto.categoria} 
                          size="small" 
                          variant="outlined"
                        />
                        <Typography variant="h6" color="primary">
                          R$ {foto.preco.toFixed(2)}
                        </Typography>
                      </Box>
                      
                      <Box display="flex" gap={1}>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          startIcon={<Visibility />}
                          onClick={() => handlePhotoClick(foto)}
                          sx={{
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              transform: 'translateY(-2px)'
                            }
                          }}
                        >
                          Ver
                        </Button>
                        <Button
                          fullWidth
                          variant="contained"
                          size="small"
                          startIcon={<Download />}
                          onClick={() => handleDownload(foto)}
                          sx={{
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              transform: 'translateY(-2px)'
                            }
                          }}
                        >
                          Baixar
                        </Button>
                      </Box>
                    </CardContent>
                  </ModernCard>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {activeTab === 1 && (
        <ModernCard sx={{ p: { xs: 2, md: 4 } }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Informações da Conta
            </Typography>
            {isEditing ? (
              <Box>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveClick}
                  sx={{ mr: 1 }}
                >
                  Salvar
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancelClick}
                >
                  Cancelar
                </Button>
              </Box>
            ) : (
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleEditClick}
              >
                Editar
              </Button>
            )}
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <GradientAvatar sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}>
                  {userData.nome_completo?.charAt(0) || 'U'}
                </GradientAvatar>
                {isEditing && (
                  <Button 
                    variant="outlined" 
                    size="small" 
                    sx={{ mt: 1 }}
                  >
                    Alterar Foto
                  </Button>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nome Completo"
                    name="nome_completo"
                    value={userData.nome_completo}
                    onChange={handleChange}
                    fullWidth
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <Person sx={{ mr: 1, color: 'action.active' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    fullWidth
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Data de Nascimento"
                    name="data_nascimento"
                    value={userData.data_nascimento}
                    onChange={handleChange}
                    fullWidth
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <DateRange sx={{ mr: 1, color: 'action.active' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Telefone"
                    name="telefone"
                    value={userData.telefone}
                    onChange={handleChange}
                    fullWidth
                    disabled={!isEditing}
                    placeholder="(11) 99999-9999"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Localização"
                    name="localizacao"
                    value={userData.localizacao}
                    onChange={handleChange}
                    fullWidth
                    disabled={!isEditing}
                    placeholder="Cidade, Estado"
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Segurança
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                <Button variant="outlined">
                  Alterar Senha
                </Button>
                <Button variant="outlined" color="error">
                  Excluir Conta
                </Button>
              </Box>
            </Grid>
          </Grid>
        </ModernCard>
      )}

      {activeTab === 2 && (
        <ModernCard sx={{ p: { xs: 2, md: 4 } }}>
          <Box textAlign="center" mb={4}>
            <Box
              sx={{
                display: 'inline-flex',
                p: 3,
                mb: 3,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                color: theme.palette.primary.main
              }}
            >
              <Store sx={{ fontSize: 60 }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              Venda Suas Fotos
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
              Organize suas fotos em eventos e comece a vender. Crie álbuns por ocasião e compartilhe com seus clientes.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.secondary.light, 0.05)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                }}
              >
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      background: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main
                    }}
                  >
                    <Event />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Venda por Eventos
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Organize suas fotos em álbuns temáticos
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" paragraph>
                  Crie eventos como casamentos, formaturas, aniversários e organize todas as fotos relacionadas em um só lugar.
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    startIcon={<Event />}
                    fullWidth
                    sx={{ py: 1.5 }}
                  >
                    Criar Novo Evento
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.success.light, 0.05)} 0%, ${alpha(theme.palette.info.light, 0.05)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                }}
              >
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      background: alpha(theme.palette.success.main, 0.1),
                      color: theme.palette.success.main
                    }}
                  >
                    <PhotoCamera />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Gerenciar Eventos
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Veja e edite seus eventos existentes
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" paragraph>
                  Acompanhe vendas, adicione novas fotos e gerencie o acesso dos clientes aos seus eventos fotográficos.
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="outlined"
                    startIcon={<PhotoLibrary />}
                    fullWidth
                    sx={{ py: 1.5 }}
                  >
                    Ver Meus Eventos
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
            Como funciona a venda por eventos?
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box textAlign="center" p={2}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    background: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>1</Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Crie o Evento
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Defina nome, data, local e configure os pacotes de fotos
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center" p={2}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    background: alpha(theme.palette.secondary.main, 0.1),
                    color: theme.palette.secondary.main
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>2</Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Envie para Clientes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Compartilhe o link do evento com seus clientes
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center" p={2}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    background: alpha(theme.palette.success.main, 0.1),
                    color: theme.palette.success.main
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>3</Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Eles Compram
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Clientes escolhem e compram as fotos que desejam
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </ModernCard>
      )}

      {/* Modal de Detalhes da Foto */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3
          }
        }}
      >
        {selectedPhoto && (
          <>
            <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
              {selectedPhoto.titulo}
            </DialogTitle>
            
            <DialogContent>
              <Box
                component="img"
                src={selectedPhoto.imagem}
                alt={selectedPhoto.titulo}
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  mb: 3,
                  maxHeight: '50vh',
                  objectFit: 'contain'
                }}
              />
              
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Fotógrafo:</strong> {selectedPhoto.fotografo}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Data da Compra:</strong> {selectedPhoto.dataCompra}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Categoria:</strong> {selectedPhoto.categoria}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Licença:</strong> {selectedPhoto.licenca}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Downloads:</strong> {selectedPhoto.downloadCount}</Typography>
                </Grid>
              </Grid>
              
              <Typography variant="h5" color="primary" sx={{ fontWeight: 700, mt: 2 }}>
                R$ {selectedPhoto.preco.toFixed(2)}
              </Typography>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, pt: 0 }}>
              <Button
                variant="outlined"
                onClick={() => setOpenDialog(false)}
              >
                Fechar
              </Button>
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