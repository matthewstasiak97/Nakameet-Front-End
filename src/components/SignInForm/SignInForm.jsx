import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../services/userService.js";
import { UserContext } from "../../contexts/UserContext.jsx";
import "./SignInForm.css"; // We'll still use this for general styles

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
      // TODO: surface an error message in the UI
    }
  }

  return (
    <main className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      
      {/* Welcome Section */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <h1 className="welcome-title">Welcome to Nakameet</h1>
        <p className="welcome-subtitle">Your friendly meetup app for nearby friends ✨</p>
      </div>

      {/* Sign In Heading */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-orange-200">
          Sign in to your account
        </h2>
      </div>

      {/* Form */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form autoComplete="off" onSubmit={handleSubmit} className="space-y-6">

          {/* Username Field */}
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

          {/* Password Field */}
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

          {/* Submit Button */}
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

      {/* --- Custom Animations --- */}
      <style jsx="true">{`
        @keyframes fadeSlideIn {
          0% {
            opacity: 0;
            transform: translateY(-30px) scale(0.9);
          }
          50% {
            opacity: 1;
            transform: translateY(10px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .welcome-title {
          font-size: 2.5rem;
          font-weight: 900;
          background: linear-gradient(90deg, #6366f1, #3b82f6);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          letter-spacing: -0.5px;
          animation: fadeSlideIn 2s ease-out forwards;
        }

        .welcome-subtitle {
          margin-top: 0.5rem;
          font-size: 1.1rem;
          font-weight: 500;
          color: #6b7280;
          animation: fadeSlideIn 2.5s ease-out forwards;
        }
      `}</style>

    </main>
  );
}
