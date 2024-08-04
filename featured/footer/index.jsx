import React from 'react';

const Footer = ({ isSidebarOpen }) => {
  return (
    <footer 
      className={`bg-gray-800 text-gray-400 py-4 fixed bottom-0 left-0 right-0 transition-all duration-300 ${
        isSidebarOpen ? 'pl-64' : 'pl-16'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-sm">
          2024 © Skote.
        </div>
        <div className="text-sm">
          Design & Develop by <span className="text-gray-300">Themesbrand</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
