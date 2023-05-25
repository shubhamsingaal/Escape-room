import { useEffect, useState } from "react"
import { app, db, auth } from "../firebase"
import '../../styles/auth.css'

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
    return (<div>

    </div>)
}

export default Login