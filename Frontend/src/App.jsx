import Footer from "./component/Footer";
import Header from "./component/Header";
import Home from "./pages/Home";
import { Box, Typography } from "@mui/material";
import {Routes, Route} from "react-router-dom"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./authenticate/ProtectedRoute";
import CreateBlog from "./pages/CreateBlog";
import UserBlog from "./pages/UserBlog";
import PublicBlog from "./pages/PublicBlog";
import DetailedBlog from "./pages/DetailedBlog";
function App() {
  return (
    <Box>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/create" element={<CreateBlog/>} />
          <Route path="/myblog" element={<UserBlog/>} />
          <Route path="/blog" element={<PublicBlog/>} />
          <Route path="/detail" element={<DetailedBlog/>} />
          
        </Route>
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
