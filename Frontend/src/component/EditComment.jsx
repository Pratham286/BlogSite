import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditComment = ({
  confirmEditComment,
  setConfirmEditComment,
  commentDetails,
}) => {
  const commentId = commentDetails._id
  // console.log(commentId);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [commentmsg, setCommentmsg] = useState("");

  const handleEdit = async () => {
      if (!commentmsg) {
      alert("Comment is empty!");
    } else {
      try {
        const response = await axios.put(
          `http://localhost:3000/comment/update/${commentId}`,
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
    <Dialog open={confirmEditComment} onClose={() => setConfirmEditComment(false)}>
      <DialogTitle>Comment</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Comment"
          name="commentmsg"
          value={commentmsg}
          onChange={(e) => {
            setCommentmsg(e.target.value);
          }}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfirmEditComment(false)}>Cancel</Button>
        <Button color="warning" onClick={handleEdit}>
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditComment;
