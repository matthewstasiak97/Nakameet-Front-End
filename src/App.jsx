import { useState } from "react";
import { Router } from "react-router";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/home/home";


const App = () => {
  return (
  <>
  <NavBar/>
  <Home/>
  </>
  )
};

export default App;
