// components/Header.js
import React from 'react';

const Header = () => {
    return (
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
            <div className="relative w-72">
                <input type="text" placeholder="Search..." className="w-full p-2 pl-4 pr-10 border border-gray-300 rounded-lg" />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <i className="fas fa-search"></i>
                </span>
            </div>
            <div className="flex items-center gap-4">
                <i className="fas fa-bell text-gray-600"></i>
                <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover" />
                <span className="text-gray-800">Anthony (USA)</span>
            </div>
        </div>
    );
};

export default Header;
