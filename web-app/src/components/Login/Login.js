import { } from "firebase/auth";
import { auth, firestore } from '../../firebase/firebase';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from '../../context/AuthContext';
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

function Login() {
    let navigate = useNavigate()
    const { handleUser } = useContext(AuthContext);

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                handleUser(user)
                if(user) {
                    firestore.collection('users').doc(user.uid).set({
                        uid: user.uid,
                    });
                    navigate("/");
                }
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorCode)
                console.log(errorMessage)
                // console.log(email)
                console.log(credential)
            });
    }

    return (
        <div className="Login">
            <h1>Login Page</h1>
            <button onClick={signInWithGoogle}>SignInWithGoogle</button>
        </div>
    )
}

export default Login;
