import { useState, useEffect } from "react"
import { app, db, auth } from "./firebase"
import { query, orderBy, limit, collection, getDocs } from "firebase/firestore";
import  "../styles/leaderboard.css"

function Leaderboard () {
    // firebase configurations, do not change
    const [authState, setAuthState] = useState({
        isSignedIn: false,
        pending: true,
        user: null,
    })
    
    useEffect(() => {
      const unregisterAuthObserver = auth.onAuthStateChanged(user => {
        handleFetchLeaderboard()
        setAuthState({ user, pending: false, isSignedIn: !!user })
      })
      return () => unregisterAuthObserver()
    }, [])

    const [leaderboardData, setLeaderboardData] = useState({})

    // fetch data for leaderboard: only top 10 records
    async function handleFetchLeaderboard() {
        const lbRef = collection(db, "leaderboard");
        const q = query(lbRef, orderBy("score", "desc"), orderBy("timestamp"), limit(10));
        const querySnapshot = await getDocs(q);

        let newLBData = {}

        querySnapshot.forEach((doc) => {
            newLBData[doc.id] = [doc.data().name, doc.data().score]
          });

        setLeaderboardData(newLBData)
    }

    const leaderboardRendered = leaderboardData.keys?.map((key) => {
        return (
            <li className="scorelist">
                <span className="name">
                    {leaderboardRendered[key][0]}
                </span>
                <span className="score">
                    {leaderboardRendered[key][1]}
                </span>
            </li>
        )
    })

    return <div>
        <ul className="leaderboard">
            {leaderboardRendered}
        </ul>
        <button onClick={handleFetchLeaderboard}> Refresh </button>
    </div>
}

export default Leaderboard;