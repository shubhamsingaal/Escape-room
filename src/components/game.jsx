import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { db, auth } from "./firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import "../styles/game.css"
import { signOut } from "firebase/auth"
import { Link } from "react-router-dom"
import Leaderboard from "../components/leaderboard"

import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

import GameImage from '../assets/newsvg.png'
import CharacterImage from '../assets/image-removebg-preview.png'

function Game() {

    const navigate = useNavigate()
    // terminate game on moving out of the window
    // eg switching tabs, etc

    const printMagicOnConsole = () => {
        // write some interesting thing on the console
        // do not touch the pattern, it is like that only
        console.clear()
        console.log(`
        ==========================================
        =  ______   _____   _______     _____    =
        =    |     /           |       |         =
        =    |     \\____       |       |___      =
        =    |          \\      |       |         =
        =  __|___  _____/      |       |_____    =
        ==========================================
        Opening DevTools on this Game is not allowed!
        Each activity is logged, and you are disqualified.
        Good luck for the next Event!

        (c) Team ISTE Students' Chapter NIT Durgapur, 2023
        `)
    }

    // firebase configurations, do not change
    const [authState, setAuthState] = useState({
        isSignedIn: false,
        pending: true,
        user: null,
    })

    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
            setAuthState({ user, pending: false, isSignedIn: !!user })
            const docSnap = await getDoc(doc(db, 'leaderboard', `${user.uid}`))
            
            document.addEventListener("mouseout", (e) => handleTerminateGame(e))
            printMagicOnConsole()

            if(docSnap.exists()) {
                navigate("/completed")
            }
            
        })
        return () => unregisterAuthObserver()
        // eslint-disable-next-line
    }, [])

    // ^^^^^^^^^^^^^^^^^^^^^^^^^^
    // all hooks defined here
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^
    const [starting_time, ] = useState(new Date())
    const [showQuestion, setShowQuestion] = useState(false)
    const [responseValue, setResponseValue] = useState("")
    const [questionNumber, setQuestionNumber] = useState(2)
    const [showDropDown, setShowDropDown] = useState(false)
    const [showLeaderboard, setShowLeaderboard] = useState(false)
    const [answerNumber, setAnswerNumber] = useState(1)
    const [doneQuestions, setDoneQuestions] = useState(new Set())
    doneQuestions.add(2)
    const [score, setScore] = useState(0)
    const gameRef = useRef()
    const [questionList, ] = useState([
        { "question": `
"You find yourself trapped in a mysterious room with four locked doors. 
Each door is labeled with a different symbol: a key, a padlock, a lockpick, and a combination lock. On the wall, there's a riddle written in code:

\`\`\`'I am the beginning of everything, the end of everywhere. I'm the beginning of eternity, the end of time and space. What am I?'\`\`\`

To escape the room, you must solve the riddle and identify which door to open. Which door should you choose?"`,
         "options": ["The door labeled 'key'", "The door labeled 'padlock'", "The door labeled 'lockpick'", "The door labeled 'combination lock'"],
         "solution": "The door labeled 'combination lock'" },
        { "question": `
"You enter a dark room with a single table in the center. On the table, there are three objects: a magnifying glass, a map, and a 
set of playing cards. As you examine the objects, you notice a message written on the back of the playing cards: 
\`\`\`'Follow the path of diamonds to find your way out.'\`\`\`
Looking at the map, you see several paths marked with different symbols: a heart, a spade, a diamond, and a club. 

Which path should you follow to escape the room?"`,
        "options": ["The path marked with a heart", "The path marked with a spade", "The path marked with a diamond", "The path marked with a club"],
        "solution": "The path marked with a diamond" },
        { "question": `
"You find yourself in front of a computer showing a puzzle and a prompt where you have to enter a four-digit number by solving the puzzle: "
\`\`\`How many planets does the solar system have?
X
How many NBA titles does Michele Jordan win?
/
How many days in a week?
+
What year was Albert Einstein Born?
\`\`\``,
        "options": ["1900", "1881", "1873", "1882"], 
        "solution": "1881"},
        { "question": `
You enter a room having a chess board on which a game is played but no yet completed, a card with Black's queen and 
"4 moves "written on it, 4 boxes with names \`B5\`, \`C6\`, \`G1\`, \`H7\`. Out of the 4 boxes 3 are empty and only one has the 
key to escape the room, **you have to find that box to escape.**`,
        "options": ["B5", "C6", "G1", "H7"], "solution": "C6" },
        {"question": `A psycho caught you and let you choose where you would have to stay on your own for the following three weeks. 
If you manage to survive he'll set you free. He gave you three options:
**Which option would you choose to survive?** (Answer as A, B or C)`,
        "options": ["a desert full of cacti", "a sunny field with flowers, a banana and a glass of water.", "a beach under stormy skies surrounded by sharp rocks and hit by high waves."],
        "solution": "C" },
        { "question": `You're kidnapped and held in a basement by a maniac professor but the basement has three doors and one of 
them leads to freedom. The professor leaves and you get to open the doors one after the other:
**How can you escape?** (Answer as A, B or C)`, 
        "options": ["On the other side of the 1st door, there's a dense jungle full of deadly creatures", 
            "behind the 2nd door there's a gigantic fire-breathing Dino that could burn you alive",
            "behind the 3rd door, you see a lake of ice water that freezes everything in several seconds"], "solution": "B" },
        { "question": `
You find yourself in a room with a series of paintings on the wall. Each painting depicts a famous landmark from around the world. There are also four pedestals in the center of the room, each holding a small object. To escape the room, you must correctly match the landmark with the corresponding object.
\`\`\`Landmarks: 
1. Statue of Liberty 
2. Eiffel Tower
3. Great Wall of China 
4. Taj Mahal 

Objects: 
A. Crown 
B. Torch 
C. Key 
D. Fan 
\`\`\`
**Which object should be matched with the Eiffel Tower?**`, 
        "options": ["Crown", "Torch", "Key", "Fan"], "solution": "Fan" },
        { "question": `
Now if you are able to escape from this room. You reach the final room and you need to go through one of the doors to get free from this room. There is extremely dark in this room. You try to switch on the lights but the electricity is not there. Again there are three doors in this room and one door will lead to your escape. Their doors are explained below 

1st door leads to a terrorist zone where one entering will immediately bombard with thousands of bullets.  
2nd doors lead to the haunted valley where anyone coming will be tortured to death by the ghosts.
3rd door leads electrical bridge which will give you high-voltage shocks which are enough to kill anyone who comes in this contact with this bridge. 

**Which Door will you choose to finally escape?** (Answer as 1st door, 2nd door, 3rd door)`,
        "options": [], "solution": "3rd door"},
        {question: `You are organizing a race with five participants: Alice, Bob, Claire, David, and Emily. The race consists of five rounds, and each participant finishes each round in a different position. 
The following clues will help you determine the rankings for each round:
1. In Round 1, Alice finishes ahead of Claire.
2. In Round 2, Bob finishes ahead of Emily.
3. In Round 3, Claire finishes ahead of David.
4. In Round 4, Emily finishes ahead of Alice.
5. In Round 5, David finishes ahead of Bob.

**Who comes at the third place finally?**`,
        options: ['Emily', 'Alice', 'Bob', 'David', 'Claire'], solution: 'Claire'},
        {question: `What locations are being indicated here? 
\`\`\`
char {a,c,e,f,n,s,}
{
    if (temperature<=30) 
    gets(t);
}
\`\`\`
        `, options: ['Tata Tea', 'Cafe Cofee Day', 'Nescafe', 'I don\'t care'], solution: 'Nescafe'},
        {question: `Now you're surrounded by an electrified cage with 3 key holes, out of which only one can open the door. 
I'm Each door Knob has an alphabet engraved in it, which can only open from that letter key only.
You also have a riddle given to solve the puzzle" : 
\`\`\`
Door 1 - V
Door 2 - A
Door 3 - E
\`\`\`
**"I'm the  letter of vowel and the letter you use most"**
        `, options: ['A', 'E', 'V', 'O', 'I'], solution: 'V'},
        {question: `Find the hidden Code in the poem:-
Here's a poem for you:

\`\`\`
Open your heart and let it sing
Perhaps you'll find the missing thing
Every moment is a new surprise
Never know what you'll find inside

Many treasures are waiting here
Each one special, each one dear
\`\`\`
        `, options: ['SNACK','EVERY ONE','OPEN ME','OYHALIT'], solution: 'OPEN ME'},
        {question: `You are in a room which contains a note saying-*SUBSCRIBE ANY OTT PLATFORM* 
and three OTT platforms with subscribe buttons under them are displayed to you as following:
A. prime videos
B. netflix
C. disney+hotstar
And you also find the three posters of the shows \`lucifer\`, \`the vampire diaries\`, \`peaky blinders\`.
Subscribing to the appropriate platform unlock the next level.
        `, options: ['prime videos', 'netflix', 'disnaey+hotstar'], solution: 'netflix'},
        {question: `Guess the age of three sons by the given hints
Hint1: the product of the ages of the three sons is 36
Hint 2: the sum is 13
Hint 3: the youngest child is the only one with blue eyes.

**Now multiply these ages and what is the answer?**
        `, options: [], solution: '36'},
        {question: `In a certain language STRUGGLE is coded as VTTOIHGF then in the same language EXAMINATION is coded as
a. HXXGRRMNHVY
b. ZZVRRMNNLGC
c. HCXGYYMMHUY
d. ZZVRRNMMLKH
        `, options: ['A', 'B', 'C', 'D'], solution: 'B'},
        { "question": "You won!", "options": [], "solution": "" },
    ])

    useEffect(() => {
        if(doneQuestions.size===9) {
            updateFinalScore(score)
            alert('You won. Congratulations!')
            navigate('/completed', {'replace': true})
        }
        // eslint-disable-next-line
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
        if (responseValue === 'questionList[questionNumber].solution') {
            // perform the chores first
            let randomNew = 2;
            while(doneQuestions.has(randomNew)){
                randomNew = parseInt(Math.random(new Date())*14)
            }
            setQuestionNumber(randomNew)
            doneQuestions.add(randomNew)
            setDoneQuestions(doneQuestions)
            
            // setQuestionNumber((state) => state + 1)
            setShowQuestion(false)

            // any feedback
            alert("Correct!")

            let newScore = score+(questionNumber<=6?10:20)/answerNumber
            updateScore(newScore)

            // update score and reset try val
            setScore((score) => newScore)
            setAnswerNumber(1)
        }
        else {
            setAnswerNumber((state) => state+1)
            alert(`Incorrect. Oops! ${answerNumber+1}`)
        }
        setResponseValue("")
    }

    function handleTerminateGame(e) {
        e = e ? e : window.event;
        var from = e.relatedTarget || e.toElement;
        if (!from || from.nodeName === "HTML") {
            // stop your drag event here
            // for now we can just use an alert
            console.log('Unfair activity observed! Game aborted')
            setScore(0, updateFinalScore)
            document.removeEventListener("mouseout", handleTerminateGame)
            navigate("/completed", {'replace': true})
        }
    }

    // update each level's score
    async function updateScore(final_score) {
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
            timestamp: ending_time-starting_time,
        },
        { merge: true })
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
            timestamp: ending_time-starting_time,
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
            <div className="overlay" style={{ display: showQuestion || showLeaderboard ? "block" : "none" }} onClick={() => {setShowQuestion(false); setShowLeaderboard(false)}}></div>
            <div className="leaderboard" style={{ display: showLeaderboard ? "flex" : "none" }}>
                <Leaderboard />
            </div>

            <nav className="topnav">
                <div className="heading"> Escape Room </div>
                <div className="dropdown">
                    <ul className="dropbtn icons btn-right showLeft" onClick={() => setShowDropDown((state) => !state)}>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <div id="myDropdown" style={{ display: showDropDown ? "block" : "none" }} className="dropdown-content">
                        <Link to="#" onClick={() => {setShowDropDown(false); setShowLeaderboard(true)}}>LeaderBoard</Link>
                        <Link to="#" onClick={(e) => {setShowDropDown(false); handleLogout(e)}}> Logout </Link>
                    </div>
                </div>
            </nav>

            <div className="game-area" ref={gameRef}>
                <div>
                    <img src={GameImage}
                        className="gameimg" width={"100%"} alt="gaming arena" />
                    <img src={CharacterImage} className="character1" style={{display:doneQuestions.size===1?'block':'none', left:`${gameRef.current?.getBoundingClientRect().x/2+191}px`}} onClick={() => setShowQuestion(true)} alt="character" />
                    <img src={CharacterImage} className="character2" style={{display:doneQuestions.size===2?'block':'none', left:`${gameRef.current?.getBoundingClientRect().x/2+288}px`}} onClick={() => setShowQuestion(true)} alt="character" />
                    <img src={CharacterImage} className="character3" style={{display:doneQuestions.size===3?'block':'none', left:`${gameRef.current?.getBoundingClientRect().x/2+382}px`}} onClick={() => setShowQuestion(true)} alt="character" />
                    <img src={CharacterImage} className="character4" style={{display:doneQuestions.size===4?'block':'none', left:`${gameRef.current?.getBoundingClientRect().x/2+545}px`}} onClick={() => setShowQuestion(true)} alt="character" />
                    <img src={CharacterImage} className="character5" style={{display:doneQuestions.size===5?'block':'none', left:`${gameRef.current?.getBoundingClientRect().x/2+626}px`}} onClick={() => setShowQuestion(true)} alt="character" />
                    <img src={CharacterImage} className="character6" style={{display:doneQuestions.size===6?'block':'none', left:`${gameRef.current?.getBoundingClientRect().x/2+520}px`}} onClick={() => setShowQuestion(true)} alt="character" />
                    <img src={CharacterImage} className="character7" style={{display:doneQuestions.size===7?'block':'none', left:`${gameRef.current?.getBoundingClientRect().x/2+347}px`}} onClick={() => setShowQuestion(true)} alt="character" />
                    <img src={CharacterImage} className="character8" style={{display:doneQuestions.size===8?'block':'none', left:`${gameRef.current?.getBoundingClientRect().x/2+200}px`}} onClick={() => setShowQuestion(true)} alt="character" />
                    <img src={CharacterImage} className="character9" style={{display:doneQuestions.size===9?'block':'none', left:`${gameRef.current?.getBoundingClientRect().x/2+210}px`}} onClick={() => setShowQuestion(true)} alt="character" />
                </div>
                
                {showQuestion &&
                    <div className="question-space">
                        <span className="question">
                            <span>Type your answer as the correct option value as-is. Press Enter to submit</span>
                            <ReactMarkdown 
                                children={questionList[questionNumber]?.question} 
                                rehypePlugins={[rehypeRaw, remarkGfm]}>
                            </ReactMarkdown>
                            <ul>
                                {optionsRendered}
                            </ul>
                        </span>
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