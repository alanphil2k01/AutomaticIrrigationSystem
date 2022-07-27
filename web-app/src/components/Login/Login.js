import { } from "firebase/auth";
import { auth } from '../../firebase/firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from '../../context/AuthContext';
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'

function Login() {
    let navigate = useNavigate()
    const { handleUser } = useContext(AuthContext);
    // TODO: add user to firestore


    function handleLogin(e) {
        e.preventDefault()
        const email = document.getElementById("email-field").value
        const password = document.getElementById("password-field").value
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                handleUser(user)
                if(user) {
                    navigate("/");
                }
            })
            .catch((error) => {
                alert("Cannot Login: " + error);
            });
        console.log(email, password)
    }

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                handleUser(user)
                if(user) {
                    navigate("/");
                }
            }).catch((error) => {
                console.log(error);
            });
    }

    return (
        <div class="login">
        <div class="login-triangle"></div>

        <h2 class="login-header">Log in</h2>

        <form class="login-container" onSubmit={handleLogin}>
            <p><input id="email-field" type="email" placeholder="Email"/></p>
            <p><input id="password-field" type="password" placeholder="Password"/></p>
            <p><input  type="submit" value="Log in" /></p>
        </form>

        <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="login.css"/>
        <div class="g_body">

        <button class="g-button" onClick={signInWithGoogle}>
            <img class="g-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/157px-Google_%22G%22_Logo.svg.png" alt="Google Logo"/>
            <p class="g-text">Sign in with Google</p>
        </button>

        </div>
        </div>


    )
}

export default Login;
