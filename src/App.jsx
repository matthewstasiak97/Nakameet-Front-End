import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <div className="main-content">
        <h1>Nakameet</h1>
      </div>
    </div>
  );
};

export default App;
