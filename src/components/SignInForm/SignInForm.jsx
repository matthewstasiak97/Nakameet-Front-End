import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // react-router-dom!
import { signIn } from "../../services/authService.js";
import { UserContext } from "../../contexts/UserContext.jsx";
export default function SignInForm() {
  const { setUser } = useContext(UserContext); // pass your context
  const navigate = useNavigate(); // get navigate fn
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser); // put user into context
      navigate("/"); // redirect after success
    } catch (err) {
      console.error("Sign-in failed:", err);
      // TODO: surface an error message in the UI
    }
  }
  return (
    <main>
      <h1>Sign In</h1>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="off"
            required
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Sign In</button>
        </div>
      </form>
    </main>
  );
}
