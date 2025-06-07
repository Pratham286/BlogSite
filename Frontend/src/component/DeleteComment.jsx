import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
// import { deleteComment } from '../../../Backend/controller/commentController';

const DeleteComment = ({confirmDelComment, setConfirmDelComment, commentDetails}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
      
  const handleDelete = async () => {
    console.log("Delete called!");

    // console.log(blogDetails._id);
    try {
      const response = await axios.delete(
        `http://localhost:3000/comment/delete/${commentDetails._id}`,
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
    <Dialog open={confirmDelComment} onClose={() => setConfirmDelComment(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this blog? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelComment(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default DeleteComment
