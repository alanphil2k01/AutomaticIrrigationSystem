import { createContext, useState, useEffect } from "react";
import { auth } from '../firebase/firebase'

export const AuthContext = createContext({})


function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('authUser'))
    const [pending, setPending] = useState(true)

    const authListener = () => {
        auth.onAuthStateChanged(user => {
            if(user) {
                setCurrentUser(user)
                setPending(false)
            } else {
                setCurrentUser(null)
            }
        })
    }


    const handleUser = (user) => {
        setCurrentUser(user)
        localStorage.setItem('authUser', user)
    }

    useEffect(() => {
        authListener()
    }, [])


    const handleLogout = () => {
        auth.signOut();
        localStorage.removeItem('authUser')
    }

    const value = { currentUser, pending, handleLogout, handleUser }



    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider;
