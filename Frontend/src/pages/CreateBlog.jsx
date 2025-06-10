import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  styled,
  InputAdornment,
  Fade
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context/LoginContext";

// Styled Components
const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  padding: '24px'
}));

const FormPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(31, 41, 55, 0.9)',
  border: '1px solid rgba(75, 85, 99, 0.5)',
  borderRadius: '24px',
  padding: '48px',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
  position: 'relative',
  overflow: 'hidden',
  maxWidth: '800px',
  width: '100%',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #60a5fa, #3b82f6, #8b5cf6, #60a5fa)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 3s ease-in-out infinite',
  },
  '@keyframes shimmer': {
    '0%': { backgroundPosition: '-200% 0' },
    '100%': { backgroundPosition: '200% 0' }
  }
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  color: '#f8fafc',
  fontSize: '2.2rem',
  fontWeight: 700,
  fontFamily: 'Inter, sans-serif',
  textAlign: 'center',
  marginBottom: '40px',
  background: 'linear-gradient(135deg, #60a5fa 0%, #8b5cf6 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '3px',
    background: 'linear-gradient(90deg, #60a5fa, #8b5cf6)',
    borderRadius: '2px'
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: '24px',
  '& .MuiOutlinedInput-root': {
    background: 'rgba(15, 23, 42, 0.6)',
    borderRadius: '12px',
    color: '#f1f5f9',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.3s ease',
    '& fieldset': {
      borderColor: 'rgba(75, 85, 99, 0.5)',
      borderWidth: '1px'
    },
    '&:hover fieldset': {
      borderColor: 'rgba(96, 165, 250, 0.5)'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#60a5fa',
      borderWidth: '2px',
      boxShadow: '0 0 0 3px rgba(96, 165, 250, 0.1)'
    },
    '&.Mui-error fieldset': {
      borderColor: '#ef4444'
    }
  },
  '& .MuiInputLabel-root': {
    color: '#94a3b8',
    fontFamily: 'Inter, sans-serif',
    '&.Mui-focused': {
      color: '#60a5fa'
    },
    '&.Mui-error': {
      color: '#ef4444'
    }
  },
  '& .MuiFormHelperText-root': {
    color: '#ef4444',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.85rem',
    marginLeft: '4px'
  },
  '& .MuiInputBase-input': {
    fontSize: '1rem',
    '&::placeholder': {
      color: '#64748b',
      opacity: 1
    }
  }
}));

const ContentTextField = styled(StyledTextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    minHeight: '80px',
    alignItems: 'flex-start',
    '& textarea': {
      minHeight: '50px !important',
      resize: 'vertical'
    }
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  height: '56px',
  borderRadius: '12px',
  fontSize: '1.1rem',
  fontWeight: 600,
  fontFamily: 'Inter, sans-serif',
  textTransform: 'none',
  background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
  color: 'white',
  border: 'none',
  boxShadow: '0 8px 25px rgba(96, 165, 250, 0.3)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.5s ease'
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 35px rgba(96, 165, 250, 0.4)',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    '&::before': {
      left: '100%'
    }
  },
  '&:active': {
    transform: 'translateY(0)'
  },
  '&:disabled': {
    background: 'rgba(75, 85, 99, 0.5)',
    color: 'rgba(156, 163, 175, 0.7)',
    transform: 'none',
    boxShadow: 'none'
  }
}));

const FormBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
}));

const CreateBlog = () => {
  const { user } = useMyContext();
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const [formInfo, setformInfo] = useState({
    title: "",
    content: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setIsSubmitting(true);
      const blogInfo = {
        title: formInfo.title,
        content: formInfo.content,
        name: user.name,
        email: user.email,
      };
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
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <StyledContainer maxWidth="sm">
      <Fade in timeout={600}>
        <FormPaper elevation={0}>
          <FormTitle variant="h4">
            ✨ Create New Blog
          </FormTitle>
          <FormBox component="form" onSubmit={handleSubmit} noValidate>
            <StyledTextField
              fullWidth
              label="Blog Title"
              name="title"
              type="text"
              value={formInfo.title}
              onChange={handleChange}
              error={Boolean(errors.title)}
              helperText={errors.title}
              placeholder="Enter an engaging title for your blog..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <span style={{ fontSize: '1.2rem' }}>📝</span>
                  </InputAdornment>
                ),
              }}
            />
            <ContentTextField
              fullWidth
              label="Blog Content"
              name="content"
              multiline
              rows={8}
              value={formInfo.content}
              onChange={handleChange}
              error={Boolean(errors.content)}
              helperText={errors.content}
              placeholder="Share your thoughts, ideas, and stories here..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                    <span style={{ fontSize: '1.2rem' }}>📖</span>
                  </InputAdornment>
                ),
              }}
            />
            <SubmitButton
              fullWidth
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? '✨ Creating Blog...' : '🚀 Publish Blog'}
            </SubmitButton>
          </FormBox>
        </FormPaper>
      </Fade>
    </StyledContainer>
  );
};

export default CreateBlog;