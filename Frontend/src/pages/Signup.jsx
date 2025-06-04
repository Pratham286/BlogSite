import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formInfo, setFormInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formInfo.name.trim()) newErrors.name = "Name is required";
    if (!formInfo.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formInfo.email))
      newErrors.email = "Invalid email";
    if (!formInfo.password || formInfo.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    // console.log("HI")
    const errorList = validate();
    if(Object.keys(errorList).length > 0)
    {
      // console.log("Form Submitted: ", formInfo);
      setErrors(errorList);
    }
    else{
      try {
        const response = await axios.post("http://localhost:3000/auth/signup", formInfo);
        console.log("server response", response.data);
        // console.log("server response", response.status);
        if(response.status === 201)
        {
          navigate('/login');
        }
      } catch (error) {
        console.error("Error" , error)
        if(error.response && error.response.status === 400)
        {
          alert("User with this email already exists");
        }
        else{
          alert("Something went wrong, try again.")
        }
      }
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
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
          />
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
            Sign Up
          </Button>
        </Box>
        
      </Paper>
    </Container>
  );
}
