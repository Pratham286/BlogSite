import { 
  Box, 
  Button, 
  Container, 
  Grid, 
  Paper, 
  Typography 
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  LibraryBooksOutlined, 
  CommentOutlined, 
  FavoriteOutlined 
} from "@mui/icons-material";

// Dark theme matching your CSS
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#60a5fa',
      dark: '#2563eb',
    },
    background: {
      default: 'rgba(17, 24, 39, 0.95)',
      paper: 'rgba(31, 41, 55, 0.8)',
    },
    text: {
      primary: '#f9fafb',
      secondary: '#d1d5db',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.75rem',
          textTransform: 'none',
          fontWeight: 500,
          padding: '1rem 2rem',
          fontSize: '1rem',
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.2s ease',
          '&:hover': {
            background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.4)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(31, 41, 55, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(75, 85, 99, 0.5)',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.4)',
          },
        },
      },
    },
  },
});

const Profile = () => {
  const navigate = useNavigate();

  const profileItems = [
    {
      title: "My Blogs",
      description: "View and manage your published blogs",
      icon: <LibraryBooksOutlined sx={{ fontSize: 40 }} />,
      path: "/myblog",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
    },
    {
      title: "My Comments",
      description: "See all your comments and interactions",
      icon: <CommentOutlined sx={{ fontSize: 40 }} />,
      path: "/mycomments",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    },
    {
      title: "My Liked Blogs",
      description: "Your favorite blogs collection",
      icon: <FavoriteOutlined sx={{ fontSize: 40 }} />,
      path: "/mylikedBlog",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          background: `
            linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.9) 100%),
            url("/3334896.jpg")
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <Container maxWidth="lg" sx={{ py: 6 }}>
          {/* Profile Header */}
          <Paper
            sx={{
              p: 4,
              mb: 6,
              textAlign: "center",
              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.1) 100%)",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "#f9fafb",
                fontWeight: 600,
                mb: 2,
                fontSize: { xs: "2rem", md: "3rem" },
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              My Profile
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#d1d5db",
                fontSize: "1.1rem",
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Manage your content, comments, and favorite blogs all in one place.
            </Typography>
          </Paper>

          {/* Profile Navigation Cards */}
          <Grid container spacing={4} justifyContent="center">
            {profileItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  sx={{
                    p: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: item.gradient,
                    },
                  }}
                  onClick={() => navigate(item.path)}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background: item.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                      color: "white",
                    }}
                  >
                    {item.icon}
                  </Box>
                  
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#f9fafb",
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    {item.title}
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#d1d5db",
                      mb: 3,
                      flexGrow: 1,
                    }}
                  >
                    {item.description}
                  </Typography>
                  
                  <Button
                    variant="contained"
                    sx={{
                      background: item.gradient,
                      "&:hover": {
                        background: item.gradient,
                        filter: "brightness(0.9)",
                      },
                    }}
                  >
                    View
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Profile;