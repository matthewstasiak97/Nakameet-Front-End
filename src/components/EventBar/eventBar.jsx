import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./EventBar.css"; // << Make sure you import your EventBar-specific CSS here

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
        CATEGORIES[evt.category]?.toLowerCase().includes(searchLower)
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
    <div className="event-card-container">
      {filteredEvents.map((evt) => (
        <Link to={`/events/${evt._id}`} key={evt._id} className="event-card-link">
          <div className="event-card">
            <div className="event-card-content">
              <div className="event-card-header">
                <h3 className="event-card-title">{evt.title}</h3>
                <span className="event-card-category">
                  {CATEGORIES[evt.category] || evt.category}
                </span>
              </div>

              <p className="event-card-description">
                {evt.description}
              </p>

              <div className="event-card-footer">
                <div>{formatDate(evt.date_time)}</div>
                <div>{evt.location}</div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default EventBar;
