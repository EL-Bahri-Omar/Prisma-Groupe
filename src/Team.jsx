import React, { useEffect, useState } from 'react';
import TeamLeft from './TeamLeft';
import TeamRight from './TeamRight';
import './App.css';
import './styles/team.css';
import Sidebar from './Sidebar';
import TeamRightSidebar from './TeamRightSidebar';

const Team = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const winHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const pageHeight = document.querySelector('.full-page').clientHeight;
      const newPage = Math.round(scrollTop / pageHeight) + 1;
      setCurrentPage(newPage);

      const revScroll = Math.round(-document.querySelector('.team-col-l').clientHeight + scrollTop + winHeight);
      document.querySelector('.col-r').style.marginTop = `${revScroll}px`;
    };

    const handleResize = () => {
      const pages = document.querySelectorAll('.full-page');
      pages.forEach(page => {
        page.style.height = `${window.innerHeight}px`;
      });
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Initial setup
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to handle sidebar state changes
  const handleSidebarToggle = (isOpen) => {
    setSidebarOpen(isOpen);
  };

  return (
    <>
    
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Sidebar onToggle={handleSidebarToggle} />
        <div className="home-content">
        <TeamLeft />
        <TeamRight />
        <TeamRightSidebar />
      </div>
    </div>
      
    </>
  );
};

export default Team;