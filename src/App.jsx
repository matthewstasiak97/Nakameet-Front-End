import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useContext, useState } from "react";
//import { Routes, Route } from "react-router";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import SignInForm from "./components/SignInForm/SignInForm.jsx";
import CreateEvents from "./components/Events/CreateEvents.jsx";
import Home from "./components/home/home.jsx";
import Show from "./components/Show/Show.jsx";
import { UserContext } from "./contexts/UserContext";
import EventDetail from "./components/EventDetail/EventDetail.jsx";

const App = () => {
  return (
    <>
      <div className="app">
        <NavBar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/events" replace />} />
            <Route path="/events" element={<Home />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/events/new" element={<CreateEvents />} />
            <Route path="/events/:id" element={<EventDetail />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
