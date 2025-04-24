import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../../../services/authService.js";

function EventsForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    categories: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
    }));
  };

  return <div>EventsForm</div>;
}

export default EventsForm;
