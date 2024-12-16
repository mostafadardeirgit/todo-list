import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIEBS2eflFrvUqC3kWTLOBPMJc_LdvJXE",
  authDomain: "to-do-list-51994.firebaseapp.com",
  projectId: "to-do-list-51994",
  storageBucket: "to-do-list-51994.appspot.com",
  messagingSenderId: "303340919441",
  appId: "1:303340919441:web:1efd888a71a8c6dcd3bd30",
  measurementId: "G-2BEBKDS5SW",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const fireStore = getFirestore(app);
