import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { showEvent, deleteEvent, updateEvent } from "../../services/eventService.js";
import "./EventDetail.css";

// Predefined categories for the dropdown
const CATEGORIES = [
  "Music",
  "Sports",
  "Food & Drink",
  "Arts & Culture",
  "Technology",
  "Business",
  "Education",
  "Entertainment",
  "Health & Wellness",
  "Community",
  "Other"
];

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({
    title: "",
    description: "",
    date_time: "",
    location: "",
    categories: ""
  });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const getEvent = async () => {
      try {
        setLoading(true);
        const eventData = await showEvent(id);
        setEvent(eventData);
        
        // Format date for input
        const dateTime = eventData.date_time ? new Date(eventData.date_time) : new Date();
        const formattedDate = dateTime.toISOString().slice(0, 16);
        
        setEditedEvent({
          title: eventData.title || "",
          description: eventData.description || "",
          date_time: formattedDate,
          location: eventData.location || "",
          categories: eventData.categories || ""
        });
        setError(null);
      } catch (error) {
        console.error("Error loading event:", error);
        setError("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    getEvent();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    
    // Reset edited event to original values
    const dateTime = event.date_time ? new Date(event.date_time) : new Date();
    const formattedDate = dateTime.toISOString().slice(0, 16);
    
    setEditedEvent({
      title: event.title || "",
      description: event.description || "",
      date_time: formattedDate,
      location: event.location || "",
      categories: event.categories || ""
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updatedEvent = await updateEvent(editedEvent, id);
      setEvent(updatedEvent);
      setIsEditing(false);
      setError(null);
    } catch (error) {
      console.error("Error updating event:", error);
      setError("Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        setIsDeleting(true);
        await deleteEvent(id);
        navigate("/events");
      } catch (error) {
        console.error("Error deleting event:", error);
        setError("Failed to delete event");
        setIsDeleting(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({
      ...editedEvent,
      [name]: value
    });
  };

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

  if (loading) {
    return <div className="event-detail loading">Loading event details...</div>;
  }

  if (error) {
    return <div className="event-detail error">{error}</div>;
  }

  if (!event) {
    return <div className="event-detail error">Event not found</div>;
  }

  return (
    <div className="event-detail">
      <div className="event-header">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              name="title"
              value={editedEvent.title}
              onChange={handleInputChange}
              className="edit-input title-input"
              placeholder="Event Title"
            />
            <div className="edit-actions">
              <button className="save-btn" onClick={handleSave}>Save Changes</button>
              <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <h1>{event.title}</h1>
            <div className="event-actions">
              <button className="edit-btn" onClick={handleEdit}>Edit Event</button>
              <button className="delete-btn" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete Event"}
              </button>
            </div>
          </>
        )}
      </div>

      <div className="event-content">
        <div className="event-info">
          <div className="info-group">
            <h3>Description</h3>
            {isEditing ? (
              <textarea
                name="description"
                value={editedEvent.description}
                onChange={handleInputChange}
                className="edit-textarea"
                placeholder="Event Description"
              />
            ) : (
              <p>{event.description}</p>
            )}
          </div>

          <div className="info-group">
            <h3>Date & Time</h3>
            {isEditing ? (
              <input
                type="datetime-local"
                name="date_time"
                value={editedEvent.date_time}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <p>{formatDate(event.date_time)}</p>
            )}
          </div>

          <div className="info-group">
            <h3>Location</h3>
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={editedEvent.location}
                onChange={handleInputChange}
                className="edit-input"
                placeholder="Event Location"
              />
            ) : (
              <p>{event.location}</p>
            )}
          </div>

          <div className="info-group">
            <h3>Categories</h3>
            {isEditing ? (
              <select
                name="categories"
                value={editedEvent.categories}
                onChange={handleInputChange}
                className="edit-select"
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            ) : (
              <div className="categories">
                {Array.isArray(event.categories) 
                  ? event.categories.map((category, index) => (
                      <span key={index} className="category-tag">{category}</span>
                    ))
                  : <span className="category-tag">{event.categories}</span>
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
