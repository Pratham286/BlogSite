import React from "react";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Person,
  Login,
  PersonAdd,
  Logout,
  Home,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context/LoginContext";

function Header(props) {
  const { isLogin, setIsLogin, user } = useMyContext();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    navigate("/login");
  };

  const handleHome = () => {
    if (isLogin) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 10 }}>
      <AppBar
        position="fixed"
        sx={{
          background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(20, 20, 20, 0.9) 100%)',
          backdropFilter: "blur(15px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo/Brand */}
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton
              onClick={handleHome}
              sx={{
                color: 'white',
                '&:hover': { color: '#60a5fa' }
              }}
            >
              <Home />
            </IconButton>
            <Typography
              onClick={handleHome}
              variant="h5"
              component="div"
              sx={{ 
                flexGrow: 1,
                fontWeight: 700,
                background: 'linear-gradient(45deg, #ffffff 30%, #60a5fa 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                cursor: 'pointer',
                '&:hover': {
                  background: 'linear-gradient(45deg, #60a5fa 30%, #ffffff 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }
              }}
            >
              {isMobile ? "BlogSite" : "Blogging Site"}
            </Typography>
          </Box>

          {/* Navigation Buttons */}
          <Box display="flex" alignItems="center" gap={1}>
            {!isLogin ? (
              <>
                <Button
                  startIcon={<PersonAdd />}
                  onClick={() => navigate("/Signup")}
                  sx={{
                    color: "white",
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(96, 165, 250, 0.1)',
                      borderColor: '#60a5fa',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isMobile ? "" : "Sign Up"}
                </Button>
                <Button
                  startIcon={<Login />}
                  onClick={() => navigate("/login")}
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isMobile ? "" : "Login"}
                </Button>
              </>
            ) : (
              <>
                <Button
                  startIcon={<Person />}
                  onClick={() => navigate("/profile")}
                  sx={{
                    color: "white",
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(96, 165, 250, 0.1)',
                      borderColor: '#60a5fa',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isMobile ? "" : "Profile"}
                </Button>
                
                {/* User Avatar */}
                {/* {user && (
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 32,
                      height: 32,
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                      transition: 'transform 0.2s ease'
                    }}
                    onClick={() => navigate("/profile")}
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </Avatar>
                )} */}

                <Button
                  startIcon={<Logout />}
                  onClick={handleLogout}
                  sx={{
                    color: "#f87171",
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    border: '1px solid rgba(248, 113, 113, 0.3)',
                    '&:hover': {
                      backgroundColor: 'rgba(248, 113, 113, 0.1)',
                      borderColor: '#f87171',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isMobile ? "" : "Logout"}
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;