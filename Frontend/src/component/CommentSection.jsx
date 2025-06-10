import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, styled } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context/LoginContext";

// Styled Components to match your CSS theme
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    background: 'rgba(31, 41, 55, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(75, 85, 99, 0.5)',
    borderRadius: '12px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    minWidth: '500px',
    maxWidth: '600px',
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
  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.05) 100%)',
  borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: '24px',
    bottom: 0,
    width: '60px',
    height: '2px',
    background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
    borderRadius: '1px'
  }
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: '24px',
  color: '#d1d5db'
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(55, 65, 81, 0.3)',
    borderRadius: '8px',
    fontFamily: 'Inter, sans-serif',
    '& fieldset': {
      borderColor: 'rgba(75, 85, 99, 0.5)',
      transition: 'all 0.2s ease'
    },
    '&:hover fieldset': {
      borderColor: 'rgba(96, 165, 250, 0.5)'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#60a5fa',
      boxShadow: '0 0 0 3px rgba(96, 165, 250, 0.1)'
    },
    '& input': {
      color: '#f9fafb',
      fontSize: '1rem',
      '&::placeholder': {
        color: '#9ca3af'
      }
    },
    '& textarea': {
      color: '#f9fafb',
      fontSize: '1rem',
      '&::placeholder': {
        color: '#9ca3af'
      }
    }
  },
  '& .MuiInputLabel-root': {
    color: '#9ca3af',
    fontFamily: 'Inter, sans-serif',
    '&.Mui-focused': {
      color: '#60a5fa'
    }
  }
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

const SendButton = styled(Button)(({ theme }) => ({
  padding: '10px 20px',
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.95rem',
  fontFamily: 'Inter, sans-serif',
  color: 'white',
  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
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
    background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
    '&::before': {
      left: '100%'
    }
  },
  '&:active': {
    transform: 'translateY(0)'
  }
}));

const CommentSection = ({commentData, setCommentData, createComment, setCreateComment, blogId}) => {
  const navigate = useNavigate();
  const [commentmsg, setCommentmsg] = useState("");
  const token = localStorage.getItem('token')
  const [confirmDelComment, setConfirmDelComment] = useState(false);
  const {url} = useMyContext();

  useEffect(() => {
    const getcomment = async () => {
      try {
        const response = await axios.get(
          `${url}/comment/getcomment/${blogId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCommentData(response.data.commentData);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getcomment();
  }, []);

  const handleComment = async (e) => {
    if (!commentmsg) {
      alert("Comment is empty!");
    } else {
      try {
        const response = await axios.post(
          `${url}/comment/create`,
          {
            message: commentmsg,
            blogId: blogId,
          },
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
    }
  };

  return (
    <StyledDialog 
      open={createComment} 
      onClose={() => setCreateComment(false)}
      maxWidth="sm"
      fullWidth
    >
      <StyledDialogTitle>
        💬 Add Comment
      </StyledDialogTitle>
      <StyledDialogContent>
        <StyledTextField
          fullWidth
          label="Write your comment..."
          name="commentmsg"
          value={commentmsg}
          onChange={(e) => {
            setCommentmsg(e.target.value);
          }}
          margin="normal"
          multiline
          rows={4}
          variant="outlined"
        />
      </StyledDialogContent>
      <StyledDialogActions>
        <CancelButton onClick={() => setCreateComment(false)} variant="outlined">
          Cancel
        </CancelButton>
        <SendButton onClick={handleComment} variant="contained">
          Send Comment
        </SendButton>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default CommentSection;