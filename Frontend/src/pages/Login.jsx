import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // const { login } = useAuth();
  const navigate = useNavigate();
  const [formInfo, setformInfo] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setformInfo({ ...formInfo, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formInfo.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formInfo.email))
      newErrors.email = "Invalid email";
    if (!formInfo.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Login Successful:", formInfo);
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/login",
          formInfo
        );
        console.log("server response", response.data);
        if (response.status === 200) {
          // if
          const token = response.data.token;
          if(token)
          {
            // console.log("Token : ",  token);
            localStorage.setItem('token', token);
            // console.log("token saved");
          }
          navigate("/dashboard");
        }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          alert("Wrong Password");
        } else if (error.response && error.response.status === 404) {
          alert("Email id is not registered");
        }
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formInfo.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            margin="normal"
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
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
