import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CommentSection = ({commentData, setCommentData, createComment, setCreateComment, blogId}) => {
//   const blogId = queryParams.get("id");
    const navigate = useNavigate();
  const [commentmsg, setCommentmsg] = useState("");
  const token = localStorage.getItem('token')
  const [confirmDelComment, setConfirmDelComment] = useState(false);
  useEffect(() => {
    const getcomment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comment/getcomment/${blogId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data.commentData)
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
          "http://localhost:3000/comment/create",
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
        // console.log(re)
        navigate(0);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };
  return (
    <Dialog open={createComment} onClose={() => setCreateComment(false)}>
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
        <Button onClick={() => setCreateComment(false)}>Cancel</Button>
        <Button color="warning" onClick={handleComment}>
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentSection;
