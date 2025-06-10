import { Box, Button, Typography, styled, Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMyContext } from "../context/LoginContext";
import DeleteComment from "./DeleteComment";
import EditComment from "./EditComment";

// Styled Components
const CommentContainer = styled(Box)(({ theme }) => ({
  background: 'rgba(31, 41, 55, 0.8)',
  border: '1px solid rgba(75, 85, 99, 0.5)',
  borderRadius: '12px',
  padding: '20px',
  marginBottom: '16px',
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
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.2), transparent)',
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
    borderColor: 'rgba(96, 165, 250, 0.3)',
    '&::before': {
      background: 'linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.4), transparent)',
    }
  }
}));

const CommentHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '12px',
  gap: '12px'
}));

const AuthorAvatar = styled(Avatar)(({ theme }) => ({
  width: '40px',
  height: '40px',
  background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
  color: 'white',
  fontSize: '1rem',
  fontWeight: 600,
  fontFamily: 'Inter, sans-serif',
  boxShadow: '0 2px 8px rgba(96, 165, 250, 0.3)'
}));

const AuthorName = styled(Typography)(({ theme }) => ({
  color: '#f9fafb',
  fontSize: '1rem',
  fontWeight: 600,
  fontFamily: 'Inter, sans-serif',
  flex: 1
}));

const CommentMessage = styled(Typography)(({ theme }) => ({
  color: '#d1d5db',
  fontSize: '0.95rem',
  lineHeight: '1.6',
  fontFamily: 'Inter, sans-serif',
  marginLeft: '52px', // Align with author name
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap'
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '8px',
  marginLeft: 'auto',
  alignItems: 'center'
}));

const StyledIconButton = styled(IconButton)(({ theme, variant }) => ({
  padding: '8px 12px',
  borderRadius: '8px',
  fontSize: '0.85rem',
  fontWeight: 500,
  fontFamily: 'Inter, sans-serif',
  textTransform: 'none',
  transition: 'all 0.2s ease',
  minWidth: 'auto',
  border: '1px solid transparent',
  ...(variant === 'edit' && {
    color: '#f59e0b',
    background: 'rgba(245, 158, 11, 0.1)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    '&:hover': {
      background: 'rgba(245, 158, 11, 0.2)',
      borderColor: 'rgba(245, 158, 11, 0.5)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)'
    }
  }),
  ...(variant === 'delete' && {
    color: '#ef4444',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    '&:hover': {
      background: 'rgba(239, 68, 68, 0.2)',
      borderColor: 'rgba(239, 68, 68, 0.5)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
    }
  }),
  '&:active': {
    transform: 'translateY(0)'
  }
}));

const CommentContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1
}));

const MainContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  width: '100%'
}));

// Helper function to get initials from name
const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const CommentCard = ({ author, message, comDetails }) => {
  const { user } = useMyContext();
  const [sameCommenter, setSameCommenter] = useState(false);
  const [confirmDelComment, setConfirmDelComment] = useState(false);
  const [confirmEditComment, setConfirmEditComment] = useState(false);
  
  useEffect(() => {
    if (user._id === comDetails.author._id) {
      // console.log('Yes');
      setSameCommenter(true);
    } else {
      setSameCommenter(false);
    }
  }, []);

  return (
    <>
      <CommentContainer>
        <MainContent>
          <CommentContent>
            <CommentHeader>
              <AuthorAvatar>
                {getInitials(author)}
              </AuthorAvatar>
              <AuthorName variant="subtitle1">
                {author}
              </AuthorName>
              {sameCommenter && (
                <ActionButtons>
                  <StyledIconButton
                    variant="edit"
                    size="small"
                    onClick={() => setConfirmEditComment(true)}
                    title="Edit comment"
                  >
                    ✏️ Edit
                  </StyledIconButton>
                  <StyledIconButton
                    variant="delete"
                    size="small"
                    onClick={() => setConfirmDelComment(true)}
                    title="Delete comment"
                  >
                    🗑️ Delete
                  </StyledIconButton>
                </ActionButtons>
              )}
            </CommentHeader>
            <CommentMessage variant="body2">
              {message}
            </CommentMessage>
          </CommentContent>
        </MainContent>
      </CommentContainer>
      
      <DeleteComment 
        confirmDelComment={confirmDelComment} 
        setConfirmDelComment={setConfirmDelComment} 
        commentDetails={comDetails}
      />
      <EditComment 
        confirmEditComment={confirmEditComment} 
        setConfirmEditComment={setConfirmEditComment} 
        commentDetails={comDetails} 
      />
    </>
  );
};

export default CommentCard;