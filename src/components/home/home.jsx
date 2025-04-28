import React, { useState } from "react";
import { Link } from "react-router-dom";
import EventBar from "../EventBar/eventBar";
import SearchBar from "../SearchBar/searchBar";
import "./Home.css";  // <-- Correctly imported CSS

function Home() {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="container">
      <div className="header">
        <h1 className="header-title">Events</h1> {/* <-- ADDED className */}
        <Link to="/events/new">
          <button className="create-event-button">Create Event</button>
        </Link>
      </div>

      <div className="search-bar-wrapper">
        <SearchBar value={searchText} onSearchChange={setSearchText} />
      </div>

      <div className="event-bar-wrapper">
        <EventBar searchText={searchText} />
      </div>
    </div>
  );
}

export default Home;
