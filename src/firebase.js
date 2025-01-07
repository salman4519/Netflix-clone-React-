// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACrBQAFgZH9IWzDdlhl0U1FQOPnohXAtY",
  authDomain: "netflix-clone-25be1.firebaseapp.com",
  projectId: "netflix-clone-25be1",
  storageBucket: "netflix-clone-25be1.firebasestorage.app",
  messagingSenderId: "405016106589",
  appId: "1:405016106589:web:502ff1504ae79ae89c1fb4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name,email,password) =>{
    try {
       const res = await createUserWithEmailAndPassword(auth,email,password);
       const user = res.user;
       await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email
       })
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const login = async(email,password) =>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

const logout = () =>{
    signOut(auth);
}

export {auth ,db ,signup ,login ,logout}