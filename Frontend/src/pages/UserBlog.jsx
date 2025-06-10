import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Blog from '../component/Blog';
import { Box, Typography, CircularProgress, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../context/LoginContext';
import { styled } from '@mui/material/styles';

const PageContainer = styled(Container)({
  minHeight: '100vh',
  paddingTop: '2rem',
  paddingBottom: '2rem',
});

const BlogGrid = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '1rem',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  minHeight: '60vh',
  marginTop: '1.5rem',
});

const PageTitle = styled(Typography)({
  color: '#f9fafb',
  fontWeight: 600,
  textAlign: 'center',
  marginBottom: '2rem',
  fontSize: '2.5rem',
  background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

const EmptyState = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '40vh',
  textAlign: 'center',
  padding: '2rem',
});

const EmptyStateText = styled(Typography)({
  color: '#d1d5db',
  fontSize: '1.25rem',
  marginBottom: '1rem',
});

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '40vh',
});

const UserBlog = () => {
  const {user} = useMyContext();
  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/dashboard/getUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            id: user._id,
          },
        });
        setBlog(response.data.blogData);
        setError(null);
      } catch (error) {
        console.log("Error: ", error);
        setError("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };
    
    if (user?._id) {
      fetchBlog();
    }
  }, [user, token]);

  const handleClick = (blogItem) => {
    navigate(`/detail?id=${blogItem._id}`);
  };

  if (loading) {
    return (
      <PageContainer maxWidth="lg">
        <LoadingContainer>
          <CircularProgress 
            sx={{ 
              color: '#60a5fa',
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              }
            }} 
            size={50}
          />
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer maxWidth="lg">
        <EmptyState>
          <EmptyStateText variant="h6" color="error">
            {error}
          </EmptyStateText>
        </EmptyState>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="lg">
      <PageTitle variant="h2" component="h1">
        My Blogs
      </PageTitle>
      
      {blog && blog.length > 0 ? (
        <BlogGrid>
          {blog.map((blogItem) => (
            <Blog 
              onClick={() => handleClick(blogItem)} 
              key={blogItem._id} 
              title={blogItem.title} 
              author={blogItem.author.name} 
              likes={blogItem.likedUser.length}
            />
          ))}
        </BlogGrid>
      ) : (
        <EmptyState>
          <EmptyStateText>
            No blogs found
          </EmptyStateText>
          <Typography variant="body2" sx={{ color: '#9ca3af' }}>
            Start writing your first blog post!
          </Typography>
        </EmptyState>
      )}
    </PageContainer>
  );
};

export default UserBlog;