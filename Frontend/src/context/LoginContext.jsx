import React, {createContext, useContext, useState } from "react";

const MyContext =  createContext();

export const  MyProvider = ({children}) =>{
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState();
    // const [token, setToken] = useState();
    return (
    <MyContext.Provider value={{ isLogin, setIsLogin, user, setUser }}>
      {children}
    </MyContext.Provider>
  );
};
export const  useMyContext =  () => {
    return useContext(MyContext);
}