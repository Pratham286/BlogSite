import React, {createContext, useContext, useState } from "react";

const MyContext =  createContext();

export const  MyProvider = ({children}) =>{
  // const url = "https://localhost/3000"
    const url = "https://blogsite-backend-zvmg.onrender.com"
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState();
    // const [token, setToken] = useState();
    return (
    <MyContext.Provider value={{ isLogin, setIsLogin, user, setUser , url }}>
      {children}
    </MyContext.Provider>
  );
};
export const  useMyContext =  () => {
    return useContext(MyContext);
}