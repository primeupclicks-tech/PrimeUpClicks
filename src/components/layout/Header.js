'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Drawer,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Image from "next/image";

const navItems = [
  { name: 'Buscar Fotos', href: '/fotos' },
];

export default function Header() {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isAuthenticated = status === 'authenticated';

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
 <AppBar
  position="static"
  sx={{
    background: "linear-gradient(90deg, #6a1b9a, #8e24aa, #ab47bc)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'linear-gradient(90deg, #ff9800, #ffeb3b, #4caf50)',
    }
  }}
>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ display: "flex", alignItems: "center", pt: 1, marginBottom: '15px'}}>

            {/* LOGO */}
            <Typography
              component={Link}
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: 800,
                color: "white",
                textDecoration: "none",
                fontSize: "1.4rem",
                mr: 3
              }}
            >
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
              PrimeUp Clicks
            </Typography>

            {/* NAV DESKTOP */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                gap: 2
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  href={item.href}
                  sx={{
                    color: 'white',
                    fontSize: '0.95rem',
                    textTransform: "none",
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)' }
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>

            {/* AÇÕES (DESKTOP) */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>

              {/* CARRINHO */}
              <IconButton sx={{ color: "white" }} component={Link} href="/carrinho">
                  <ShoppingCartIcon />
              </IconButton>

              {/* LOGIN */}
              <Button
                component={Link}
                href="/login"
                variant="outlined"
                startIcon={<LoginIcon />}
                sx={{
                  color: "white",
                  borderColor: "white",
                  textTransform: "none",
                  '&:hover': { background: 'rgba(255,255,255,0.2)' }
                }}
              >
                Login
              </Button>

              {/* CADASTRAR */}
              <Button
                component={Link}
                href="/register"
                variant="contained"
                startIcon={<PersonAddIcon />}
                sx={{
                  background: "#ab47bc",
                  color: "#fff",
                  textTransform: "none",
                  '&:hover': { background: "#9c27b0" }
                }}
              >
                Cadastrar
              </Button>

            </Box>

            {/* ICONE MOBILE */}
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' }, ml: 'auto' }}
            >
              <MenuIcon />
            </IconButton>

          </Toolbar>
        </Container>
      </AppBar>

      {/* MENU MOBILE */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 260, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Menu
          </Typography>

          <Divider sx={{ mb: 1 }} />

          {navItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton component={Link} href={item.href} onClick={handleDrawerToggle}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}

          <Divider sx={{ my: 2 }} />

          {/* Ações mobile */}
          <ListItemButton component={Link} href="/carrinho" onClick={handleDrawerToggle}>
            <ShoppingCartIcon sx={{ mr: 1 }} />
            <ListItemText primary="Carrinho" />
          </ListItemButton>

          <ListItemButton component={Link} href="/login" onClick={handleDrawerToggle}>
            <LoginIcon sx={{ mr: 1 }} />
            <ListItemText primary="Login" />
          </ListItemButton>

          <ListItemButton component={Link} href="/register" onClick={handleDrawerToggle}>
            <PersonAddIcon sx={{ mr: 1 }} />
            <ListItemText primary="Cadastrar" />
          </ListItemButton>

        </Box>
      </Drawer>
    </>
  );
}