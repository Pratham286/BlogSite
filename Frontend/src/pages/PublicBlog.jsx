import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Blog from '../component/Blog';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PublicBlog = () => {
  const navigate = useNavigate();
  const [blog, setBlog] =useState([]);
  const token = localStorage.getItem('token')
  useEffect(() =>{
    const fetchBlog = async () =>{
      try {
        const response = await axios.get("http://localhost:3000/dashboard/getAll", {
          headers:{
            Authorization: `Bearer ${token}`,
          }
        });
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
    <Box  sx={{display: "flex", margin: "10px", flexDirection: "row", flexWrap: "wrap"}} >
      
      {blog.map((blogItem) =>(
        <Blog onClick = {() => handleClick(blogItem)} key={blogItem._id} title={blogItem.title} author={blogItem.name}/>
      ))}
    </Box>
  )
}

export default PublicBlog
