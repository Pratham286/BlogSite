import React from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Fade,
  Paper,
} from "@mui/material";
import { 
  Create, 
  Explore, 
  People, 
  TrendingUp,
  Article,
  Comment
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context/LoginContext";

export default function Home() {
  const navigate = useNavigate();
  const { user, isLogin } = useMyContext();

  const features = [
    {
      icon: <Create sx={{ fontSize: 40, color: '#60a5fa' }} />,
      title: "Write Stories",
      description: "Share your thoughts and experiences with the world through engaging blog posts."
    },
    {
      icon: <Explore sx={{ fontSize: 40, color: '#34d399' }} />,
      title: "Discover Content",
      description: "Explore diverse topics and discover new perspectives from fellow writers."
    },
  ];

  const stats = [
    { number: "1000+", label: "Active Writers" },
    { number: "5000+", label: "Blog Posts" },
    { number: "15k+", label: "Readers" },
    { number: "500+", label: "Daily Visits" }
  ];

  return (
    <Box sx={{ minHeight: "80vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Fade in={true} timeout={1000}>
          <Box textAlign="center" mb={8}>
            <Typography 
              variant="h2" 
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 3,
                background: 'linear-gradient(45deg, #ffffff 30%, #60a5fa 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome {isLogin && user ? user.name : 'to Our Blog'}
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'grey.300', 
                mb: 4,
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Discover amazing stories, share your thoughts, and connect with a community of passionate writers.
            </Typography>
            <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
              <Button
                variant="contained"
                size="large"
                startIcon={<Create />}
                onClick={() => navigate(isLogin ? '/dashboard' : '/signup')}
                sx={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                {isLogin ? 'Start Writing' : 'Get Started'}
              </Button>
            </Box>
          </Box>
        </Fade>

        {/* Features Section */}
        <Grid container spacing={4} mb={8}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Fade in={true} timeout={1000 + index * 200}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'rgba(31, 41, 55, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 3,
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(96, 165, 250, 0.3)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Box mb={2}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'grey.300', lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

              {/* CTA Section */}
              <Fade in={true} timeout={2000}>
                <Box 
                  textAlign="center"
                  sx={{
                    p: 4,
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
                    border: '1px solid rgba(96, 165, 250, 0.2)',
                    borderRadius: 3,
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      color: 'white', 
                      mb: 2,
                      fontWeight: 600
                    }}
                  >
                    Ready to Start Your Journey?
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'grey.300', 
                      mb: 3,
                      maxWidth: 500,
                      mx: 'auto'
                    }}
                  >
                    {/* Join thousands of writers who are already sharing their stories and building their audience. */}
                    
              Join Our Growing Community
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate(isLogin ? '/dashboard' : '/signup')}
                    sx={{
                      background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    {isLogin ? 'Go to Dashboard' : 'Sign Up Now'}
                  </Button>
                </Box>
              </Fade>
        {/* Stats Section */}
        {/* <Fade in={true} timeout={1500}>
          <Paper
            sx={{
              p: 4,
              background: 'rgba(31, 41, 55, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 3,
              backdropFilter: 'blur(15px)',
              mb: 6
            }}
          >
            <Typography 
              variant="h4" 
              textAlign="center" 
              sx={{ 
                color: 'white', 
                mb: 4,
                fontWeight: 600
              }}
            >
              Join Our Growing Community
            </Typography>
          </Paper>
        </Fade> */}

      </Container>
    </Box>
  );
}