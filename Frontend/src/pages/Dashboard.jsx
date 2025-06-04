import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useMyContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useMyContext();
  // console.log(user)
  return (
    <Box>
      <Box sx={{ textAlign: "center", margin: "4px" }}>
        <Typography variant="h4" sx={{ fontFamily: "Roboto", color: "blue" }}>
          Welcome {user.name}!
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "4px",
          width: "200px",
        }}
      >
        <Button variant="contained" sx={{ margin: "4px" }} onClick={()=> {navigate("/create")}}>
          Create New Blog
        </Button>
        <Button variant="contained" sx={{ margin: "4px" }} onClick={()=> {navigate("/myblog")}}>
          My Blogs
        </Button>
        <Button variant="contained" sx={{ margin: "4px" }} onClick={()=> {navigate("/blog")}}>
          View Public Blogs
        </Button>
      </Box>
    </Box>
  );
}
