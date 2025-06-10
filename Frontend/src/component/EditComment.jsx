import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  styled,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
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
    minWidth: '450px',
    maxWidth: '550px',
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
  background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
  borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: '24px',
    bottom: 0,
    width: '60px',
    height: '2px',
    background: 'linear-gradient(90deg, #60a5fa, #3b82f6)',
    borderRadius: '1px'
  }
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: '24px',
  background: 'rgba(17, 24, 39, 0.3)',
  '& .MuiTextField-root': {
    marginBottom: '0px'
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: '#9ca3af',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.95rem',
    '&.Mui-focused': {
      color: '#60a5fa'
    }
  },
  '& .MuiOutlinedInput-root': {
    color: '#f9fafb',
    fontFamily: 'Inter, sans-serif',
    background: 'rgba(31, 41, 55, 0.6)',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    '& fieldset': {
      borderColor: 'rgba(75, 85, 99, 0.5)',
      borderWidth: '1px'
    },
    '&:hover fieldset': {
      borderColor: 'rgba(107, 114, 128, 0.7)'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#60a5fa',
      borderWidth: '2px',
      boxShadow: '0 0 0 3px rgba(96, 165, 250, 0.1)'
    },
    '& input': {
      padding: '14px 16px',
      fontSize: '1rem'
    },
    '& textarea': {
      padding: '14px 16px',
      fontSize: '1rem',
      lineHeight: '1.6'
    }
  },
  '& .MuiInputBase-input::placeholder': {
    color: '#6b7280',
    opacity: 1
  }
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: '16px 24px 24px 24px',
  gap: '12px',
  justifyContent: 'flex-end',
  borderTop: '1px solid rgba(75, 85, 99, 0.2)',
  background: 'rgba(17, 24, 39, 0.2)'
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

const EditButton = styled(Button)(({ theme }) => ({
  padding: '10px 20px',
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.95rem',
  fontFamily: 'Inter, sans-serif',
  color: 'white',
  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
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
    background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 20px rgba(245, 158, 11, 0.4)',
    '&::before': {
      left: '100%'
    }
  },
  '&:active': {
    transform: 'translateY(0)'
  }
}));

const EditComment = ({
  confirmEditComment,
  setConfirmEditComment,
  commentDetails,
}) => {
  const commentId = commentDetails._id
  // console.log(commentId);
  const navigate = useNavigate();
  const {url} = useMyContext();
  const token = localStorage.getItem("token");

  const [commentmsg, setCommentmsg] = useState("");

  const handleEdit = async () => {
      if (!commentmsg) {
      alert("Comment is empty!");
    } else {
      try {
        const response = await axios.put(
          `${url}/comment/update/${commentId}`,
          {
            newMessage: commentmsg,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(re)
        navigate(0);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  return (
    <StyledDialog 
      open={confirmEditComment} 
      onClose={() => setConfirmEditComment(false)}
      maxWidth="sm"
      fullWidth
    >
      <StyledDialogTitle>
        💬 Edit Comment
      </StyledDialogTitle>
      <StyledDialogContent>
        <StyledTextField
          fullWidth
          label="Comment"
          name="commentmsg"
          value={commentmsg}
          onChange={(e) => {
            setCommentmsg(e.target.value);
          }}
          placeholder={commentDetails?.message || "Enter your comment..."}
          multiline
          rows={4}
          variant="outlined"
        />
      </StyledDialogContent>
      <StyledDialogActions>
        <CancelButton onClick={() => setConfirmEditComment(false)} variant="outlined">
          Cancel
        </CancelButton>
        <EditButton onClick={handleEdit} variant="contained">
          Update Comment
        </EditButton>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default EditComment;