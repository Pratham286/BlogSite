import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMyContext } from '../context/LoginContext';

const DetailedBlog = () => {
    const navigate = useNavigate();
    const [sameUser, setSameUser] = useState(false);
    const [confirmDel, setConfirmDel] = useState(false);
    const [confirmEdit, setConfirmEdit] = useState(false);
    const {user} = useMyContext();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const blogId = queryParams.get("id");
    const token = localStorage.getItem("token")
    const [blogDetails, setBlogDetails] =useState();
    const [editData, setEditData] = useState({
      title: "",
      content: "",
    })
    // const confirm2=true;
    useEffect(() => {
        const getBlog = async () =>{
            try {
                const response = await axios.get(`http://localhost:3000/dashboard/blog/${blogId}`, {
                    headers: {
                      Authorization: `Bearer ${token}`
                    },
                  })
                  // console.log(response.data);
                  setBlogDetails(response.data.blogData);
                  if(blogDetails)
                  {
                    if(blogDetails.email === user.email)
                    {
                      setSameUser(true)
                    }
                  }
                  if(blogDetails)
                  {
                    if(blogDetails.email === user.email)
                    {
                      setSameUser(true)
                    }
                  }
                } catch (error) {
                  console.log("error", error)
                }
              }
              getBlog();
            }, [])
            useEffect(()=>{
              if(blogDetails && user) 
              {
                if(blogDetails.email === user.email)
                {
                  setSameUser(true)
                }
              }
              
            }, [user, blogDetails])
    const handleDeleteClick = ()=>{
      setConfirmDel(true);
    }       
    const handleDelete = async ()=>{
      console.log("Delete called!")
      
      // console.log(blogDetails._id);
        try {
          const response =await axios.delete(`http://localhost:3000/dashboard/delete/${blogDetails._id}`, {
            headers: {
                      Authorization: `Bearer ${token}`
                    },
          });
          navigate("/dashboard")
        } catch (error) {
          console.log("Error: ", error);
        }
        
      }
      const handleChange = (e) =>{
        setEditData({...editData, [e.target.name] : e.target.value})
      }
      const handleEdit = async() =>{
        if(!editData.title && !editData.content)
          {
            alert("Form is empty")
          }
          else{
            
            const titleData = editData.title ? editData.title : blogDetails.title
            const contentData = editData.content ? editData.content : blogDetails.content;
            console.log(titleData)
            console.log(contentData)
            try {
              const response =await axios.put(`http://localhost:3000/dashboard/edit/${blogDetails._id}`, {
                newTitle: titleData,
                newContent: contentData,
              },{
                headers: {
                          Authorization: `Bearer ${token}`
                        },
              });
              // alert("Edited");
              console.log(response.data);

              navigate(0)

            } catch (error) {
              console.log("Error: ", error);
            }

      }

    }
    // console.log(blogDetails.Date);
 return (
  blogDetails ? (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            {blogDetails.title}
          </Typography>
          <Divider />
        </Box>

        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="subtitle1" color="textSecondary">
            {blogDetails.name}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {(blogDetails.Date).toLocaleString()}
            {/* {(blogDetails.Date).toLocaleString() ? new Date(blogDetails.date).toLocaleString() : "No date available"} */}

          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box>
          <Typography variant="body1" lineHeight={1.8}>
            {blogDetails.content}
          </Typography>
        </Box>
        {sameUser && <Box>
          <Button onClick={() => {setConfirmEdit(true)}}>Edit</Button>
          <Button onClick={handleDeleteClick}>Delete</Button>
        </Box>}
        
      </Paper>
      <Dialog open={confirmDel} onClose={() => setConfirmDel(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this blog? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDel(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmEdit} onClose={() => setConfirmEdit(false)}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <TextField 
            fullWidth
            label="Title"
            name="title"
            value={editData.title}
            onChange={handleChange}
            margin="normal"
            />
          <TextField 
            fullWidth
            label="Content"
            name="content"
            value={editData.content}
            onChange={handleChange}
            margin="normal"
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmEdit(false)}>Cancel</Button>
          <Button color="warning" onClick={handleEdit}>Edit</Button>
        </DialogActions>
        
      </Dialog>
    </Container>
    
  ) : (
    <Box textAlign="center" mt={5}>
      <Typography>Loading blog details...</Typography>
    </Box>
  )
)
}


export default DetailedBlog;
