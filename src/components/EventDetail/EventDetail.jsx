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
  const [isFormMode, setIsFormMode] = useState(!id); // true if adding new event, false if viewing
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
      // If adding new event, navigate back to events list
      navigate("/events");
      return;
    }
    
    setIsFormMode(false);
    // Reset form data to original values
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
        // Update existing event
        savedEvent = await updateEvent(formData, id);
      } else {
        // Create new event
        savedEvent = await createEvent(formData);
      }
      
      setEvent(savedEvent);
      setIsFormMode(false);
      setError(null);
      
      if (!id) {
        // If we just created a new event, navigate to its detail page
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
    setFormData({
      ...formData,
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading event details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  if (!event && id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Event not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="flex items-center justify-between">
            {isFormMode ? (
              <div className="w-full">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="block w-full rounded-md px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Event Title"
                />
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    onClick={handleSave}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {id ? 'Save Changes' : 'Create Event'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">{event.title}</h1>
                <div className="flex space-x-4">
                  <button
                    onClick={handleEdit}
                    className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Edit Event
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50"
                  >
                    {isDeleting ? "Deleting..." : "Delete Event"}
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
              {isFormMode ? (
                <div className="mt-2">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="block w-full rounded-md px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Event Description"
                  />
                </div>
              ) : (
                <p className="mt-2 text-sm text-gray-600">{event.description}</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">Date & Time</label>
              {isFormMode ? (
                <div className="mt-2">
                  <input
                    type="datetime-local"
                    name="date_time"
                    value={formData.date_time}
                    onChange={handleInputChange}
                    className="block w-full rounded-md px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              ) : (
                <p className="mt-2 text-sm text-gray-600">{formatDate(event.date_time)}</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">Location</label>
              {isFormMode ? (
                <div className="mt-2">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="block w-full rounded-md px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Event Location"
                  />
                </div>
              ) : (
                <p className="mt-2 text-sm text-gray-600">{event.location}</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">Category</label>
              {isFormMode ? (
                <div className="mt-2">
                  <select
                    name="categories"
                    value={formData.categories}
                    onChange={handleInputChange}
                    className="block w-full rounded-md px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <p className="mt-2 text-sm text-gray-600">{event.categories}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
