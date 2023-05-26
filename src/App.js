import logo from '.';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Rules } from "./components/Rules";
import { About } from "./components/About";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Rules />
      <About />
      <Footer />
    </div>
  );
}

export default App;
