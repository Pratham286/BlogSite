import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
  return (
    <Box>
      <Button
        variant="contained"
        sx={{ margin: "4px" }}
        onClick={() => {
          navigate("/myblog");
        }}
      >
        My Blogs
      </Button>
      <Button
        variant="contained"
        sx={{ margin: "4px" }}
        onClick={() => {
          navigate("/mycomments");
        }}
      >
        My Comments
      </Button>
      <Button
        variant="contained"
        sx={{ margin: "4px" }}
        onClick={() => {
          navigate("/mylikedBlog");
        }}
      >
        My Liked Blog
      </Button>
    </Box>
  );
};

export default Profile;
