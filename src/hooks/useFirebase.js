import initializeFirebase from "../Firebase/firebase.init";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";

initializeFirebase();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [adminIsLoading, setAdminIsLoading] = useState(true);

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    setIsLoading(true);
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      } else {
        setUser({});
        setIsLoading(false);
      }
    });

    return () => unSubscribe;
  }, []);

  useEffect(() => {
    setAdminIsLoading(true);
    const admin = localStorage.getItem("admin_info");
    if (admin === "ADMINinfo9910099") {
      setAdmin(true);
      setAdminIsLoading(false);
    } else {
      setAdmin(false);
      setAdminIsLoading(false);
    }
  }, []);

  return {
    googleSignIn,
    setUser,
    setIsLoading,
    setError,
    logOut,
    setAdmin,
    adminIsLoading,
    admin,
    user,
    error,
    isLoading,
  };
};

export default useFirebase;
