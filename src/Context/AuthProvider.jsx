import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, getAdditionalUserInfo } from "firebase/auth";
import { auth } from "../firebase/config";
import CircularProgress from "@mui/material/CircularProgress";
export const AuthConText = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    const unsubscibed = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;

        setUser({ displayName, email, uid, photoURL });
        setIsLoading(false);
        navigate("/");
      } else {
        setIsLoading(false);
        navigate("/login");
      }
    });
    return () => {
      unsubscibed();
    };
  }, []);
  return (
    <AuthConText.Provider value={{ user }}>
      {isLoading ? <CircularProgress /> : children}
    </AuthConText.Provider>
  );
};

export default AuthProvider;
