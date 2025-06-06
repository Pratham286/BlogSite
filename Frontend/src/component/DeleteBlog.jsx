import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const DeleteBlog = ({confirmDel, setConfirmDel, blogDetails}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
      
  const handleDelete = async () => {
    console.log("Delete called!");

    // console.log(blogDetails._id);
    try {
      const response = await axios.delete(
        `http://localhost:3000/dashboard/delete/${blogDetails._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/dashboard");
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <Dialog open={confirmDel} onClose={() => setConfirmDel(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this blog? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDel(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default DeleteBlog
