import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMyContext } from "../context/LoginContext";
import DeleteComment from "./DeleteComment";
import EditComment from "./EditComment";

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
    <Box display={"flex"}>
      <Box>
        <Typography>{author}</Typography>
        <Typography>{message}</Typography>
      </Box>
      {sameCommenter && (
        <Box>
          <Button
            onClick={() => {
              setConfirmDelComment(true);
            }}
          >
            Delete
          </Button>
          <Button onClick={() => {setConfirmEditComment(true)}}>Edit</Button>
        </Box>
      )}
      <DeleteComment confirmDelComment={confirmDelComment} setConfirmDelComment={setConfirmDelComment} commentDetails={comDetails}/>
      <EditComment confirmEditComment={confirmEditComment} setConfirmEditComment={setConfirmEditComment} commentDetails={comDetails} />
    </Box>
  );
};

export default CommentCard;
