import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import EventDetail from "../src/services/eventService";

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<h1>Welcome to Nakameet</h1>} />
          <Route path="/events" element={<h1>Events Page</h1>} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/signup" element={<h1>Sign Up Page</h1>} />
          <Route path="/signin" element={<h1>Sign In Page</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
