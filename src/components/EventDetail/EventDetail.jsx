import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { showEvent, deleteEvent, updateEvent, createEvent } from "../../services/eventService.js";

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
  const [isFormMode, setIsFormMode] = useState(!id);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date_time: new Date().toISOString().slice(0, 16),
    location: "",
    categories: ""
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
        setEvent(eventData);
        
        // Format date for input
        const dateTime = eventData.date_time ? new Date(eventData.date_time) : new Date();
        const formattedDate = dateTime.toISOString().slice(0, 16);
        
        setFormData({
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
      categories: event.categories || ""
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      let savedEvent;
      
      if (id) {
        savedEvent = await updateEvent(formData, id);
      } else {
        savedEvent = await createEvent(formData);
      }
      
      setEvent(savedEvent);
      setIsFormMode(false);
      setError(null);
      
      if (!id) {
        navigate(`/events/${savedEvent.id}`);
      }
    } catch (error) {
      console.error("Error saving event:", error);
      setError(`Failed to ${id ? 'update' : 'create'} event`);
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-red-600 bg-red-50 p-4 rounded-lg shadow">{error}</div>
      </div>
    );
  }

  const formContent = (
    <div className="space-y-8">
      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
            Event Title
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all duration-200 ease-in-out hover:ring-gray-400"
              placeholder="Enter event title"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
            Description
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all duration-200 ease-in-out hover:ring-gray-400"
              placeholder="Describe your event"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="date_time" className="block text-sm font-medium leading-6 text-gray-900">
              Date & Time
            </label>
            <div className="mt-2">
              <input
                type="datetime-local"
                id="date_time"
                name="date_time"
                value={formData.date_time}
                onChange={handleInputChange}
                className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all duration-200 ease-in-out hover:ring-gray-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
              Location
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all duration-200 ease-in-out hover:ring-gray-400"
                placeholder="Event location"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="categories" className="block text-sm font-medium leading-6 text-gray-900">
            Category
          </label>
          <div className="mt-2">
            <select
              id="categories"
              name="categories"
              value={formData.categories}
              onChange={handleInputChange}
              className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all duration-200 ease-in-out hover:ring-gray-400"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={handleCancel}
          className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all duration-200 ease-in-out"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 ease-in-out"
        >
          {id ? 'Save Changes' : 'Create Event'}
        </button>
      </div>
    </div>
  );

  const viewContent = event && (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{event.title}</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleEdit}
            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 ease-in-out"
          >
            Edit Event
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50 transition-all duration-200 ease-in-out"
          >
            {isDeleting ? "Deleting..." : "Delete Event"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium leading-6 text-gray-900">Description</h3>
          <p className="mt-2 text-sm text-gray-600">{event.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium leading-6 text-gray-900">Date & Time</h3>
            <p className="mt-2 text-sm text-gray-600">{formatDate(event.date_time)}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium leading-6 text-gray-900">Location</h3>
            <p className="mt-2 text-sm text-gray-600">{event.location}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium leading-6 text-gray-900">Category</h3>
          <p className="mt-2 text-sm text-gray-600">{event.categories}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          {isFormMode ? formContent : viewContent}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
