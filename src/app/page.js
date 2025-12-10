'use client';

import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions,
  Box,
  CircularProgress,
  IconButton,
  Chip,
  Avatar,
  Rating,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  AppBar,
  Toolbar,
  Fab,
  alpha
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  PhotoCamera as PhotoCameraIcon,
  ArrowForward as ArrowForwardIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  TrendingUp as TrendingUpIcon,
  Whatshot as WhatshotIcon,
  NewReleases as NewReleasesIcon,
  AttachMoney as AttachMoneyIcon,
  CloudUpload as CloudUploadIcon,
  Person as PersonIcon,
  Category as CategoryIcon,
  LocationOn as LocationOnIcon,
  CalendarToday as CalendarTodayIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  Info as InfoIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  Explore as ExploreIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// Animação para elementos flutuantes
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 ${alpha('#7b1fa2', 0.4)}; }
  70% { box-shadow: 0 0 0 10px ${alpha('#7b1fa2', 0)}; }
  100% { box-shadow: 0 0 0 0 ${alpha('#7b1fa2', 0)}; }
`;

export default function PhotoSalesPage() {
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Dados mockados para demonstração
      const mockPhotos = [
        {
          id: '1',
          title: 'Aurora Boreal',
          description: 'Esplêndida aurora boreal sobre as montanhas geladas da Noruega',
          author: 'Maria Santos',
          price: 89.90,
          credits: 90,
          resolution: '8K',
          rating: 4.8,
          category: 'Natureza',
          tags: ['natureza', 'aurora', 'noite', 'frio'],
          downloads: 1245,
          url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          title: 'Cidade Noturna',
          description: 'Arranha-céus iluminados em uma metrópole vibrante',
          author: 'Carlos Oliveira',
          price: 49.90,
          credits: 50,
          resolution: '4K',
          rating: 4.3,
          license: 'Standard',
          category: 'Cidade',
          tags: ['cidade', 'noite', 'arquitetura', 'luzes'],
          downloads: 892,
          url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          createdAt: '2024-02-20'
        },
        {
          id: '3',
          title: 'Retrato Profissional',
          description: 'Retrato corporativo com iluminação de estúdio profissional',
          author: 'Ana Rodrigues',
          price: 129.90,
          credits: 130,
          resolution: '6K',
          rating: 4.9,
          license: 'Enterprise',
          category: 'Pessoas',
          tags: ['retrato', 'profissional', 'estúdio', 'negócios'],
          downloads: 567,
          url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          createdAt: '2024-03-10',
          isFavorite: true
        },
        {
          id: '4',
          title: 'Praia Tropical',
          description: 'Águas cristalinas e areia branca em uma ilha paradisíaca',
          author: 'João Silva',
          price: 69.90,
          credits: 70,
          resolution: '4K',
          rating: 4.5,
          license: 'Standard',
          category: 'Viagens',
          tags: ['praia', 'tropical', 'férias', 'natureza'],
          downloads: 1342,
          url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          createdAt: '2024-01-30'
        },
        {
          id: '5',
          title: 'Arte Abstrata',
          description: 'Composição abstrata com cores vibrantes e formas orgânicas',
          author: 'Beatriz Costa',
          price: 159.90,
          credits: 160,
          resolution: '8K',
          rating: 4.7,
          category: 'Arte',
          tags: ['abstrato', 'cores', 'arte', 'design'],
          downloads: 423,
          url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          createdAt: '2024-03-05'
        },
        {
          id: '6',
          title: 'Tecnologia Futurista',
          description: 'Interface tecnológica com elementos de realidade aumentada',
          author: 'Ricardo Alves',
          price: 99.90,
          credits: 100,
          resolution: '6K',
          rating: 4.6,
          category: 'Tecnologia',
          tags: ['tecnologia', 'futuro', 'digital', 'inovação'],
          downloads: 678,
          url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          createdAt: '2024-02-15'
        },
        {
          id: '7',
          title: 'Floresta Encantada',
          description: 'Caminho através de uma floresta densa com luzes do amanhecer',
          author: 'Pedro Almeida',
          price: 79.90,
          credits: 80,
          resolution: '6K',
          rating: 4.4,
          license: 'Standard',
          category: 'Natureza',
          tags: ['floresta', 'amanhecer', 'caminho', 'magia'],
          downloads: 987,
          url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          createdAt: '2024-02-28'
        },
        {
          id: '8',
          title: 'Gastronomia Gourmet',
          description: 'Prato sofisticado apresentado com perfeição gastronômica',
          author: 'Camila Fernandes',
          price: 59.90,
          credits: 60,
          resolution: '4K',
          rating: 4.2,
          license: 'Standard',
          category: 'Alimentos',
          tags: ['gastronomia', 'comida', 'gourmet', 'chef'],
          downloads: 754,
          url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          createdAt: '2024-03-12'
        }
      ];

      const mockCategories = [
        { id: '1', name: 'Natureza', count: 1245, icon: '🌿' },
        { id: '2', name: 'Cidade', count: 892, icon: '🏙️' },
        { id: '3', name: 'Pessoas', count: 1567, icon: '👥' },
        { id: '4', name: 'Viagens', count: 2341, icon: '✈️' },
        { id: '5', name: 'Arte', count: 423, icon: '🎨' },
        { id: '6', name: 'Tecnologia', count: 678, icon: '💻' },
        { id: '7', name: 'Negócios', count: 945, icon: '💼' },
        { id: '8', name: 'Alimentos', count: 567, icon: '🍽️' },
        { id: '9', name: 'Esportes', count: 723, icon: '⚽' },
        { id: '10', name: 'Animais', count: 1156, icon: '🐾' }
      ];

      // Simular delay de carregamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPhotos(mockPhotos);
      setCategories(mockCategories);
      setLoading(false);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Não foi possível carregar as fotos. Tente novamente mais tarde.');
      setLoading(false);
    }
  };

  const toggleFavorite = (photoId) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === photoId 
        ? { ...photo, isFavorite: !photo.isFavorite }
        : photo
    ));
  };

  const addToCart = (photo) => {
    setCartItems(prev => [...prev, photo]);
  };

  const filteredPhotos = photos
    .filter(photo => {
      if (selectedCategory !== 'all' && photo.category !== selectedCategory) {
        return false;
      }
      if (searchQuery && !photo.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !photo.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !photo.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
        default:
          return b.downloads - a.downloads;
      }
    });


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '80vh',
        background: 'linear-gradient(135deg, #f5f3f7 0%, #ffffff 100%)'
      }}>
        <Box sx={{ position: 'relative' }}>
          <CircularProgress 
            size={80} 
            thickness={2}
            sx={{ 
              color: '#9c27b0',
              animation: `${pulseAnimation} 2s infinite`
            }} 
          />
          <PhotoCameraIcon 
            sx={{ 
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 30,
              color: '#9c27b0'
            }} 
          />
        </Box>
        <Typography variant="h6" sx={{ mt: 3, color: '#7b1fa2', fontWeight: 500 }}>
          Carregando...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      {/* AppBar */}
      <AppBar position="sticky" sx={{ 
        background: 'linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%)',
        boxShadow: '0 4px 20px rgba(123, 31, 162, 0.2)'
      }}>

      </AppBar>
      {/* Hero Section */}
      <Box sx={{ 
        position: 'relative',
        background: 'linear-gradient(135deg, #0d0b1e 0%, #2e1534 30%, #4a1b5a 100%)',
        color: 'white',
        overflow: 'hidden',
        py: { xs: 6, md: 10 },
        mb: 6
      }}>
        <Container maxWidth="xl">
  <Grid 
    container 
    spacing={4} 
    alignItems="center"
    justifyContent="center"
    sx={{ textAlign: { xs: 'center', md: 'left' } }}
  >
    <Grid item xs={12} md={6}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: { xs: 'center', md: 'center' },
        justifyContent: 'center',
        height: '100%'
      }}>
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
            fontWeight: 800,
            background: 'linear-gradient(90deg, #ffffff 0%, #e1bee7 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 2,
            lineHeight: 1.2,
            textAlign: { xs: 'center', md: 'center' }
          }}
        >
          Descubra Fotos Incríveis
        </Typography>
        
        <Typography 
          variant="h5" 
          sx={{ 
            maxWidth: '600px', 
            color: 'rgba(255,255,255,0.9)',
            fontSize: { xs: '1rem', md: '1.3rem' },
            mb: 4,
            fontWeight: 300,
            lineHeight: 1.6,
            textAlign: { xs: 'center', md: 'center' }
          }}
        >
          Suas fotos com alta qualidade e preços baixos. 
          <br />  
          Para dar um 
          <span style={{ color: '#ce93d8', fontWeight: 500 }}> UP </span>
          nas suas rede sociais
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          flexWrap: 'wrap',
          justifyContent: { xs: 'center', md: 'center' }
        }}>
          <Button 
            variant="contained" 
            size="large"
            startIcon={<ExploreIcon />}
            sx={{ 
              backgroundColor: 'white', 
              color: '#7b1fa2',
              fontWeight: 700,
              borderRadius: 2,
              px: 4,
              py: 1.5,
              '&:hover': {
                backgroundColor: '#f3e5f5',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(255,255,255,0.3)'
              }
            }}
          >
            Explorar Galeria
          </Button>
        </Box>
      </Box>
    </Grid>
    
    <Grid item xs={12} md={6}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}>
        <Box sx={{ 
          position: 'relative',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          maxWidth: '600px',
          width: '100%'
        }}>
          <CardMedia
            component="img"
            image="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Fotógrafo profissional"
            sx={{ 
              width: '100%',
              height: { xs: '300px', md: '400px' },
              objectFit: 'cover'
            }}
          />
          <Box sx={{ 
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(123, 31, 162, 0.9))',
            p: 3,
            color: 'white'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Fotos do Mês
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Por João Silva
            </Typography>
          </Box>
        </Box>
      </Box>
    </Grid>
  </Grid>
</Container>

        {/* Elementos decorativos */}
        <Box sx={{ 
          position: 'absolute', 
          top: 40, 
          right: 40, 
          animation: `${floatAnimation} 6s ease-in-out infinite`,
          opacity: 0.2
        }}>
          <PhotoCameraIcon sx={{ fontSize: 80, transform: 'rotate(15deg)' }} />
        </Box>
        <Box sx={{ 
          position: 'absolute', 
          bottom: 30, 
          left: 50, 
          animation: `${floatAnimation} 7s ease-in-out infinite 1s`,
          opacity: 0.15
        }}>
          <PhotoCameraIcon sx={{ fontSize: 60, transform: 'rotate(-10deg)' }} />
        </Box>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Filtros e Ordenação */}
        <Card sx={{ 
          mb: 4, 
          p: 3, 
          borderRadius: 3,
          background: 'linear-gradient(145deg, #ffffff 0%, #f9f0fa 100%)',
          border: '1px solid rgba(123, 31, 162, 0.1)'
        }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Buscar fotos, tags, autores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#9c27b0' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: '#f9f0fa',
                    '&:hover': {
                      backgroundColor: '#f3e5f5'
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Categoria</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Categoria"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  sx={{
                    backgroundColor: '#f9f0fa',
                    '&:hover': {
                      backgroundColor: '#f3e5f5'
                    }
                  }}
                >
                  <MenuItem value="all">Todas as Categorias</MenuItem>
                  {categories.map(cat => (
                    <MenuItem key={cat.id} value={cat.name}>
                      {cat.icon} {cat.name} ({cat.count})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Ordenar por</InputLabel>
                <Select
                  value={sortBy}
                  label="Ordenar por"
                  onChange={(e) => setSortBy(e.target.value)}
                  sx={{
                    backgroundColor: '#f9f0fa',
                    '&:hover': {
                      backgroundColor: '#f3e5f5'
                    }
                  }}
                >
                  <MenuItem value="popular">
                    <TrendingUpIcon sx={{ fontSize: 16, mr: 1 }} /> Mais Populares
                  </MenuItem>
                  <MenuItem value="newest">
                    <NewReleasesIcon sx={{ fontSize: 16, mr: 1 }} /> Mais Recentes
                  </MenuItem>
                  <MenuItem value="price-low">
                    <AttachMoneyIcon sx={{ fontSize: 16, mr: 1 }} /> Preço: Menor
                  </MenuItem>
                  <MenuItem value="price-high">
                    <AttachMoneyIcon sx={{ fontSize: 16, mr: 1 }} /> Preço: Maior
                  </MenuItem>
                  <MenuItem value="rating">
                    <WhatshotIcon sx={{ fontSize: 16, mr: 1 }} /> Melhor Avaliadas
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip 
              label="Todas" 
              onClick={() => setSelectedCategory('all')}
              color={selectedCategory === 'all' ? 'secondary' : 'default'}
            />
            {categories.slice(0, 6).map(cat => (
              <Chip
                key={cat.id}
                label={`${cat.icon} ${cat.name}`}
                onClick={() => setSelectedCategory(cat.name)}
                color={selectedCategory === cat.name ? 'secondary' : 'default'}
              />
            ))}
          </Box>
        </Card>

        {/* Galeria de Fotos */}
        <Typography variant="h4" sx={{ 
          fontWeight: 700, 
          mb: 3, 
          color: '#7b1fa2',
          borderLeft: '4px solid #9c27b0',
          pl: 2
        }}>
          Galeria 
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 0.5, fontWeight: 400 }}>
            {filteredPhotos.length} fotos disponíveis
          </Typography>
        </Typography>

        <Grid container spacing={3}>
          {filteredPhotos.map((photo) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
              <Card sx={{ 
                borderRadius: 3,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 16px 32px rgba(123, 31, 162, 0.2)'
                }
              }}>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={photo.url}
                    alt={photo.title}
                    sx={{
                      transition: 'transform 0.5s ease',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                  <Box sx={{ 
                    position: 'absolute', 
                    top: 10, 
                    right: 10,
                    display: 'flex',
                    gap: 1 
                  }}>
                    <IconButton 
                      size="small"
                      onClick={() => toggleFavorite(photo.id)}
                      sx={{ 
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        '&:hover': { backgroundColor: 'white' }
                      }}
                    >
                      {photo.isFavorite ? (
                        <FavoriteIcon sx={{ color: '#e91e63', fontSize: 20 }} />
                      ) : (
                        <FavoriteBorderIcon sx={{ fontSize: 20 }} />
                      )}
                    </IconButton>
                  </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    mb: 1,
                    fontSize: '1rem',
                    lineHeight: 1.4,
                    color: '#2e1534'
                  }}>
                    {photo.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ 
                    mb: 2,
                    fontSize: '0.85rem',
                    lineHeight: 1.5
                  }}>
                    {photo.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <Avatar sx={{ 
                      width: 28, 
                      height: 28, 
                      mr: 1, 
                      bgcolor: '#7b1fa2',
                      fontSize: '0.875rem'
                    }}>
                      {photo.author.charAt(0)}
                    </Avatar>
                    <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                      {photo.author}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Rating 
                      value={photo.rating} 
                      size="small" 
                      readOnly 
                      precision={0.5}
                      sx={{ color: '#ff9800' }}
                    />
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                      ({photo.downloads} downloads)
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    {photo.tags.slice(0, 3).map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        sx={{ 
                          backgroundColor: '#f3e5f5',
                          color: '#7b1fa2',
                          fontSize: '0.7rem'
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>

                <CardActions sx={{ 
                  p: 2, 
                  pt: 0, 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Box>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 700, 
                      color: '#9c27b0',
                      lineHeight: 1
                    }}>
                      R$ {photo.price.toFixed(2)}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      ou {photo.credits} créditos
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" sx={{ color: '#9c27b0' }}>
                      <InfoIcon />
                    </IconButton>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => addToCart(photo)}
                      sx={{
                        backgroundColor: '#7b1fa2',
                        fontWeight: 600,
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: '#6a1b9a'
                        }
                      }}
                    >
                      Comprar
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredPhotos.length === 0 && (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8,
            background: 'linear-gradient(135deg, #f9f0fa 0%, #f3e5f5 100%)',
            borderRadius: 3
          }}>
            <PhotoCameraIcon sx={{ fontSize: 60, color: '#ce93d8', mb: 2 }} />
            <Typography variant="h6" sx={{ color: '#7b1fa2', mb: 1 }}>
              Nenhuma foto encontrada
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tente ajustar seus filtros ou termos de busca
            </Typography>
          </Box>
        )}

        {/* CTA Final */}
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          mt: 6,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Box sx={{ 
            position: 'absolute', 
            top: -50, 
            right: -50, 
            animation: `${floatAnimation} 8s ease-in-out infinite`,
            opacity: 0.1
          }}>
            <PhotoCameraIcon sx={{ fontSize: 200 }} />
          </Box>
          
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, position: 'relative' }}>
            Compre já Suas Fotos
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 600, mx: 'auto', mb: 4, opacity: 0.9, position: 'relative' }}>
            Sem burocracia. Rápido, fácil e seguro!
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<PersonAddIcon/>}
            sx={{
              backgroundColor: 'white',
              color: '#7b1fa2',
              fontWeight: 700,
              borderRadius: 2,
              px: 6,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: '#f3e5f5',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(255,255,255,0.3)'
              }
            }}
          >
            Cadastre-se Agora
          </Button>
        </Box>
      </Container>
    </Box>
  );
}