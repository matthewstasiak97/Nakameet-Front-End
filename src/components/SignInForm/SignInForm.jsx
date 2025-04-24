import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { signIn } from "../../services/authService.js";

const SignInForm = () => {
  const { setUser } = useContext();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signedInUser = await signIn(formData);

    setUser(signedInUser);
  };

  return (
    <main>
      <h1>Sign In</h1>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            autoComplete="off"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Link to="/">
            <button type="submit">Sign In</button>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default SignInForm;
