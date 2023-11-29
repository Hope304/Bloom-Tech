import React, { createContext, useState } from 'react';
import AuthService from '../services/auth.service';

export const UserContext = createContext(null);

const UserContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  const [url, setUrl] = useState('/home');


  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    localStorage.setItem("Role", 'Public');
  };
  const contextValue ={currentUser,setCurrentUser,logOut,url,setUrl};
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;