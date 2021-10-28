import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const initializeFirebase = () => {
  return initializeApp(firebaseConfig);
};
export default initializeFirebase;
