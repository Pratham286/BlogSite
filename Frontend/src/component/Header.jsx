import React from "react";
import { Box, Typography, AppBar, Toolbar, Button, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom"
import { useMyContext } from "../context/LoginContext";

function Header(props) {
    const {isLogin, setIsLogin} = useMyContext();

    const navigate = useNavigate()

    const handleClick = ()=>{
      localStorage.removeItem('token');
      setIsLogin(false);
      navigate("/login")
    }
    const handleHome = () =>{
      // console.log("clicked")
      if(isLogin)
      {
        navigate("/dashboard");
      }
      else{
        navigate("/")
      }
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography onClick={handleHome} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blogging Site
          </Typography>
          {isLogin===false ? 
            <Box>
            <Button onClick={()=> {navigate("/Signup")}} color="inherit" >Signup</Button>
            <Button onClick={()=> {navigate("/login")}} color="inherit">Login</Button>
            </Box> : <Box>
              <Button onClick={()=> {handleClick()}} color="inherit">Logout</Button>
            </Box>
          }
        </Toolbar>
      </AppBar>
    </Box>  
  );
}

export default Header;