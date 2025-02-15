// components/Sidebar.js
import React from 'react';

const Sidebar = () => {
    const menuItems = [
        'Dashboard', 'Vendors', 'Customers', 'Products', 'Wishlist',
        'Orders', 'Invoice', 'History', 'Settings', 'Message', 'Pages', 'Language', 'Login'
    ];

    return (
        <div className="w-60 h-screen bg-white shadow-md fixed top-0 left-0 p-5">
            <div className="text-center text-xl font-bold text-blue-600 mb-6">SHERAH</div>
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index} className="px-4 py-3 cursor-pointer text-gray-700 hover:bg-blue-100 border-l-4 border-transparent hover:border-blue-500">
                        <i className={`fas fa-${item.toLowerCase()} mr-3`}></i>{item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;