import React from "react";
import { Router } from "react-router";
import { useState } from "react";
import EventBar from "../EventBar/eventBar";
import SearchBar from "../SearchBar/searchBar";
import { Link } from "react-router-dom";

function Home() {
  const [searchText, setSearchText] = useState("");
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <Link to="/events/new">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition-colors duration-200">
            Add Event
          </button>
        </Link>
      </div>
      
      <div className="mb-8">
        <SearchBar value={searchText} onSearchChange={setSearchText} />
      </div>
      
      <EventBar searchText={searchText} />
    </div>
  );
}

export default Home;
