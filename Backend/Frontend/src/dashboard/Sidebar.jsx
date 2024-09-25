import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CiMenuBurger } from "react-icons/ci";

function Sidebar({ setComponent }) {
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  if (!isAuthenticated) {
    return <div>Please log in to see your profile.</div>;
  }

  const handleLogout = async () => {
    try {
      await axios.post("/api/user/logout", { withCredentials: true });
      setIsAuthenticated(false);
      toast.success("Logged out successfully.");
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  const user = profile.user || {};

  return (
    <div>
      {/* Menu icon for small screens */}
      <div
        className="sm:hidden fixed top-4 left-4 z-50"
        onClick={() => setShow(!show)}
      >
        <CiMenuBurger className="text-2xl" />
      </div>

      {/* Sidebar */}
      <div
        className={`${
          show ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 duration-300 w-64 h-full fixed shadow-lg bg-gray-100 p-4`}
      >
        <div className="w-24 h-24 rounded-full mx-auto mb-2">
          {user.photo && (
            <img
              src={user.photo.url}
              alt="Profile"
              className="w-full h-full rounded-full"
            />
          )}
        </div>
        <h2 className="text-xl font-bold mb-4 text-center">{user?.name}</h2>
        <ul className="space-y-5">
          {["My Blogs", "Create Blog", "My Profile"].map((component) => (
            <li key={component}>
              <button
                onClick={() => setComponent(component)}
                className="w-full px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-purple-400 transition"
              >
                {component}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => navigate("/")}
              className="w-full px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-blue-400 transition"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-purple-400 transition"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Overlay to close the sidebar when clicking outside on mobile */}
      {show && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 sm:hidden"
          onClick={() => setShow(false)}
        ></div>
      )}

      {/* Main content area */}
      <div className={`flex-grow ml-64 p-4 ${show ? 'hidden' : 'block'}`}>
        {/* Render your main content here */}
      </div>
    </div>
  );
}

export default Sidebar;
