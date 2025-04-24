import React, { useState, useEffect } from "react";

function EventBar({ searchText }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch("http://localhost:3000/events"); //change this to use the .env
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Failed to load events:", err);
      }
    }
    loadEvents();
  }, []);
  // const filteredEvents = events.filter(evt =>
  //   evt.title.toLowerCase().includes(searchText.toLowerCase())
  // );

  return (
    <div className="event-bar">
      <ul>
        {filteredEvents.map((evt) => (
          <li key={evt._id}>
            <h3>{evt.title}</h3>
            <p>{evt.description}</p>
            <p>
              {new Date(evt.date_time).toLocaleString()} — {evt.location}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventBar;
