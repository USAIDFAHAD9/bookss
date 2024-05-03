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

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useAsyncError } from 'react-router-dom'

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
const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

const googleProvider = new GoogleAuthProvider()

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user)
      else setUser(null)
    })
  }, [])

  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password)

  const signinUserWithEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
  }

  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider)

  const handleCreateNewListing = async (name, isbnNumber, price, coverPic) => {
    const imageRef = ref(
      storage,
      `uploads/images/${Date.now()}-${coverPic.name}`
    )
    const uploadResult = await uploadBytes(imageRef, coverPic) //this uploads the image file
    return await addDoc(collection(firestore, 'books'), {
      name,
      isbnNumber,
      price,
      imageURL: uploadResult.ref.fullPath,
      userID: user.uid,
      userEmail: user.email,
      userDisplayName: user.displayName,
      userPhotoURL: user.photoURL,
    }) //this uploads all user information
  }

  const listAllBooks = () => {
    return getDocs(collection(firestore, 'books'))
  }

  const getBookById = async (bookId) => {
    const docRef = doc(firestore, 'books', bookId) // this is a reference to the doc we have to get
    const result = await getDoc(docRef) //result store the document we got using the reference
    return result
  }

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path))
  }

  const placeOrder = async (bookId, quantity) => {
    const collectionRef = collection(firestore, 'books', bookId, 'orders')
    const result = await addDoc(collectionRef, {
      userId: user.uid,
      displayName: user.displayName,
      userEmail: user.email,
      photoURL: user.photoURL,
      quantity: Number(quantity),
    })
    return result
  }

  const fetchMyBooks = async (userID) => {
    const collectionRef = collection(firestore, 'books')
    const q = query(collectionRef, where('userID', '==', userID))
    const result = await getDocs(q)
    // console.log(result)
    return result
  }

  const getOrders = async(bookId) => {
    const collectionRef = collection(firestore , 'books' , bookId , 'orders')
    const result = await getDocs(collectionRef)
    // console.log(result.docs)
    return result
  }
  const isLoggedIn = user ? true : false

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signinWithGoogle,
        handleCreateNewListing,
        listAllBooks,
        getImageURL,
        getBookById,
        placeOrder,
        fetchMyBooks,
        getOrders,
        isLoggedIn,
        user,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  )
}
