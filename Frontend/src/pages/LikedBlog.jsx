import React from 'react'
import { useMyContext } from '../context/LoginContext'
import Blog from '../component/Blog';
import { Box } from '@mui/material';

const LikedBlog = () => {
    const {user} = useMyContext();
    console.log(user)
    const blogArray = user.likedBlog;
    // console.log(blogArray)
  return (
    <Box>
        {blogArray.map((blogs) => (
            <Blog title={blogs.title} author={blogs.author.name} key={blogs._id}/>
        ))}
        {/* <Blog /> */}
    </Box>
  )
}

export default LikedBlog
