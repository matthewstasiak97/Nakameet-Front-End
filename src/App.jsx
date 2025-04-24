import { BrowserRouter as Routes, Route } from "react-router-dom";
// import { useContext, useState } from "react";
//import { Routes, Route } from "react-router";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import SignInForm from "./components/SignInForm/SignInForm.jsx";
import Show from "./components/Show/Show.jsx";
import { UserContext } from "./contexts/UserContext";

const App = () => {
  // const { user } = useContext(UserContext);

  return (
    <div className="app">
      <NavBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<h1>Welcome to Nakameet</h1>} />
          <Route path="/events" element={<h1>Events Page</h1>} />
          <Route path="/signup" element={<h1>Sign Up Page</h1>} />
          <Route path="/signin" element={<h1>Sign In Page</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
