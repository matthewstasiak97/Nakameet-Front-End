
jsx
Copy
Edit
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { showEvent } from "../../services/eventService.js"; // You’ll need to implement this function

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});

  useEffect(() => {
    const getEvent = async () => {
      const eventData = await showEvent(id);
      setEvent(eventData);
    };
    getEvent();
  }, [id]);

  const handleEdit = () => {
    navigate(`/events/edit/${id}`);
  };

  const handleDelete = () => {
    
  };

  return (
    <>
      <h3>Title: {event.title}</h3>
      <h4>Description: {event.description}</h4>
      <h4>Date: {event.date}</h4>
      <h4>Time: {event.time}</h4>
      <h4>Location: {event.location}</h4>
      <h4>Categories: {event.categories}</h4>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default EventDetail;