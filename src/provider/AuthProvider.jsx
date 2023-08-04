import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createAccoutnWithGoole = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //signIn
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Send verify email
    const sendVerificationEmail = (user) => {
        return sendEmailVerification(user);
    }

    // logOut
    const logOut = () => {
        return signOut(auth);
    }

    // useEffect
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
            // if not verified email then automatically wil be logout
            if (!currentUser.emailVerified) {
                logOut()
                    .then(result => {
                        console.log(result);
                    })
                    .then(error => {
                        console.log(error.message);
                    })
            }
        });

        return () => {
            unSubscribe();
        }
    }, [])


    // user Information Object 
    const AuthInfo = {
        user,
        loading,
        createUser,
        sendVerificationEmail,
        signIn,
        createAccoutnWithGoole,
        logOut
    }

    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;