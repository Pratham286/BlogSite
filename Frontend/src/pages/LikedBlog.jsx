import React from 'react'
import { useMyContext } from '../context/LoginContext'
import Blog from '../component/Blog';
import { Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
});

const LikedBlog = () => {
  const { user } = useMyContext();
  const navigate = useNavigate();
  const blogArray = user?.likedBlog || [];
  // const likes = user?.likedBlog?.likedUser;
  // const blogArray = user
  // console.log(blogArray);
  const handleClick = (blogItem) => {
    navigate(`/detail?id=${blogItem._id}`);
  };

  return (
    <PageContainer maxWidth="lg">
      <PageTitle variant="h2" component="h1">
        Liked Blogs
      </PageTitle>
      
      {blogArray.length > 0 ? (
        <BlogGrid>
          {blogArray.map((blogs) => (
            <Blog 
              onClick={() => handleClick(blogs)}
              title={blogs.title} 
              author={blogs.author.name} 
              likes={blogs?.likedUser.length || 0}
              // likes={0}
              key={blogs._id}
            />
          ))}
        </BlogGrid>
      ) : (
        <EmptyState>
          <EmptyStateText>
            No liked blogs yet
          </EmptyStateText>
          <Typography variant="body2" sx={{ color: '#9ca3af' }}>
            Start exploring and like some blogs!
          </Typography>
        </EmptyState>
      )}
    </PageContainer>
  );
};

export default LikedBlog;