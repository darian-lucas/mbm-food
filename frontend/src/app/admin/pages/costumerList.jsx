import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Table from './components/Table';

export default function Dashboard() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 ml-60 p-6 bg-gray-100 min-h-screen">
                <Header />
                <Table />
            </div>
        </div>
    );
}
