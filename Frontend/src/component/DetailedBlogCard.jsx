import React, { useEffect, useState } from "react";
import { useMyContext } from "../context/LoginContext";
import axios from "axios";
import { Box, Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import DeleteBlog from "./DeleteBlog";
import CommentSection from "./CommentSection";
import CommentCard from "./CommentCard";
import EditBlog from "./EditBlog";

const DetailedBlogCard = ({blogDetails, setBlogDetails}) => {
    
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const blogId = queryParams.get("id");
//   console.log(blogId)
  const [isComment, setIsComment] = useState(false);
  const [commentData, setCommentData] = useState([]);

  const [sameUser, setSameUser] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [createComment, setCreateComment] = useState(false);
  const { user } = useMyContext();
  const token = localStorage.getItem('token')
  const [sameCommenter, setSameCommenter] = useState(false);
  // console.log(user.id);
  const [liked, setLiked] = useState(false);
  const [trigger, setTrigger] = useState(false);
  useEffect(()=>{
    const checkLike = async()=>{
        try {
          const response = await axios.get(
            `http://localhost:3000/like/isliked/${blogId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log(response.data.isLiked);
          setLiked(response.data.isLiked);
    }
    catch(error){
      console.log("Error: ", error);
    }
  }
  checkLike();
}, [trigger]);

  const handleLike = async () =>{

    try {
      const response = await axios.get(
        `http://localhost:3000/like/register/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      setTrigger(!trigger);
      // setLiked(response.data.isLiked);
    }
    catch(error){
      console.log("Error: ", error);
    }
  }
  const handleUnlike = async () =>{
    try {
      const response = await axios.get(
        `http://localhost:3000/like/deregister/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      setTrigger(!trigger);
      // setLiked(response.data.isLiked);
    }
    catch(error){
    console.log("Error: ", error);
    }
  }
  useEffect(() => {
    // console.log(user)
    const getBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/dashboard/blog/${blogId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data.blogData)
        setBlogDetails(response.data.blogData);
        if (blogDetails) {
          if (blogDetails.author.email === user.email) {
            setSameUser(true);
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    getBlog();
  }, [trigger]);
  useEffect(() => {
    if (blogDetails && user) {
      if (blogDetails.author.email === user.email) {
        setSameUser(true);
      }
      
    }
  }, [user, blogDetails]);
  // console.log(commentData)
  return (
    blogDetails ? (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            {blogDetails.title}
          </Typography>
          <Divider />
        </Box>

        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="subtitle1" color="textSecondary">
            {blogDetails.author.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Likes: {blogDetails.likedUser.length}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {blogDetails.Date.toLocaleString()}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box>
          <Typography variant="body1" lineHeight={1.8}>
            {blogDetails.content}
          </Typography>
        </Box>
        <Box>
          {liked ? (<Box>
            <Button onClick={handleUnlike}>Unlike</Button>
          </Box>) : (<Box>
            <Button onClick={handleLike}>Like</Button>
          </Box>)}
          {/* <Button onClick={handleLike}>Like</Button> */}
        </Box>
        {sameUser && (
          <Box>
            <Button
              onClick={() => {
                setConfirmEdit(true);
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                setConfirmDel(true);
              }}
            >
              Delete
            </Button>
          </Box>
        )}
        <Box>
          <Button
            onClick={() => {
              setIsComment(!isComment);
            }}
            variant="contained"
          >
            Show Comments
          </Button>
          {isComment && (
            <Box>
              <Button
                onClick={() => {
                  setCreateComment(true);
                }}
              >
                Create Comment
              </Button>
              {commentData.map((com) => (
                <CommentCard
                  key={com._id}
                  message={com.message}
                  author={com.author.name}
                  // comUserId={com.author._id}
                  comDetails={com}
                />
              ))}
            </Box>
          )}
        </Box>
      </Paper>
      <DeleteBlog
        confirmDel={confirmDel}
        setConfirmDel={setConfirmDel}
        blogDetails={blogDetails}
      />
      <EditBlog

        confirmEdit={confirmEdit}
        setConfirmEdit={setConfirmEdit}
        blogDetails={blogDetails}
      />
      <CommentSection
        commentData={commentData}
        setCommentData={setCommentData}
        createComment={createComment}
        setCreateComment={setCreateComment}
        blogId={blogId}
      />
    </Container>
    ) : (
        
    <Box textAlign="center" mt={5}>
      <Typography>Loading blog details...</Typography>
    </Box>
    )
  );
};

export default DetailedBlogCard;
