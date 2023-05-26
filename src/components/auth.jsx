import { React, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { app, db, auth } from "./firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import '../styles/auth.css'

function Login () {
    document.title =  "Login | Panorama"
    
    // firebase configurations, do not change
    const [authState, setAuthState] = useState({
        isSignedIn: false,
        pending: true,
        user: null,
    })
    
    useEffect(() => {
      const unregisterAuthObserver = auth.onAuthStateChanged(user => 
          setAuthState({ user, pending: false, isSignedIn: !!user })
      )
      return () => unregisterAuthObserver()
    }, [])

    const navigate = useNavigate()
    const provider = new GoogleAuthProvider();

    // cannot read phone number because Google doesn't share it
    // provider.addScope('https://www.googleapis.com/auth/user.phonenumbers.read');

    function handleGoogleSignin(event) {
        event.preventDefault()
        event.target.setAttribute("disabled", "")
        signInWithPopup(auth, provider)
        .then(async (result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user.email)
            await setDoc(doc(db, "users", result.user.uid), {
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
                creationTime: result.user.metadata.creationTime,
                lastSingInTime: result.user.metadata.lastSignInTime,
              },
              { merge: true });
            navigate("/", {"replace": true})
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData?.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorCode, errorMessage, email, credential)
        });
    }

    return (
    <div className="wrapper">
        <div className="logo-space">
            ISTE Students' Chapter NIT Durgapur
        </div>
        <div className="centered">
            <h1>Login to continue</h1>
            <div className="footnote">
                Authenticate with your Google Account to continue
            </div>
                <button 
                    onClick={handleGoogleSignin} 
                    className="google-button"> Google </button>
        </div>
    </div>
    )
}

export default Login