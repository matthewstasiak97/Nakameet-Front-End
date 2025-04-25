import React, { useState, useEffect } from "react";

function EventBar({ searchText = "" }) {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedEvent, setEditedEvent] = useState({ title: "", description: "", location: "" });

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch("http://localhost:3000/api");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Failed to load events:", err);
      }
    }
    loadEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/${id}`, { method: "DELETE" });
      setEvents(events.filter(evt => evt._id !== id));
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };

  const handleEdit = (event) => {
    setEditingId(event._id);
    setEditedEvent({ title: event.title, description: event.description, location: event.location });
  };

  const handleSave = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedEvent)
      });
      const updated = await res.json();
      setEvents(events.map(evt => evt._id === id ? updated : evt));
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update event:", err);
    }
  };

  const filteredEvents = events
    .filter((evt) => {
      return evt.title.toLowerCase().includes(searchText.toLowerCase());
    })
    .sort((a, b) => {
      return (
        a.title.toLowerCase().indexOf(searchText.toLowerCase()) -
        b.title.toLowerCase().indexOf(searchText.toLowerCase())
      );
    });

  return (
    <div className="event-bar">
      <ul>
        {filteredEvents.map((evt) => (
          <li key={evt._id}>
            {editingId === evt._id ? (
              <div>
                <input
                  type="text"
                  value={editedEvent.title}
                  onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
                />
                <input
                  type="text"
                  value={editedEvent.description}
                  onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })}
                />
                <input
                  type="text"
                  value={editedEvent.location}
                  onChange={(e) => setEditedEvent({ ...editedEvent, location: e.target.value })}
                />
                <button onClick={() => handleSave(evt._id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <h3>{evt.title}</h3>
                <p>{evt.description}</p>
                <p>
                  {new Date(evt.date_time).toLocaleString()} — {evt.location}
                </p>
                <button onClick={() => handleEdit(evt)}>Edit</button>
                <button onClick={() => handleDelete(evt._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventBar;
