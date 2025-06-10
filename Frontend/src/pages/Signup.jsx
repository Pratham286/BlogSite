import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context/LoginContext";

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
    error: {
      main: '#f87171',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(31, 41, 55, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '0.5rem',
            '& fieldset': {
              borderColor: '#4b5563',
            },
            '&:hover fieldset': {
              borderColor: '#60a5fa',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#60a5fa',
              boxShadow: '0 0 0 3px rgba(96, 165, 250, 0.1)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#9ca3af',
            '&.Mui-focused': {
              color: '#60a5fa',
            },
          },
          '& .MuiFormHelperText-root': {
            color: '#f87171',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          textTransform: 'none',
          fontWeight: 500,
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.2s ease',
          '&:hover': {
            background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          },
          '&:active': {
            transform: 'translateY(0)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
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

export default function Signup() {
  const navigate = useNavigate();
  const {url} = useMyContext();
  const [formInfo, setFormInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formInfo.name.trim()) newErrors.name = "Name is required";
    if (!formInfo.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formInfo.email))
      newErrors.email = "Invalid email format";
    if (!formInfo.password || formInfo.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorList = validate();
    
    if (Object.keys(errorList).length > 0) {
      setErrors(errorList);
      return;
    }

    setIsLoading(true);
    setServerError("");

    try {
      const response = await axios.post(
        `${url}/auth/signup`,
        formInfo
      );
      
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response?.status === 400) {
        setServerError("User with this email already exists");
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

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
        <Container
          maxWidth="lg"
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            py: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              minHeight: "70vh",
              borderRadius: "1rem",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Left Panel - Welcome Section */}
            <Box
              sx={{
                flex: 1,
                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.1) 100%)",
                backdropFilter: "blur(20px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 6,
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)",
                  backdropFilter: "blur(10px)",
                },
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <Typography
                  variant="h2"
                  sx={{
                    color: "#f9fafb",
                    fontWeight: 600,
                    mb: 3,
                    fontSize: { xs: "2rem", md: "3rem" },
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  Welcome!
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#d1d5db",
                    maxWidth: 400,
                    lineHeight: 1.6,
                    fontSize: "1.1rem",
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  Join our community and enjoy personalized features with secure access to all your favorite content.
                </Typography>
              </Box>
            </Box>

            {/* Right Panel - Form Section */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 4,
                backgroundColor: "rgba(31, 41, 55, 0.3)",
                backdropFilter: "blur(20px)",
              }}
            >
              <Box sx={{ width: "100%", maxWidth: 400 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    backgroundColor: "rgba(31, 41, 55, 0.8)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(75, 85, 99, 0.5)",
                  }}
                >
                  <Typography
                    variant="h4"
                    align="center"
                    sx={{
                      color: "#f9fafb",
                      fontWeight: 600,
                      mb: 4,
                      fontSize: "1.75rem",
                    }}
                  >
                    Create Account
                  </Typography>

                  {serverError && (
                    <Alert
                      severity="error"
                      sx={{
                        mb: 3,
                        backgroundColor: "rgba(248, 113, 113, 0.1)",
                        border: "1px solid rgba(248, 113, 113, 0.3)",
                        color: "#f87171",
                        "& .MuiAlert-icon": {
                          color: "#f87171",
                        },
                      }}
                    >
                      {serverError}
                    </Alert>
                  )}

                  <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formInfo.name}
                      onChange={handleChange}
                      error={Boolean(errors.name)}
                      helperText={errors.name}
                      margin="normal"
                      disabled={isLoading}
                    />

                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formInfo.email}
                      onChange={handleChange}
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                      margin="normal"
                      disabled={isLoading}
                    />

                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type="password"
                      value={formInfo.password}
                      onChange={handleChange}
                      error={Boolean(errors.password)}
                      helperText={errors.password}
                      margin="normal"
                      disabled={isLoading}
                    />

                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      disabled={isLoading}
                      sx={{
                        mt: 3,
                        mb: 2,
                        py: 1.5,
                        fontSize: "1rem",
                      }}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>

                    <Box sx={{ textAlign: "center", mt: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#9ca3af" }}
                      >
                        Already have an account?{" "}
                        <Button
                          variant="text"
                          onClick={() => navigate("/login")}
                          sx={{
                            color: "#60a5fa",
                            textTransform: "none",
                            p: 0,
                            minWidth: "auto",
                            "&:hover": {
                              backgroundColor: "transparent",
                              color: "#93c5fd",
                              textDecoration: "underline",
                            },
                          }}
                        >
                          Sign In
                        </Button>
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}