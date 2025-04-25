import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import EventBar from "../EventBar/eventBar";
import SearchBar from "../SearchBar/searchBar";

function Home() {
  const [searchText, setSearchText] = useState("");

  return (
    <div>
      <h1>Home</h1>
      <Link to="/events/new">
        <button>Add Event</button>
      </Link>

      <SearchBar value={searchText} onSearchChange={setSearchText} />
      <EventBar searchText={searchText} />
    </div>
  );
}

export default Home;