import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { app, db, auth } from "./firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import "../styles/game.css"
import { signOut } from "firebase/auth"
import { Link } from "react-router-dom"
import Leaderboard from "../components/leaderboard"

import GameImage from '../assets/newsvg.png'
import  CharacterImage from '../assets/image-removebg-preview.png'

class GameData {
    #startedAt = new Date()
    #phoneNumber = 0
    #score = 0
    // GameData class: all data must be updated using this class
    constructor(startedAt, phoneNumber, score, completedAt, userAgent) {
        this.#startedAt = startedAt
        this.#phoneNumber = phoneNumber
        this.#score = score
        this.completedAt = completedAt
        this.userAgent = userAgent
    }
    update_score(score) {
        this.#score = score
    }
    get_score() {
        return this.#score
    }
}

function Game() {
    // firebase configurations, do not change
    const [authState, setAuthState] = useState({
        isSignedIn: false,
        pending: true,
        user: null,
    })

    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
            setAuthState({ user, pending: false, isSignedIn: !!user })
            updateDBwithUserDetails(user);
        }
        )
        return () => unregisterAuthObserver()
    }, [])

    async function updateDBwithUserDetails(user) {
        const docRef = doc(db, `users`, `${user?.uid}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.data()['startedAt']) {
            navigate("/completed", { replace: true })
        }
        return;
    }

    // ^^^^^^^^^^^^^^^^^^^^^^^^^^
    // all hooks defined here
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^
    const navigate = useNavigate()
    const [showQuestion, setShowQuestion] = useState(false)
    const [responseValue, setResponseValue] = useState("")
    const [questionNumber, setQuestionNumber] = useState(0)
    const [showDropDown, setShowDropDown] = useState(false)
    const [showLeaderboard, setShowLeaderboard] = useState(false)
    const [questionList, setQuestionList] = useState([
        { "question": "the first question", "options": ["one", "two"], "solution": "something" }
    ])

    // necessary condition checking if user is signed in or not
    if (authState.pending) {
        return (<h1> loading... </h1>)
    }
    else if (!authState.isSignedIn) {
        navigate('/', { replace: true });
    }

    function handleLogout() {
        // handles logging out 
        signOut(auth).then(() => {
            navigate.apply("/", { "replace": true })
        })
    }

    function handleSubmitResponse() {
        if (responseValue === questionList[questionNumber].solution) {
            setResponseValue("")
            setQuestionNumber((state) => state + 1)
            setShowQuestion(false)
            alert("Correct!")
        }
        else {
            alert("Incorrect. Oops!")
        }
    }

    // update the final score to database after game completion
    async function updateFinalScore(final_score) {
        let ending_time = new Date()

        // update to users db too
        await setDoc(doc(db, "users", `${authState.user?.uid}`), {
            score: final_score,
            completedAt: ending_time,
            userAgent: navigator.userAgent,
        },
            { merge: true })

        // update to leaderboard
        await setDoc(doc(db, "leaderboard", `${authState.user?.uid}`), {
            score: final_score,
            name: authState.user?.displayName,
            timestamp: ending_time,
        },
            { merge: true }).then((doc) => {
                navigate("/completed", { "replace": true })
            })
    }

    const optionsRendered = questionList[questionNumber]?.options.map((option_val) => {
        return (<li>
            {option_val}
        </li>)
    }
    )

    return (
        <div className="container">
            <div className="leaderboard" style={{display:showLeaderboard?"flex":"none"}}> 
                {/* <Leaderboard /> */}
            </div>

            <nav className="topnav">
                <div className="dropdown">
                    <ul className="dropbtn icons btn-right showLeft" onClick={() => setShowDropDown((state) => !state)}>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <div id="myDropdown" style={{display:showDropDown?"block":"none"}} className="dropdown-content">
                        <Link to="#" onClick={() => setShowLeaderboard(true)}>LeaderBoard</Link>
                        <Link to="#" onClick={handleLogout}> Logout </Link>
                    </div>
                </div>
                <div className="heading"> Escape Room </div>
            </nav>

            <div className="game-area">
                <div>
                    <img src={GameImage} className="gameimg" alt="gaming arena" />
                    <img src={CharacterImage} className="character" onClick={()=>setShowQuestion(true)} />
                </div> 
                {showQuestion &&
                    <div className="question-space">
                        <span className="question">
                            {questionList[questionNumber]?.question}
                        </span>
                        <ul>
                            {optionsRendered}
                        </ul>
                        <input
                            type="text"
                            placeholder="Enter answer"
                            value={responseValue}
                            onChange={(event) => setResponseValue(event.target.value)}
                            onKeyDown={(event) => { if (event.key === 'Enter') handleSubmitResponse() }} />
                        <button
                            className="close-button"
                            onClick={() => setShowQuestion(false)}> Close </button>
                    </div>}
            </div>
        </div>
    )
}

export default Game;