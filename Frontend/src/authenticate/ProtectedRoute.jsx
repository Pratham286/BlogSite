import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import { useMyContext } from "../context/LoginContext";

const ProtectedRoute = () => {
  const { isLogin, setIsLogin } = useMyContext();
  const { user, setUser } = useMyContext();
  const token = localStorage.getItem("token");
  const [isValid, setIsValid] = useState(null);
  // const [isLogin, setIsLogin] = useState(false);
  // console.log(token)
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/dashboard/verify",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.user)
        setIsValid(response.data.valid);
        setIsLogin(true);
        // console.log(response.data)
      } catch (error) {
        console.log(error);
        setIsLogin(false);
        setIsValid(false);
      }
    };
    if (token) {
      // console.log(1);
      verifyToken();
    } else {
      // console.log(2);
      setIsLogin(false);
      setIsValid(false);
    }
  }, [token]);

  if (isValid === null) {
    return <div>Loading...</div>;
  }

  return isValid ? <Outlet /> : <Navigate to="/Login" />;
};
export default ProtectedRoute;
