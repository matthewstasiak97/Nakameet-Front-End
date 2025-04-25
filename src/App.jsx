import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useContext, useState } from "react";
//import { Routes, Route } from "react-router";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import SignInForm from "./components/SignInForm/SignInForm.jsx";
import Event from "./components/Events/CreateEvents.jsx";
import Home from "./components/home/home.jsx";
import Show from "./components/Show/Show.jsx";
import { UserContext } from "./contexts/UserContext";
import EventDetail from "./components/EventDetail/EventDetail.jsx";

const App = () => {
  // const { user } = useContext(UserContext);

  return (
    <>
      <div className="app">
        <NavBar />
        <div className="main-content">
          <Routes>
            <Route path="/events" element={<Home />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/events/:id" element={<EventDetail />} />
            {/* <Route path="/events/:id/edit" element={<EditEvent />} />
            <Route path="/events/:id/delete" element={<DeleteEvent />} />
            <Route path="/events/create" element={<CreateEvents />} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
