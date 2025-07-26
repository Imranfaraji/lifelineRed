import React, { useEffect, useState } from "react";

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword,  signOut, updateProfile} from 'firebase/auth';

import { AuthContext } from "./AuthContext";
import { auth } from "../../firebase/firebase.init";




const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  

  
 

  

  const handleLoginWithEmailPass=(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
  }

  

    const createUser=(email,password)=>{
      setLoading(true)
      return createUserWithEmailAndPassword(auth,email,password)
    }

    const UpdateUserProfile=(name,photoURL)=>{
        return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL:photoURL
        })
    }

    const handleResetPassword=(email)=>{
      setLoading(true)
      return sendPasswordResetEmail(auth,email)
    }

    const handlesignOut=()=>{
      return signOut(auth)
    }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged (auth, (CurrentUser) => {
      setUser(CurrentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const userInfo = {
    user,
    loading,
    
    handlesignOut,
    handleLoginWithEmailPass,
   
    handleResetPassword,
    createUser,
    UpdateUserProfile,
    
    
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
