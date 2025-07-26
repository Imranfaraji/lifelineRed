// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_ENV_apiKey,
  authDomain:import.meta.env.VITE_ENV_authDomain,
  projectId:import.meta.env.VITE_ENV_projectId,
  storageBucket:import.meta.env.VITE_ENV_storageBucket,
  messagingSenderId:import.meta.env.VITE_ENV_messagingSenderId,
  appId:import.meta.env.VITE_ENV_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth= getAuth(app)