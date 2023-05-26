import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import Auth from "./components/auth"
import Game from "./components/game"
import NotFound from "./components/notfound"
import AlreadyCompleted from "./components/alreadycompleted"
import Landing from "./components/landing"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/auth" element={<Auth />} />
        <Route exact path="/game" element={<Game />} />
        <Route exact path="/404" element={<NotFound />} />
        <Route exact path="/completed" element={<AlreadyCompleted />} />
        <Route exact path="*" element={<Navigate to="/404" />} />
        <Route exact path="/" element={<Landing />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;