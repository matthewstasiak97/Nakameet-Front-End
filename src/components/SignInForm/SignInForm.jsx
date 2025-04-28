import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../services/userService.js";
import { UserContext } from "../../contexts/UserContext.jsx";
import "./SignInForm.css";

export default function SignInForm() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await signIn(formData);
      setUser(user);
      navigate("/");
    } catch (err) {
      console.error("Sign-in failed:", err);
    }
  }

  return (
    <main className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-orange-200">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form autoComplete="off" onSubmit={handleSubmit} className="space-y-6">
          <div className="px-3 flex flex-col items-start">
            <label
              htmlFor="username"
              className="ml-3 text-left text-sm/6 font-medium text-orange-200"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900
                         outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400
                         focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>

          <div className="px-3 flex flex-col items-start">
            <div className="w-full flex items-center justify-between">
              <label
                htmlFor="password"
                className="ml-3 text-left text-sm/6 font-medium text-orange-200"
              >
                Password
              </label>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900
                         outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400
                         focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>

          <div className="px-3">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5
                         text-sm/6 font-semibold text-orange-200 shadow-xs hover:bg-indigo-500
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
