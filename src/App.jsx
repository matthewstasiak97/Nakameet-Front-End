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
          <Route path="/events" element={<Events />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path= "/signout" element={<SignOutForm />} />
          {/* <Route path="/events/create" element={<CreateEvents />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/:id/edit" element={<EditEvent />} />
          <Route path="/events/:id/delete" element={<DeleteEvent />} /> */}
      
        </Routes>
      </div>
    </div>
  );
};

export default App;
