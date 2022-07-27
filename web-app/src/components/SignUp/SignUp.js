import { auth } from '../../firebase/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from '../../context/AuthContext';
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css'

function SignUp() {
    let navigate = useNavigate()
    const { handleUser } = useContext(AuthContext);

    function handleSignUp(e) {
        e.preventDefault()
        const email = document.getElementById("email-field").value
        const password = document.getElementById("password-field").value
        console.log(email)
        console.log(password)

        createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
            const user = result.user;
            handleUser(user)
            if(user) {
                navigate("/");
            }        })
        .catch((error) => {
          console.log("Sign Up failed: " + error)
        });
    }



    return (
        <div class="login">
            <div class="login-triangle"></div>
            <h2 class="login-header">Sign Up</h2>
            <form class="login-container" onSubmit={handleSignUp}>
                <p><input id="username-field" type="username" placeholder="Username"/></p>
                <p><input id="email-field" type="email" placeholder="Email"/></p>
                <p><input id="password-field" type="password" placeholder="Password"/></p>
                <p><input  type="submit" value="Sign up" /></p>
            </form>
        </div>
    )
}

export default SignUp;
