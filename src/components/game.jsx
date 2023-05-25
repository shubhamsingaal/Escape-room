import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { app, db, auth } from "./firebase"
import "../styles/game.css"

function Game(){
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
        navigate('/', { replace: true });

    return (
        <div>
            {/*  */}
        </div>
    )
}

export default Game;