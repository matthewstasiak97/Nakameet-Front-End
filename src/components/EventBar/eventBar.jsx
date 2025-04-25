import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Get the backend URL from environment variables
const BACKEND_URL = import.meta.env.VITE_BACK_END_SERVER_URL || "http://localhost:3000";

const CATEGORIES = {
  music: "Music",
  sports: "Sports",
  food: "Food & Drink",
  arts: "Arts & Culture",
  community: "Community",
  nightlife: "Nightlife",
  games: "Games",
  education: "Education",
  health: "Health & Wellness",
  outdoors: "Outdoors & Adventure",
  tech: "Technology",
  fashion: "Fashion",
  business: "Business & Networking",
  science: "Science & Innovation",
  travel: "Travel",
  dating: "Dating",
  other: "Other"
};

function EventBar({ searchText = "" }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/events`);
        if (!res.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await res.json();
        setEvents(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredEvents = events
    .filter((evt) => {
      const searchLower = searchText.toLowerCase();
      return (
        evt.title?.toLowerCase().includes(searchLower) ||
        evt.description?.toLowerCase().includes(searchLower) ||
        evt.location?.toLowerCase().includes(searchLower) ||
        CATEGORIES[evt.category_id]?.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => new Date(b.date_time) - new Date(a.date_time));

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg text-gray-600 animate-pulse">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg text-red-600 bg-red-50 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  if (filteredEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="text-lg text-gray-600 mb-4">
          {searchText ? "No events found matching your search." : "No events found."}
        </p>
        <Link to="/events/new">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-500 transition-colors duration-200">
            Create an Event
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredEvents.map((evt) => (
        <Link to={`/events/${evt._id}`} key={evt._id} className="block">
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{evt.title}</h3>
                <span className="px-2 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full">
                  {CATEGORIES[evt.category_id] || evt.category_id}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{evt.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(evt.date_time)}
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {evt.location}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default EventBar;
