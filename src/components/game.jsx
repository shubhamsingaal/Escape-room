import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { app, db, auth } from "./firebase"
import { doc, getDoc } from "firebase/firestore";
import "../styles/game.css"

class GameData {
    #startedAt = new Date()
    #phoneNumber = 0
    #score = 0
    // GameData class: all data must be updated using this class
    constructor (startedAt, phoneNumber, score, completedAt, userAgent) {
        this.#startedAt = startedAt
        this.#phoneNumber = phoneNumber
        this.#score = score
        this.completedAt = completedAt
        this.userAgent = userAgent
    }
    update_score (score) {
        this.#score = score
    }
    get_score () {
        return this.#score
    }
}

function Game(){
    // firebase configurations, do not change
    const [authState, setAuthState] = useState({
        isSignedIn: false,
        pending: true,
        user: null,
    })

    useEffect(() => {
      const unregisterAuthObserver = auth.onAuthStateChanged((user)=> {
          setAuthState({ user, pending: false, isSignedIn: !!user })
          updateDBwithUserDetails(user);
        }
      )
      return () => unregisterAuthObserver()
    }, [])

    async function updateDBwithUserDetails(user){
        const docRef = doc(db, `users`, `${user?.uid}`);
        const docSnap = await getDoc(docRef);
        if(docSnap.data()['startedAt']) {
            navigate("/completed", {replace: true})
        }
        return;
    }

    const navigate = useNavigate()
    // necessary condition checking if user is signed in or not
    if (authState.pending) {
        return (<h1> loading... </h1>)
    }
    else if(!authState.isSignedIn)
        navigate('/', { replace: true });

    return (
        <div>
            {/*  */}
        </div>
    )
}

export default Game;