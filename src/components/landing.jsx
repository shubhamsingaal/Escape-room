import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import "../styles/landing.css"

import { NavBar } from "./landing/NavBar";
import { Banner } from "./landing/Banner";
import { Rules } from "./landing/Rules";
import { About } from "./landing/About";
import { Footer } from "./landing/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../assets/img/logo.svg"

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
        return (<img src={logo} alt="Logo" style={{height:20, marginTop:250}}/>)
    }
    else if(authState.isSignedIn) 
        navigate('/game', { replace: false });

    return (
        <div>
            <NavBar />
            <Banner />
            <Rules />
            <About />
            <Footer />
        </div>
    )
}

export default Landing;