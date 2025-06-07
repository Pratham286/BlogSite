import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Blog from '../component/Blog';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../context/LoginContext';


const UserBlog = () => {
  const {user} = useMyContext();

  // console.log(user)
  const navigate = useNavigate();
  const [blog, setBlog] =useState([]);
  const token = localStorage.getItem('token')
  useEffect(() =>{
    const fetchBlog = async () =>{
      try {
        const response = await axios.get("http://localhost:3000/dashboard/getUser", {
          headers:{
            Authorization: `Bearer ${token}`,
          },
          params:{
            id: user._id,
          },
        });
        // console.log(response.data.blogData[0].likedUser.length);
        setBlog(response.data.blogData);
        } catch (error) {
          console.log("Error: ", error);
        }
      }
      fetchBlog();
    }, [])
    // console.log(blog);
    const handleClick = (blogItem) =>{
      // console.log(blogItem._id)
      navigate(`/detail?id=${blogItem._id}`);
    }
  

  return (
    blog ? (
    <Box  sx={{display: "flex", margin: "10px", flexDirection: "row", flexWrap: "wrap"}} >
      {/* <Typography>Hello World</Typography> */}
      {blog.map((blogItem) =>(
        <Blog onClick = {() => handleClick(blogItem)} key={blogItem._id} title={blogItem.title} author={blogItem.author.name} likes = {blogItem.likedUser.length}/>
      ))}
    </Box>
      
    ) :
    <Box>
      Hello
    </Box>
  )
}

export default UserBlog
