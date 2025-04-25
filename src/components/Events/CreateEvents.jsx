import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { createEvent } from "../../services/eventService.js";
import "./CreateEvents.css";

const CATEGORIES = [
  { id: "music", name: "Music" },
  { id: "sports", name: "Sports" },
  { id: "food", name: "Food & Drink" },
  { id: "arts", name: "Arts & Culture" },
  { id: "community", name: "Community" },
  { id: "nightlife", name: "Nightlife" },
  { id: "games", name: "Games" },
  { id: "education", name: "Education" },
  { id: "health", name: "Health & Wellness" },
  { id: "outdoors", name: "Outdoors & Adventure" },
  { id: "tech", name: "Technology" },
  { id: "fashion", name: "Fashion" },
  { id: "business", name: "Business & Networking" },
  { id: "science", name: "Science & Innovation" },
  { id: "travel", name: "Travel" },
  { id: "dating", name: "Dating" },
  { id: "other", name: "Other" }
];

const CreateEvents = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date_time: "",
    category: ""
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (!user) {
        setError("Please sign in to create an event");
        return;
      }

      if (!formData.date_time) {
        setError("Please select a date and time for the event");
        return;
      }

      const dateTime = new Date(formData.date_time).toISOString();

      const eventData = {
        ...formData,
        date_time: dateTime,
        user_id: user._id
      };

      await createEvent(eventData);
      navigate("/events");
    } catch (err) {
      console.error("Error creating event:", err);
      setError(err.response?.data?.message || err.message || "Failed to create event. Please try again.");
    } finally {
      setIsSubmitting(false);
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
            autoComplete="off"
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
            autoComplete="off"
          />
        </div>

        <div className="form-group grid">
          <div>
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

          <div>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter event location"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {CATEGORIES.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvents;
