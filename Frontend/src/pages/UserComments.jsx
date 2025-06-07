import React, { useEffect, useState } from 'react'
import axios from "axios"

import { Box, Typography } from '@mui/material';
const UserComments = () => {

    const token = localStorage.getItem("token")
    const [commentData, setCommentData] = useState([]);
    useEffect(()=>{
      const fetchComments = async ()=>{
        try {
          const response = await axios.get("http://localhost:3000/comment/getusercomment", {
          headers:{
            Authorization: `Bearer ${token}`,
          }})
          // console.log(response.data.commentData)
          setCommentData(response.data.commentData);
        } catch (error) {
          console.log("Error: ", error);
        }
      }
      fetchComments();
    }, [])
  return (
    <Box>
      {commentData.map((comData, key) => (
        <Box>
          <Typography>Blog Title: {comData.blogname.title}</Typography>
          <Typography>Comment: {comData.message}</Typography>
        </Box>
      ))}
    </Box>
  )
}
  
export default UserComments
