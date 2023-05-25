import React from "react";
import { Link } from "react-router-dom";
import "../styles/notfound.css";

function NotFound() {
  document.title =  "404 | Not Found"
  return (
    <div className="coverDiv">
      <div className="flexRow">
        <div className="bold"> 404 </div>
        <div className="message">
          <h2>
            This page could not be found. Go back
            <Link className="link" to="/">
              home
            </Link>
            .
          </h2>
        </div>
        <div>&copy; ISTE Students' Chapter NIT Durgapur</div>
      </div>
    </div>
  );
}

export default NotFound;
