// src/header/index.jsx
import React, { useState } from 'react';
import {
  FaBars, FaSearch, FaBell, FaUserCircle, FaCog, FaTh,
  FaExpand, FaChevronDown, FaHome, FaToolbox, FaEnvelope,
  FaFile, FaMailBulk, FaBriefcase, FaBuilding, FaDollarSign,
  FaSleigh, FaTimes
} from 'react-icons/fa';
import { FlagIcon } from 'react-flag-kit';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      <header className="bg-gray-800 text-white flex items-center justify-between p-4 z-10">
        <div className="flex items-center">
          <div className="mr-10" style={{ width: '5.5rem' }}>
            <img src="data:image/png;base64,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" alt="" className="rounded-full" />
          </div>
          <div className="cursor-pointer" onClick={toggleSidebar}>
            {isSidebarOpen ? (
              <FaTimes className="text-white" />
            ) : (
              <FaBars className="mr-4 ml-4" />
            )}
          </div>
          <div className="flex items-center bg-gray-800 rounded-full px-4 py-1 ml-4">
            <FaSearch className="mr-2 cursor-pointer text-gray-400" />
            <input type="text" placeholder="Search..." className="bg-gray-800 text-white outline-none" />
          </div>
          <div className="flex items-center ml-4 cursor-pointer text-sm/[17px]">
            <span className="mr-2">Mega Menu</span>
            <FaChevronDown />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center mr-4 cursor-pointer">
            <FlagIcon code="US" size={24} className="mr-2" />
          </div>
          <FaTh className="mr-4 cursor-pointer" />
          <FaExpand className="mr-4 cursor-pointer" />
          <div className="relative mr-4 cursor-pointer">
            <FaBell />
          </div>
          <div className="flex items-center mr-4 cursor-pointer">
            <FaUserCircle className="mr-2" />
            <span>admin</span>
          </div>
          <FaCog className="cursor-pointer" />
        </div>
      </header>

      <div className={`${
        isSidebarOpen ? 'w-64' : 'w-16'
      } fixed top-16 left-0 h-full bg-gray-800 text-white shadow-lg z-40 transition-width duration-300 flex flex-col items-center`}>
        {isSidebarOpen ? (
          <div className="p-4 w-full">
            <h2 className="text-sm text-gray-400">Menu</h2>
            <div className="flex items-center mt-4">
              <FaHome className="mr-2 text-gray-400" />
              <span>Dashboards</span>
              <FaChevronDown className="ml-auto text-gray-400" />
            </div>
            <ul className="mt-4">
              <li className="mt-4">
                <Link to="job-list">Job List</Link>
              </li>
              <li className="mt-4">
                <Link to="job-grid">Job Grid</Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-around h-full py-4 space-y-4">
            <FaHome className="text-gray-400" />
            <FaToolbox className="text-gray-400" />
            <FaEnvelope className="text-gray-400" />
            <FaFile className="text-gray-400" />
            <FaMailBulk className="text-gray-400" />
            <FaBriefcase className="text-gray-400" />
            <FaBuilding className="text-gray-400" />
            <FaDollarSign className="text-gray-400" />
            <FaSleigh className="text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
