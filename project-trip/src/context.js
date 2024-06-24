import { createContext } from 'react'

export const AuthContext = createContext()
export const ProfileContext = createContext()
export const UserNameContext = createContext()

// //defining auth context variable, holding cell, putting info in and pulling info out. 
// //storing state. 

// import React, { createContext, useState } from 'react';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [accessToken, setAccessToken] = useState(undefined);

//   const auth = {
//     accessToken,
//     setAccessToken,
//   };

//   return (
//     <AuthContext.Provider value={{ auth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };
