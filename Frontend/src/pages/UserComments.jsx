import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Box, Typography, styled, Avatar, Divider, Chip, CircularProgress } from '@mui/material';

// Styled Components
const Container = styled(Box)(({ theme }) => ({
  padding: '24px',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  minHeight: '100vh',
  fontFamily: 'Inter, sans-serif'
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  color: '#f8fafc',
  fontSize: '2rem',
  fontWeight: 700,
  fontFamily: 'Inter, sans-serif',
  marginBottom: '32px',
  textAlign: 'center',
  background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
}));

const CommentContainer = styled(Box)(({ theme }) => ({
  background: 'rgba(31, 41, 55, 0.8)',
  border: '1px solid rgba(75, 85, 99, 0.5)',
  borderRadius: '16px',
  padding: '24px',
  marginBottom: '20px',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.3), transparent)',
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
    borderColor: 'rgba(96, 165, 250, 0.4)',
    '&::before': {
      background: 'linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.6), transparent)',
    }
  }
}));

const CommentHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '16px'
}));

const BlogAvatar = styled(Avatar)(({ theme }) => ({
  width: '48px',
  height: '48px',
  background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
  color: 'white',
  fontSize: '1.2rem',
  fontWeight: 700,
  fontFamily: 'Inter, sans-serif',
  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
}));

const BlogTitle = styled(Typography)(({ theme }) => ({
  color: '#f1f5f9',
  fontSize: '1.2rem',
  fontWeight: 600,
  fontFamily: 'Inter, sans-serif',
  flex: 1,
  lineHeight: '1.4',
  cursor: 'pointer',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: '#60a5fa'
  }
}));

const CommentMessage = styled(Typography)(({ theme }) => ({
  color: '#cbd5e1',
  fontSize: '1rem',
  lineHeight: '1.7',
  fontFamily: 'Inter, sans-serif',
  marginLeft: '64px',
  padding: '16px 20px',
  background: 'rgba(15, 23, 42, 0.6)',
  borderRadius: '12px',
  border: '1px solid rgba(51, 65, 85, 0.3)',
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '-8px',
    top: '20px',
    width: '0',
    height: '0',
    borderTop: '8px solid transparent',
    borderBottom: '8px solid transparent',
    borderRight: '8px solid rgba(15, 23, 42, 0.6)',
  }
}));

const CommentLabel = styled(Chip)(({ theme }) => ({
  background: 'rgba(34, 197, 94, 0.15)',
  color: '#4ade80',
  fontSize: '0.8rem',
  fontWeight: 500,
  fontFamily: 'Inter, sans-serif',
  border: '1px solid rgba(34, 197, 94, 0.3)',
  height: '28px',
  '& .MuiChip-label': {
    padding: '0 8px'
  }
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px',
  flexDirection: 'column',
  gap: '16px'
}));

const LoadingText = styled(Typography)(({ theme }) => ({
  color: '#94a3b8',
  fontSize: '1rem',
  fontFamily: 'Inter, sans-serif'
}));

const EmptyState = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: '48px 24px',
  color: '#64748b'
}));

const EmptyStateText = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontFamily: 'Inter, sans-serif',
  marginBottom: '8px'
}));

const EmptyStateSubtext = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  fontFamily: 'Inter, sans-serif',
  opacity: 0.7
}));

// Helper function to get initials from blog title
const getInitials = (title) => {
  if (!title) return '?';
  return title
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const UserComments = () => {
  const token = localStorage.getItem("token")
  const [commentData, setCommentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/comment/getusercomment", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setCommentData(response.data.commentData);
      } catch (error) {
        console.log("Error: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, [token]);

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <CircularProgress size={48} sx={{ color: '#60a5fa' }} />
          <LoadingText>Loading your comments...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <EmptyState>
          <EmptyStateText>❌ Error loading comments</EmptyStateText>
          <EmptyStateSubtext>{error}</EmptyStateSubtext>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <PageTitle>Your Comments</PageTitle>
      
      {commentData.length === 0 ? (
        <EmptyState>
          <EmptyStateText>💬 No comments yet</EmptyStateText>
          <EmptyStateSubtext>Start engaging with blog posts to see your comments here</EmptyStateSubtext>
        </EmptyState>
      ) : (
        commentData.map((comData, key) => (
          <CommentContainer key={key}>
            <CommentHeader>
              <BlogAvatar>
                {getInitials(comData.blogname.title)}
              </BlogAvatar>
              <Box sx={{ flex: 1 }}>
                <BlogTitle variant="h6">
                  {comData.blogname.title}
                </BlogTitle>
              </Box>
              <CommentLabel 
                label="Your Comment" 
                size="small"
                icon={<span style={{ fontSize: '0.8rem' }}>💭</span>}
              />
            </CommentHeader>
            
            <CommentMessage variant="body1">
              {comData.message}
            </CommentMessage>
          </CommentContainer>
        ))
      )}
    </Container>
  )
}

export default UserComments