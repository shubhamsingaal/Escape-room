import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Game from "./components/game";
import NotFound from "./components/notfound";
import Landing from "./components/landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/auth/login" element={<Login />} />
        <Route exact path="/auth/signup" element={<Signup />} />
        <Route exact path="/game" element={<Game />} />
        <Route exact path="/404" element={<NotFound />}/>
        <Route exact path="*" element={<Navigate to="/404" />} />
        <Route exact path="/" element={<Landing />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;