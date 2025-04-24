import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { showEvent, deleteEvent } from "../../services/eventService.js";
import { showEvent } from "../../services/eventService.js";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});

  useEffect(() => {
    const getEvent = async () => {
      try {
        const eventData = await showEvent(id);
        setEvent(eventData);
      } catch (error) {
        console.error("Error loading event:", error);
      }
    };

    getEvent();
  }, [id]);

  const handleEdit = () => {
    navigate(`/events/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await deleteEvent(id);
      navigate("/events"); // Redirect back to events list after deletion
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div>
      <h3>Title: {event.title}</h3>
      <h4>Description: {event.description}</h4>
      <h4>Date: {event.date}</h4>
      <h4>Time: {event.time}</h4>
      <h4>Location: {event.location}</h4>
      <h4>Categories: {event.categories}</h4>

      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default EventDetail;
