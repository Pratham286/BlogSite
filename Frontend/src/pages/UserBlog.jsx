import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Blog from '../component/Blog';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../context/LoginContext';


const UserBlog = () => {
  const {user} = useMyContext();

  // console.log(user.id)
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
            id: user.id,
          },
        });
        // console.log(response.data.blogData);
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
      
      {blog.map((blogItem) =>(
        <Blog onClick = {() => handleClick(blogItem)} key={blogItem._id} title={blogItem.title} author={blogItem.author.name}/>
      ))}
    </Box>
      
    ) :
    <Box>
      Hello
    </Box>
  )
}

export default UserBlog
