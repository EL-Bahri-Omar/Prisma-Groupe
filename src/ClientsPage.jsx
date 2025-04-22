// src/components/ClientPage.jsx
import React from 'react';
import Sidebar from './Sidebar';
import ClientGrid from './ClientGrid';
import './ClientPage.css';

const ClientsPage = () => {

    // Function to handle sidebar state changes
  const handleSidebarToggle = (isOpen) => {
    setSidebarOpen(isOpen);
  };
  return (
    <>
    
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Sidebar onToggle={handleSidebarToggle} />
        <div className="home-content">
            <ClientGrid/>
        </div>
    </div>
      
    </>
  );
};

export default ClientsPage;