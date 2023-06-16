import { useState, useEffect } from "react"
import { app, db, auth } from "./firebase"
import { query, orderBy, limit, collection, getDocs } from "firebase/firestore";
import  "../styles/leaderboard.css"

function Leaderboard () {
    const [leaderboardData, setLeaderboardData] = useState([])

    // fetch data for leaderboard: only top 10 records
    async function handleFetchLeaderboard() {
        const lbRef = collection(db, "leaderboard");
        const q = query(lbRef, orderBy("score", "desc"), orderBy("timestamp"), limit(10));
        const querySnapshot = await getDocs(q);
        
        let newLBData = []
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            newLBData.push({'name':doc.data().name,'score':doc.data().score})
          });

        setLeaderboardData(newLBData)
    }

    const leaderboardRendered = leaderboardData.map((data) => {
        return (
            <tr className="scorelist">
                <td className="name">
                    {data.name}
                </td>
                <td className="score">
                    {data.score}
                </td>
            </tr>
        )
    })

    return (<>
        <h3> Leaderboard </h3>
        <button className="rounded-button" onClick={handleFetchLeaderboard}> Refresh </button>
        <table>
            <thead>
                <th>Name</th>
                <th>Score</th>
            </thead>
            <tbody>
                {leaderboardRendered}
            </tbody>
        </table>
        
    </>)
}

export default Leaderboard;