import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { Link } from "react-router-dom";
import { FaUsers, FaUserPlus, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white fixed">
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
      <nav className="mt-10">
        <Link
          to="/employees"
          className="flex items-center py-2.5 px-4 rounded-lg transition duration-200 hover:bg-indigo-600 hover:text-white"
        >
          <FaUsers className="mr-3 text-xl" />
          Employees
        </Link>
        <Link
          to="/addemployee"
          className="flex items-center py-2.5 px-4 rounded-lg transition duration-200 hover:bg-indigo-600 hover:text-white"
        >
          <FaUserPlus className="mr-3 text-xl" />
          Add Employee
        </Link>
        <button
          onClick={logout}
          className="flex items-center w-full text-left py-2.5 px-4 rounded-lg transition duration-200 hover:bg-indigo-600 hover:text-white mt-4"
        >
          <FaSignOutAlt className="mr-3 text-xl" />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
