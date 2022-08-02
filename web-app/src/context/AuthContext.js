import { createContext, useState, useEffect } from "react";
import { firestore, auth } from '../firebase/firebase'
import { doc,  setDoc } from "firebase/firestore";

export const AuthContext = createContext({})


function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('authUser'))
    const [currentEmail, setCurrentEmail] = useState(localStorage.getItem('authEmail'))
    const [pending, setPending] = useState(true)

    const authListener = () => {
        auth.onAuthStateChanged(user => {
            if(user) {
                setCurrentUser(user)
                setCurrentEmail(user.email)
                setPending(false)
            } else {
                setCurrentUser(null)
            }
        })
    }


    const handleUser = async (user) => {
        setCurrentUser(user)
        localStorage.setItem('authUser', user)
        localStorage.setItem('authEmail', user.email)
        const userRef = doc(firestore, 'users', user.email);
        setDoc(userRef, { name: user.displayName, email: user.email }, { merge: true });
    }

    useEffect(() => {
        authListener()
    }, [])


    const handleLogout = () => {
        auth.signOut();
        localStorage.removeItem('authUser')
        localStorage.removeItem('authEmail')
    }

    const value = { currentUser, currentEmail, pending, handleLogout, handleUser }



    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider;
