import { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth'
const FirebaseContext = createContext(null)

const firebaseConfig = {
  apiKey: 'AIzaSyBcw5fRQiIdPemZGK4q7pNmgkkFy3QdLUo',
  authDomain: 'bookss-272f4.firebaseapp.com',
  projectId: 'bookss-272f4',
  storageBucket: 'bookss-272f4.appspot.com',
  messagingSenderId: '811353951937',
  appId: '1:811353951937:web:f81bdf05a702c0f0670e40',
}

export const useFirebase = () => useContext(FirebaseContext)

const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)

const googleProvider = new GoogleAuthProvider()

export const FirebaseProvider = (props) => {

  const [user, setUser] = useState(null)
  
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user)
        setUser(user)
      else setUser(null)
    })
  }, [])

  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password)

  const signinUserWithEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
  }

  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider)

  const isLoggedIn = user ? true : false;
  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signinWithGoogle,
        isLoggedIn
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  )
}
