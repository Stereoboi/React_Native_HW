import AsyncStorage from "@react-native-async-storage/async-storage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmURTns3C5T-yGISt8RYF7Lw11rJpND8g",
  authDomain: "reactnative-b8821.firebaseapp.com",
  projectId: "reactnative-b8821",
  storageBucket: "reactnative-b8821.appspot.com",
  messagingSenderId: "130649260187",
  appId: "1:130649260187:web:ad822dda91e95c0669063e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getFirestore(app);
export const storage = getStorage(app);
