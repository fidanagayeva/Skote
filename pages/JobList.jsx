import React from 'react';
import { FaSearch, FaCog } from 'react-icons/fa'; 

const JobList = () => {
  return (
    <div className="bg-gray-900 min-h-screen p-6" style={{ paddingLeft: '7%',paddingRight: '3%' }}>
      <h1 className="text-xl font-bold text-white mb-4">JOBS GRID</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Search your job"
            className="bg-gray-700 p-2 rounded text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="San Francisco, LA"
            className="bg-gray-700 p-2 rounded text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Job Categories"
            className="bg-gray-700 p-2 rounded text-white placeholder-gray-400"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Select time"
            className="bg-gray-700 p-2 rounded text-white placeholder-gray-400"
          />
          <div className="flex space-x-4 col-span-2">
            <button className="bg-blue-600 p-2 rounded text-white flex items-center w-full">
              <FaSearch className="mr-2" /> Find Jobs
            </button>
            <button className="bg-gray-600 p-2 rounded text-white flex items-center w-full">
              <FaCog className="mr-2" /> Advance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobList;
