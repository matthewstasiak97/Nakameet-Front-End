import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  showEvent,
  deleteEvent,
  updateEvent,
  createEvent,
} from "../../services/eventService.js";
import { UserContext } from "../../contexts/UserContext";
import "../Events/CreateEvents.css";

// Predefined categories for the dropdown
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
  { id: "other", name: "Other" },
];

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormMode, setIsFormMode] = useState(!id);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date_time: "",
    location: "",
    category: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const getEvent = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const eventData = await showEvent(id);

        if (!eventData) {
          throw new Error("Event not found");
        }

        setEvent(eventData);

        const dateTime = eventData.date_time
          ? new Date(eventData.date_time)
          : new Date();
        const formattedDate = dateTime.toISOString().slice(0, 16);

        setFormData({
          title: eventData.title || "",
          description: eventData.description || "",
          date_time: formattedDate,
          location: eventData.location || "",
          category: eventData.category || "",
        });
        setError(null);
      } catch (error) {
        console.error("Error loading event:", error);
        setError("Failed to load event details");
        navigate("/events");
      } finally {
        setLoading(false);
      }
    };

    getEvent();
  }, [id, navigate]);

  const handleEdit = () => {
    setIsFormMode(true);
  };

  const handleCancel = () => {
    if (!id) {
      navigate("/events");
      return;
    }

    setIsFormMode(false);
    const dateTime = event.date_time ? new Date(event.date_time) : new Date();
    const formattedDate = dateTime.toISOString().slice(0, 16);

    setFormData({
      title: event.title || "",
      description: event.description || "",
      date_time: formattedDate,
      location: event.location || "",
      category: event.category || "",
    });
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();

    try {
      if (!user) {
        setError("Please sign in to create or edit an event");
        return;
      }

      if (
        !formData.title ||
        !formData.description ||
        !formData.location ||
        !formData.date_time ||
        !formData.category
      ) {
        setError("Please fill in all required fields");
        return;
      }

      setLoading(true);
      const dateTime = new Date(formData.date_time).toISOString();

      const eventData = {
        ...formData,
        date_time: dateTime,
        user_id: user._id,
      };

      let savedEvent;
      if (id) {
        const response = await updateEvent(eventData, id);
        if (!response) {
          throw new Error("Failed to update event");
        }
        if (response.error) {
          throw new Error(response.error);
        }
        savedEvent = response;
      } else {
        const response = await createEvent(eventData);
        if (!response) {
          throw new Error("Failed to create event");
        }
        if (response.error) {
          throw new Error(response.error);
        }
        savedEvent = response;
      }

      setEvent(savedEvent);
      setIsFormMode(false);
      setError(null);

      // Navigate back to events list after successful save
      navigate("/events");
    } catch (error) {
      console.error("Error saving event:", error);
      setError(
        error.message ||
          `Failed to ${id ? "update" : "create"} event. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        setIsDeleting(true);
        const result = await deleteEvent(id);
        // Parse the response if needed
        const parsedResult =
          typeof result === "string" ? JSON.parse(result) : result;
        if (parsedResult && !parsedResult.error) {
          navigate("/events");
        } else {
          throw new Error(parsedResult.error || "Failed to delete event");
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        setError("Failed to delete event");
        setIsDeleting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!user) {
    return (
      <div className="create-event-container">
        <div className="create-event-form">
          <h2>Please sign in to view or edit events</h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="create-event-container">
        <div className="create-event-form">
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="create-event-container">
        <div className="create-event-form">
          <div className="error-container">
            <p className="error-message">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isFormMode) {
    return (
      <div className="create-event-container">
        <div className="create-event-form">
          <h2>{id ? "Edit Event" : "Create New Event"}</h2>
          {error && (
            <div className="error-container">
              <p className="error-message">{error}</p>
            </div>
          )}
          <form onSubmit={handleSave}>
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
                {CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="button-group">
              <button type="submit" className="submit-button">
                {id ? "Save Changes" : "Create Event"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="create-event-container">
      <div className="create-event-form">
        <div className="event-detail-header">
          <h2>Event Details</h2>
          <div
            className="button-group"
            style={{ margin: 0, justifyContent: "flex-end" }}
          >
            <button
              onClick={handleEdit}
              className="edit-button"
              style={{ minWidth: "100px" }}
            >
              Edit Event
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="delete-button"
              style={{ minWidth: "100px" }}
            >
              {isDeleting ? "Deleting..." : "Delete Event"}
            </button>
          </div>
        </div>

        <div className="event-detail-content">
          <div className="detail-group">
            <label>Event Title</label>
            <p className="detail-value">{event?.title}</p>
          </div>

          <div className="detail-group">
            <label>Description</label>
            <p className="detail-value">{event?.description}</p>
          </div>

          <div className="detail-group grid">
            <div>
              <label>Date and Time</label>
              <p className="detail-value">
                {event?.date_time
                  ? formatDate(event.date_time)
                  : "Not specified"}
              </p>
            </div>

            <div>
              <label>Location</label>
              <p className="detail-value">
                {event?.location || "Not specified"}
              </p>
            </div>
          </div>

          <div className="detail-group">
            <label>Category</label>
            <p className="detail-value">
              {event?.category
                ? CATEGORIES.find((c) => c.id === event.category)?.name ||
                  event.category
                : "Not specified"}
            </p>
          </div>

          <div className="detail-group">
            <label>Created By</label>
            <p className="detail-value">{event?.user_id || "Unknown"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
