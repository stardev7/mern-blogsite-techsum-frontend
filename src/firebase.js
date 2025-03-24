// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAHhenqDrhAdLZwytT_NUdV7Pudfh6ruo",
  authDomain: "mern-blogsite-techsum.firebaseapp.com",
  projectId: "mern-blogsite-techsum",
  storageBucket: "mern-blogsite-techsum.firebasestorage.app",
  messagingSenderId: "914638520054",
  appId: "1:914638520054:web:89026096321d8ebda076d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);