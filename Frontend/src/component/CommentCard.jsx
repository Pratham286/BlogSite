import { Box, Typography } from '@mui/material'
import React from 'react'

const CommentCard = (props) => {
  return (
    <Box>
    <Typography>{props.author}</Typography>
    <Typography>{props.message}</Typography>
    </Box>
  )
}

export default CommentCard
