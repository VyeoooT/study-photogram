import { auth } from "@/firebaseConfig";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextData = {
    user: User | null
    logIn: typeof logIn
    signUp: typeof signUp
    logOut: typeof logOut
    googleSignIn: typeof googleSignIn
}

// login
const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
}

// signup
const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

// logout
const logOut = () => {
    signOut(auth)
}

// login with account google
const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleAuthProvider)
}

export const userAuthContext = createContext<AuthContextData>({
    user: null,
    logIn,
    signUp,
    logOut,
    googleSignIn
})

// interface for component
interface IUserAuthProviderProps {
    children: React.ReactNode
}

// write component typescript support type checking and autocomplete
export const UserAuthProvider: React.FunctionComponent<IUserAuthProviderProps> = ({ children }) => {
    // state react
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                console.log("The logger in user state is: ", user)
            }

            return () => {
                unsubscribe()
            }
        })
    })

    // const valuse
    const values: AuthContextData = {
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn,
    }
    
    return (
        <userAuthContext.Provider value={values}>
            {children}
        </userAuthContext.Provider>
    )
}

// use user Auth
export const useUserAuth = () => {
    return useContext(userAuthContext)
}
