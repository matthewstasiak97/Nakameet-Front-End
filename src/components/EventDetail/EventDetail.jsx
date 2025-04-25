import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { showEvent, deleteEvent } from "../../services/eventService.js";
import "./EventDetail.css";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEvent = async () => {
      try {
        setLoading(true);
        const eventData = await showEvent(id);
        setEvent(eventData);
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
    navigate(`/events/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(id);
        navigate("/events");
      } catch (error) {
        console.error("Error deleting event:", error);
        setError("Failed to delete event");
      }
    }
  };

  if (loading) {
    return <div className="event-detail loading">Loading...</div>;
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
        <h1>{event.title}</h1>
        <div className="event-actions">
          <button className="edit-btn" onClick={handleEdit}>Edit Event</button>
          <button className="delete-btn" onClick={handleDelete}>Delete Event</button>
        </div>
      </div>

      <div className="event-content">
        <div className="event-info">
          <div className="info-group">
            <h3>Description</h3>
            <p>{event.description}</p>
          </div>

          <div className="info-group">
            <h3>Date & Time</h3>
            <p>{new Date(event.date_time).toLocaleString()}</p>
          </div>

          <div className="info-group">
            <h3>Location</h3>
            <p>{event.location}</p>
          </div>

          {event.categories && (
            <div className="info-group">
              <h3>Categories</h3>
              <div className="categories">
                {Array.isArray(event.categories) 
                  ? event.categories.map((category, index) => (
                      <span key={index} className="category-tag">{category}</span>
                    ))
                  : <span className="category-tag">{event.categories}</span>
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
