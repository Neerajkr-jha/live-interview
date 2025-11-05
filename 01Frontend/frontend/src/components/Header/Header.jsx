import React, { Fragment } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";

// Make sure this path is correct for your project structure
import Logo from "../../assets/logoix.png";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://backend-for-interview-prep.onrender.com/api/users/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // This is essential. It tells the browser to send cookies to the backend.
          // Your backend needs the cookies to identify the user and clear the session.
          credentials: "include",
        }
      );

      if (!response.ok) {
        // Handle cases where the server fails to log out the user
        throw new Error("Logout failed. Please try again.");
      }

      // If the API call is successful, the backend has cleared the auth cookies.
      console.log("User logged out successfully from the backend.");

      // Redirect the user to the login page.
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
      // Optionally, inform the user that the logout failed.
      alert(error.message);
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-40 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Left Side: Branding & Navigation */}
        <div className="flex items-center gap-8">
          <Link to="/select" className="flex items-center gap-3">
            <img src={Logo} alt="IntervuX Logo" className="h-9" />
            <span className="text-xl font-bold text-gray-800">IntervuX</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-gray-900 font-medium transition"
            >
              Dashboard
            </Link>
            <Link
              to="/history"
              className="text-gray-600 hover:text-gray-900 font-medium transition"
            >
              Interview History
            </Link>
          </nav>
        </div>

        {/* {location.pathname === "/home" || location.pathname === "/login" ? ( */}
          {location.pathname === "/home" || location.pathname === "/login" || location.pathname === "/" ? (
          // ✅ Show Sign Up button on home & login
          <Link
            to="/signup"
            className="px-4 py-2 rounded-md bg-purple-500 text-white font-medium hover:bg-purple-700 transition"
          >
            Sign Up
          </Link>
        ) : location.pathname === "/signup" ? (
          // ✅ Show Log In button on signup
          <Link
            to="/login"
            className="px-4 py-2 rounded-md bg-purple-500 text-white font-medium hover:bg-purple-700 transition"
          >
            Log In
          </Link>
        ) : (
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none">
                {/* SVG replacement for UserCircleIcon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-8 w-8 text-gray-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="hidden sm:inline">User</span>

                {/* SVG replacement for ChevronDownIcon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={`${
                          active ? "bg-blue-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Account Settings
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`${
                          active ? "bg-blue-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        )}
      </div>
    </header>
  );
}

export default Header;
