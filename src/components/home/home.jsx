import React from "react";
import { Router } from "react-router";
import { useState } from "react";
import EventBar from "../EventBar/eventBar";
import SearchBar from "../SearchBar/searchBar";

function Home() {
  const [searchText, setSearchText] = useState("");
  return (
    <div>
      home
      <SearchBar value={searchText} onSearchChange={setSearchText} />
      <EventBar searchText={searchText} />
    </div>
  );
}

export default Home;
