// components/Table.js
import React from 'react';

const Table = () => {
    const users = [
        { name: 'Bethany', email: 'mendorcart@gmail.com', orders: 120, country: 'Poland', status: 'Paid', joinDate: '19/09/2022' },
        { name: 'Charlottekha', email: 'margaretak@gmail.com', orders: 99, country: 'USA', status: 'Active', joinDate: '19/09/2022' },
        { name: 'Isabella Jhon', email: 'margaretak@gmail.com', orders: 99, country: 'USA', status: 'Active', joinDate: '19/09/2022' }
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h4 className="text-xl font-semibold mb-4">Pages</h4>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2">#</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Orders</th>
                        <th className="p-2">Country</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Join On</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="p-2"><input type="checkbox" /></td>
                            <td className="p-2 flex items-center">
                                <img className="w-10 h-10 rounded-full border-2 border-blue-500 mr-3" src="https://via.placeholder.com/40" alt="avatar" />
                                {user.name}
                            </td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">{user.orders}</td>
                            <td className="p-2">{user.country}</td>
                            <td className="p-2">
                                <span className={
                                    `px-3 py-1 rounded-full text-sm ${user.status === 'Paid' ? 'bg-red-200 text-red-700' : 'bg-green-200 text-green-700'}`
                                }>
                                    {user.status}
                                </span>
                            </td>
                            <td className="p-2">{user.joinDate}</td>
                            <td className="p-2">
                                <button className="text-green-600 mr-3"><i className="fas fa-pen"></i></button>
                                <button className="text-red-600"><i className="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;