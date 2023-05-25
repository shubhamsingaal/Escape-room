import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { app, db, auth } from "./firebase";
import "../styles/landing.css"

function Landing () {
    document.title =  "Escape Room Game - Panorama | ISTE Students' Chapter NIT Durgapur"

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
    // necessary condition checking if user is signed in or not
    if (authState.pending) {
        return (<h1> loading... </h1>)
    }
    else if(authState.isSignedIn) 
        navigate('/game', { replace: true });

    // TODO: write rest of the logic (useState, useEffect, ...)
    // below. Write all frontend matter below
    return (
        <div>

        </div>
    )
}

export default Landing;