import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { app, db, auth } from "./firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import "../styles/game.css"
import { signOut } from "firebase/auth"
import { Link } from "react-router-dom"
import Leaderboard from "../components/leaderboard"

import GameImage from './game_image'
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
    const characterRef = useRef()
    const e1 = useRef()
    const e2 = useRef()
    const e3 = useRef()
    const e4 = useRef()
    const e5 = useRef()
    const e6 = useRef()
    const e7 = useRef()
    const e8 = useRef()
    const e9 = useRef()
    const [questionList, setQuestionList] = useState([
        { "question": "the first question", "options": ["one", "two"], "solution": "something" }
    ])

    const coordinates = new Array(9)

    useEffect(()=> {
        coordinates[0] = [e1.current?.getBoundingClientRect().x, e1.current?.getBoundingClientRect().y]
        coordinates[1] = [e2.current?.getBoundingClientRect().x, e2.current?.getBoundingClientRect().y]
        coordinates[2] = [e3.current?.getBoundingClientRect().x, e3.current?.getBoundingClientRect().y]
        coordinates[3] = [e4.current?.getBoundingClientRect().x, e4.current?.getBoundingClientRect().y]
        coordinates[4] = [e5.current?.getBoundingClientRect().x, e5.current?.getBoundingClientRect().y]
        coordinates[5] = [e6.current?.getBoundingClientRect().x, e6.current?.getBoundingClientRect().y]
        coordinates[6] = [e7.current?.getBoundingClientRect().x, e7.current?.getBoundingClientRect().y]
        coordinates[7] = [e8.current?.getBoundingClientRect().x, e8.current?.getBoundingClientRect().y]
        coordinates[8] = [e9.current?.getBoundingClientRect().x, e9.current?.getBoundingClientRect().y]
        console.log(coordinates)
        console.log(e1.current)
    }, [questionNumber])


    useEffect(()=> {
        if(!characterRef.current) return;
        characterRef.current.style.bottom = `${coordinates[questionNumber][0]}px`
        characterRef.current.style.left = `${coordinates[questionNumber][1]}px`
    }, [questionNumber])

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
    })

    return (
        <div className="container">
            <div className="overlay" style={{display:showQuestion?"block":"none"}} onClick={()=> setShowQuestion(false)}></div>
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
                    <GameImage 
                        props={[e1, e2, e3, e4, e5, e6, e7, e8, e9]}
                    className="gameimg" alt="gaming arena" />
                    <img src={CharacterImage} ref={characterRef} className="character" onClick={()=>setShowQuestion(true)} />
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
                            className="form-control"
                            onChange={(event) => setResponseValue(event.target.value)}
                            onKeyDown={(event) => { if (event.key === 'Enter') handleSubmitResponse() }} />
                        <button
                            className="close-button btn btn-primary"
                            onClick={() => setShowQuestion(false)}> Close </button>
                    </div>}
            </div>
        </div>
    )
}

export default Game;