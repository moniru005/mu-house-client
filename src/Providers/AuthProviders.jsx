import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    deleteUser,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import { createContext, useEffect, useState } from "react";
  import useAxiosPublic from "../Hooks/useAxiosPublic";
import auth from "../Firebase/Firebase.config";
  
  const googleProvider = new GoogleAuthProvider();
  
  export const AuthContext = createContext(null);
  const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
  
    const googleSignIn = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
    };
  
    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const logIn = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const logOut = () => {
      setLoading(true);
      return signOut(auth);
    };
  
    const updateUserProfile = (name, photo) => {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
    };
  
    const removeUser = () =>{
      return deleteUser(auth.currentUser);
  }
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        console.log("Current User: ", currentUser);
        if (currentUser) {
          const userInfo = { email: currentUser.email };
          axiosPublic.post("/jwt", userInfo).then((res) => {
            if (res.data.token) {
              localStorage.setItem("access-token", res.data.token);
              setLoading(false);
            }
          });
        }
        else{
          localStorage.removeItem('access-token');
          setLoading(false);
        }
      });
  
      return () => {
        return unsubscribe();
      };
    }, [axiosPublic]);
  
    const authInfo = {
      user,
      loading,
      createUser,
      googleSignIn,
      logIn,
      logOut,
      updateUserProfile,
      removeUser,
    };
    return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
  };
  
  export default AuthProviders;
  