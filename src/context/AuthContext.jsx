import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import { firebaseConfig } from "./../config/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log(auth); // It is an object

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Track user
  // const [currentUserTracking, setCurrentUserTracking] = useState(null); // It is being defined it
  const [currentUserTracking, setCurrentUserTracking] = useState(null); // It is being defined it

  // After successful registration,  my user will be taken to the home page. So it is necessary to use the useNavigate
  const navigate = useNavigate();

  // Register a user
  // When  auser is registered for the first time, it will have just email and password, not displayed name, so it is necessary to include them
  const registerUser = async (email, password, displayName) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName });
      // setCurrentUserTracking(auth.currentUser);
      setCurrentUserTracking(auth.currentUser);
      // After successful registration, the user will be taken to the home page
      navigate("/");
      toast.success("Registered Successfully!");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  // Login a user
  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // After successful Login, the user will be taken to the home page
      navigate("/");
      toast.success("Logged in Successfully!");
    } catch (error) {
      console.log(error.message);
    }
  };

  // Auth State Observer
  // This function will always check user status and whenever a user status changed, it will be triggered
  const userObserver = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL } = user;
        // setCurrentUser({ email, displayName, photoURL });
        setCurrentUserTracking({ email, displayName, photoURL });
      } else {
        // setCurrentUser(null);   // It can be also written false, in the end null is a falsy value. But with null it is being identified that there is no user by default
        setCurrentUserTracking(null);
      }
    });
  };

  // Wether there is a user, it will start the authentiction automatically. To track that process the function userObserver can be started. So it is necessary to start that process when the app run first time. It is necessary to call the function and useEffect is the best place to call a function only one time
  useEffect(() => {
    // Start the execution of userObserver
    userObserver();
  }, []);

  console.log(currentUserTracking);

  // Google Sign-In
  // Authenticate with provider
  const signUpProvider = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
      toast.success("Logged in successfully !");
    } catch (error) {
      console.log(error.message);
    }
  };

  // Sign out (logout)
  const logOut = () => {
    signOut(auth);
    console.log("Logged out successfully !");
    navigate("/");
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password resent link sent. Please check your email!");
    } catch (error) {
      console.log(error.message);
    }
  };

  // !Optional it is possible to create an object with all the values that you want to export. To make the code more readable and cleaner
  const values = {
    // currentUser,
    currentUserTracking,
    registerUser,
    signIn,
    signUpProvider,
    logOut,
    forgotPassword,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
