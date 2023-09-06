// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAy6diU5_DuPOlOUpaRAFP6Dcu6qx44BU",
  authDomain: "sms-sending-projects.firebaseapp.com",
  projectId: "sms-sending-projects",
  storageBucket: "sms-sending-projects.appspot.com",
  messagingSenderId: "524702836356",
  appId: "1:524702836356:web:edaa7f32ff58f0128ec4d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;