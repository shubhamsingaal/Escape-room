import { useEffect, useState } from "react"
import { app, db, auth } from "./firebase"
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

    const [phoneNumber, setPhoneNumber] = useState()
    const [loginState, setLoginState] = useState(true)

    // handle submit phone number
    function handleSubmitPhone(event) {
        event.preventDefault();
    }

    return (
    <div className="wrapper">
        <div className="logo-space">
            ISTE Students' Chapter NIT Durgapur
        </div>
        <div className="centered">
            <h1>Login to continue</h1>
            <div className="footnote">
                Login with your phone number before playing.
            </div>
            <form onSubmit={(event) => event.preventDefault()}>
                <input 
                    style={{display:loginState?"flex":"none"}}
                    type="text" placeholder="Name" />
                <input 
                    style={{display:loginState?"flex":"none"}}
                    type="number" placeholder="Phone Number" />
                <button 
                    style={{display:loginState?"flex":"none"}}
                    className="get-otp-button"> Get OTP </button>
                <input 
                    style={{display:loginState?"none":"flex"}}
                    type="number" 
                    maxLength="6" 
                    className="OTP" 
                    placeholder="Enter OTP" />
                <button 
                    style={{display:loginState?"none":"flex"}}
                    className="submit-otp"> Submit OTP </button>
            </form>
        </div>
    </div>
    )
}

export default Login