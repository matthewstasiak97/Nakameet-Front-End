const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/events`;

const index = async () => {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const showEvent = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const createEvent = async (formData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateEvent = async (formData, id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const deleteEvent = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default { index, showEvent, createEvent, updateEvent, deleteEvent };
