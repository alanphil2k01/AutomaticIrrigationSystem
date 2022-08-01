import { firestore, auth } from '../../firebase/firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from '../../context/AuthContext';
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'
import { doc, getDoc } from 'firebase/firestore';

function Login() {
    let navigate = useNavigate()
    const { handleUser } = useContext(AuthContext);

    async function handleLogin(e) {
        e.preventDefault()
        const email = document.getElementById("email-field").value
        const password = document.getElementById("password-field").value
        const username = (await getDoc(doc(firestore, "users", email))).data().name;

        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                user.displayName = username
                handleUser(user)
                if(user) {
                    navigate("/");
                }
            })
            .catch((error) => {
                alert("Cannot Login: " + error);
            });
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
        <div className="login">
            <div className="login-triangle"></div>

            <h2 className="login-header">Log in</h2>

            <form className="login-container" onSubmit={handleLogin}>
                <p><input id="email-field" type="email" placeholder="Email"/></p>
                <p><input id="password-field" type="password" placeholder="Password"/></p>
                <p><input  type="submit" value="Log in" /></p>
                <p>Don't have an account?
                <a href="/signup"> Sign Up</a>
                </p>
            </form>

            <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" href="login.css"/>

            <div className="g_body">
                <button className="g-button" onClick={signInWithGoogle}>
                    <img className="g-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/157px-Google_%22G%22_Logo.svg.png" alt="Google Logo"/>
                    <p className="g-text">Sign in with Google</p>
                </button>
            </div>
        </div>
    )
}

export default Login;
