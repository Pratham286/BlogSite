import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditBlog = ({confirmEdit, setConfirmEdit, blogDetails}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
  const [editData, setEditData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const handleEdit = async () => {
    if (!editData.title && !editData.content) {
      alert("Form is empty");
    } else {
      const titleData = editData.title ? editData.title : blogDetails.title;
      const contentData = editData.content
        ? editData.content
        : blogDetails.content;
      console.log(titleData);
      console.log(contentData);
      try {
        const response = await axios.put(
          `http://localhost:3000/dashboard/edit/${blogDetails._id}`,
          {
            newTitle: titleData,
            newContent: contentData,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // alert("Edited");
        console.log(response.data);

        navigate(0);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };
  return (
    <Dialog open={confirmEdit} onClose={() => setConfirmEdit(false)}>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={editData.title}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Content"
          name="content"
          value={editData.content}
          onChange={handleChange}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfirmEdit(false)}>Cancel</Button>
        <Button color="warning" onClick={handleEdit}>
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBlog;
