// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR3XURlj6k3nQmsoL9zAQsOBu9aqyRPcI",
  authDomain: "crwn-clothing-db-71b5f.firebaseapp.com",
  projectId: "crwn-clothing-db-71b5f",
  storageBucket: "crwn-clothing-db-71b5f.appspot.com",
  messagingSenderId: "892746769149",
  appId: "1:892746769149:web:4296d647bec50b5d719494"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = ()=>signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
  )=>{

    console.log(userAuth, additionalInformation);
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch(error){
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password)=>{
  
  if(!email || !password)  return;
  return await createUserWithEmailAndPassword(auth, email, password);
}