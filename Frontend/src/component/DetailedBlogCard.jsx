import React, { useEffect, useState } from "react";
import { useMyContext } from "../context/LoginContext";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
  Chip,
  Avatar,
  IconButton,
  Fade,
  Skeleton,
} from "@mui/material";
import {
  ThumbUp,
  ThumbUpOutlined,
  Comment,
  Edit,
  Delete,
  Person,
  Schedule,
  Visibility,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import DeleteBlog from "./DeleteBlog";
import CommentSection from "./CommentSection";
import CommentCard from "./CommentCard";
import EditBlog from "./EditBlog";

const DetailedBlogCard = ({ blogDetails, setBlogDetails }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const blogId = queryParams.get("id");

  const [isComment, setIsComment] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [sameUser, setSameUser] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [createComment, setCreateComment] = useState(false);
  const { user, url } = useMyContext();
  const token = localStorage.getItem("token");
  const [sameCommenter, setSameCommenter] = useState(false);
  const [liked, setLiked] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLike = async () => {
      try {
        const response = await axios.get(
          `${url}/like/isliked/${blogId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLiked(response.data.isLiked);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    checkLike();
  }, [trigger]);

  const handleLike = async () => {
    try {
      const response = await axios.get(
        `${url}/like/register/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTrigger(!trigger);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await axios.get(
        `${url}/like/deregister/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTrigger(!trigger);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    const getBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${url}/dashboard/blog/${blogId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBlogDetails(response.data.blogData);
        if (blogDetails) {
          if (blogDetails.author.email === user.email) {
            setSameUser(true);
          }
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            bgcolor: "grey.900",
            borderRadius: 3,
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Skeleton variant="text" height={60} sx={{ bgcolor: "grey.800" }} />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Skeleton variant="text" width={150} sx={{ bgcolor: "grey.800" }} />
            <Skeleton variant="text" width={100} sx={{ bgcolor: "grey.800" }} />
          </Box>
          <Skeleton
            variant="rectangular"
            height={200}
            sx={{ mt: 3, bgcolor: "grey.800" }}
          />
        </Paper>
      </Container>
    );
  }

  return blogDetails ? (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4, minHeight: "80vh" }}>
      <Fade in={true} timeout={800}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            bgcolor: "grey.900",
            color: "white",
            borderRadius: 3,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            background:
              "linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Header Section */}
          <Box textAlign="center" mb={4}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: "linear-gradient(45deg, #ffffff 30%, #e0e0e0 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 3,
              }}
            >
              {blogDetails.title}
            </Typography>
            <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }} />
          </Box>

          {/* Author & Stats Section */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
            sx={{
              p: 2,
              bgcolor: "rgba(255, 255, 255, 0.05)",
              borderRadius: 2,
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: "primary.main" }}>
                {blogDetails.author?.name?.charAt(0).toUpperCase()}
              </Avatar>

              <Box>
                <Typography
                  variant="h6"
                  sx={{ color: "white", fontWeight: 600 }}
                >
                  {blogDetails.author.name}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Schedule sx={{ fontSize: 16, color: "grey.400" }} />
                  <Typography variant="caption" color="grey.400">
                    {new Date(blogDetails.Date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Chip
              icon={<ThumbUp />}
              label={`${blogDetails.likedUser.length} Likes`}
              sx={{
                bgcolor: "rgba(25, 118, 210, 0.2)",
                color: "#90caf9",
                border: "1px solid rgba(25, 118, 210, 0.3)",
              }}
            />
          </Box>

          <Divider sx={{ mb: 3, bgcolor: "rgba(255, 255, 255, 0.1)" }} />

          {/* Content Section */}
          <Box
            mb={4}
            sx={{
              p: 3,
              bgcolor: "rgba(255, 255, 255, 0.02)",
              borderRadius: 2,
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                color: "grey.100",
                fontSize: "1.1rem",
                whiteSpace: "pre-wrap",
              }}
            >
              {blogDetails.content}
            </Typography>
          </Box>

          {/* Action Buttons Section */}
          <Box
            display="flex"
            gap={2}
            mb={3}
            sx={{
              p: 2,
              bgcolor: "rgba(255, 255, 255, 0.03)",
              borderRadius: 2,
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <IconButton
              onClick={liked ? handleUnlike : handleLike}
              sx={{
                color: liked ? "#f44336" : "grey.300",
                "&:hover": {
                  bgcolor: liked
                    ? "rgba(244, 67, 54, 0.1)"
                    : "rgba(255, 255, 255, 0.1)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease",
              }}
            >
              {liked ? <ThumbUp /> : <ThumbUpOutlined />}
            </IconButton>

            <Button
              startIcon={<Comment />}
              onClick={() => setIsComment(!isComment)}
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "rgba(255, 255, 255, 0.3)",
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              {isComment ? "Hide Comments" : "Show Comments"}
            </Button>

            {sameUser && (
              <Box display="flex" gap={1} ml="auto">
                <IconButton
                  onClick={() => setConfirmEdit(true)}
                  sx={{
                    color: "#4caf50",
                    "&:hover": {
                      bgcolor: "rgba(76, 175, 80, 0.1)",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => setConfirmDel(true)}
                  sx={{
                    color: "#f44336",
                    "&:hover": {
                      bgcolor: "rgba(244, 67, 54, 0.1)",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <Delete />
                </IconButton>
              </Box>
            )}
          </Box>

          {/* Comments Section */}
          <Fade in={isComment} timeout={500}>
            <Box sx={{ display: isComment ? "block" : "none" }}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: "rgba(255, 255, 255, 0.02)",
                  borderRadius: 2,
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={3}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "white", fontWeight: 600 }}
                  >
                    Comments
                  </Typography>
                  <Button
                    onClick={() => setCreateComment(true)}
                    variant="contained"
                    size="small"
                    sx={{
                      bgcolor: "primary.main",
                      "&:hover": { bgcolor: "primary.dark" },
                    }}
                  >
                    Add Comment
                  </Button>
                </Box>

                {commentData.length === 0 ? (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "grey.400",
                      textAlign: "center",
                      py: 3,
                      fontStyle: "italic",
                    }}
                  >
                    No comments yet. Be the first to comment!
                  </Typography>
                ) : (
                  <Box>
                    {commentData.map((com) => (
                      <CommentCard
                        key={com._id}
                        message={com.message}
                        author={com.author.name}
                        comDetails={com}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Fade>
        </Paper>
      </Fade>

      {/* Modal Components */}
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
      <Typography sx={{ color: "white" }}>Loading blog details...</Typography>
    </Box>
  );
};

export default DetailedBlogCard;
