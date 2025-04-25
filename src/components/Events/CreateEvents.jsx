import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { createEvent } from "../../services/eventService.js";
//import "./CreateEvents.css";

const CreateEvents = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date_time: "",
    category_id: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        setError("Please sign in to create an event");
        return;
      }

      // Make sure we have a valid date
      if (!formData.date_time) {
        setError("Please select a date and time for the event");
        return;
      }

      // Create a proper ISO string for the date
      const dateTime = new Date(formData.date_time).toISOString();

      const eventData = {
        ...formData,
        date_time: dateTime,
        user_id: user._id,
      };

      console.log("Submitting event data:", eventData);
      await createEvent(eventData);
      navigate("/events");
    } catch (err) {
      console.error("Error creating event:", err);
      setError(err.message || "Failed to create event. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="create-event-container">
        <h2>Please sign in to create an event</h2>
      </div>
    );
  }

  return (
    <div className="create-event-container">
      <h2>Create New Event</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="create-event-form">
        <div className="form-group">
          <label htmlFor="title">Event Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter event title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Describe your event"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Enter event location"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date_time">Date and Time:</label>
          <input
            type="datetime-local"
            id="date_time"
            name="date_time"
            value={formData.date_time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category_id">Category:</label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="music">Music</option>
            <option value="sports">Sports</option>
            <option value="food">Food & Drink</option>
            <option value="arts">Arts & Culture</option>
            <option value="community">Community</option>
            <option value="nightlife">Nightlife</option>
            <option value="other">Other</option>
            <option value="games">Games</option>
            <option value="education">Education</option>
            <option value="health">Health & Wellness</option>
            <option value="outdoors">Outdoors & Adventure</option>
            <option value="tech">Technology</option>
            <option value="fashion">Fashion</option>
            <option value="business">Business & Networking</option>
            <option value="science">Science & Innovation</option>
            <option value="food">Food & Drink</option>
            <option value="fashion">Fashion</option>
            <option value="travel">Travel</option>
            <option value="dating">Dating</option>

            
          </select>
        </div>

        <button type="submit" className="submit-button">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvents;
