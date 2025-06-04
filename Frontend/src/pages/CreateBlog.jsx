import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context/LoginContext";

const CreateBlog = () => {
  const { user } = useMyContext();
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const [formInfo, setformInfo] = useState({
    title: "",
    content: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setformInfo({ ...formInfo, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formInfo.title) newErrors.title = "Title is required";
    if (!formInfo.content) newErrors.content = "Content is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // console.log(formInfo);
      const blogInfo = {
        title: formInfo.title,
        content: formInfo.content,
        name: user.name,
        email: user.email,
      };
      // console.log(blogInfo);
      try {
        const response = await axios.post(
          "http://localhost:3000/dashboard/create",
          blogInfo,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        if (response.status === 200) {
          console.log("Blog Stored");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          alert("Unauthorized");
        } else {
          alert("Internal Error");
        }
      }
    }
  };
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Blog Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Title"
            name="title"
            type="text"
            value={formInfo.title}
            onChange={handleChange}
            error={Boolean(errors.title)}
            helperText={errors.title}
            margin="normal"
          />
          <TextField
            // sx={{height:"300px"}}

            fullWidth
            label="Content"
            name="content"
            type="content"
            value={formInfo.content}
            onChange={handleChange}
            error={Boolean(errors.content)}
            helperText={errors.content}
            margin="normal"
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Create
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateBlog;
