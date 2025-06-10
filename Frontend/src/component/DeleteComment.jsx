import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../context/LoginContext';

// Styled Components to match your CSS theme
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    background: 'rgba(31, 41, 55, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(75, 85, 99, 0.5)',
    borderRadius: '12px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    minWidth: '400px',
    maxWidth: '500px',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.3), transparent)',
    }
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(4px)'
  }
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  color: '#f9fafb',
  fontSize: '1.5rem',
  fontWeight: 600,
  fontFamily: 'Inter, sans-serif',
  padding: '24px 24px 16px 24px',
  background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)',
  borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: '24px',
    bottom: 0,
    width: '60px',
    height: '2px',
    background: 'linear-gradient(90deg, #ef4444, #dc2626)',
    borderRadius: '1px'
  }
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: '24px',
  color: '#d1d5db'
}));

const StyledDialogContentText = styled(DialogContentText)(({ theme }) => ({
  color: '#d1d5db',
  fontSize: '1rem',
  lineHeight: '1.6',
  fontFamily: 'Inter, sans-serif',
  margin: 0
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: '16px 24px 24px 24px',
  gap: '12px',
  justifyContent: 'flex-end',
  borderTop: '1px solid rgba(75, 85, 99, 0.2)'
}));

const CancelButton = styled(Button)(({ theme }) => ({
  padding: '10px 20px',
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.95rem',
  fontFamily: 'Inter, sans-serif',
  color: '#d1d5db',
  border: '1px solid rgba(75, 85, 99, 0.5)',
  background: 'rgba(55, 65, 81, 0.3)',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'rgba(75, 85, 99, 0.4)',
    borderColor: 'rgba(107, 114, 128, 0.6)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
  },
  '&:active': {
    transform: 'translateY(0)'
  }
}));

const DeleteButton = styled(Button)(({ theme }) => ({
  padding: '10px 20px',
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.95rem',
  fontFamily: 'Inter, sans-serif',
  color: 'white',
  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  border: 'none',
  transition: 'all 0.2s ease',
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
    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 20px rgba(239, 68, 68, 0.4)',
    '&::before': {
      left: '100%'
    }
  },
  '&:active': {
    transform: 'translateY(0)'
  }
}));

const DeleteComment = ({confirmDelComment, setConfirmDelComment, commentDetails}) => {
    const {url} = useMyContext();
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
      
  const handleDelete = async () => {
    console.log("Delete called!");

    try {
      const response = await axios.delete(
        `${url}/comment/delete/${commentDetails._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(0);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <StyledDialog 
      open={confirmDelComment} 
      onClose={() => setConfirmDelComment(false)}
      maxWidth="sm"
      fullWidth
    >
      <StyledDialogTitle>
        ⚠️ Confirm Deletion
      </StyledDialogTitle>
      <StyledDialogContent>
        <StyledDialogContentText>
          Are you sure you want to delete this comment? This action cannot be undone and the comment will be permanently removed.
        </StyledDialogContentText>
      </StyledDialogContent>
      <StyledDialogActions>
        <CancelButton onClick={() => setConfirmDelComment(false)} variant="outlined">
          Cancel
        </CancelButton>
        <DeleteButton onClick={handleDelete} variant="contained">
          Delete Forever
        </DeleteButton>
      </StyledDialogActions>
    </StyledDialog>
  )
}

export default DeleteComment