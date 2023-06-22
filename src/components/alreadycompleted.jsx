import { Link } from "react-router-dom"

function AlreadyCompleted () {
    document.title =  "Already Completed | ISTE Students' Chapter NIT Durgapur"

    return (<div>
        <h2>Thanks for playing!</h2>
        <div>
            You have already played this game once. We are happy to see that you enjoyed.
            If you have any suggestions 
            <Link to="#feedback">
                please feel free to share them here
            </Link>.
        </div>
    </div>)
}

export default AlreadyCompleted