import React, { useEffect, useState } from 'react';
import TeamLeft from './TeamLeft';
import TeamRight from './TeamRight';
import '../../../App.css';
import '../../../styles/team.css';
import Sidebar from '../../sidebar/Sidebar';
import TeamRightSidebar from './TeamRightSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getTeamMembers } from '../../../actions/teamActions';
import Loader from '../../layout/Loader';

const Team = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { loading, team } = useSelector(state => state.teamMembers);

  useEffect(() => {
    dispatch(getTeamMembers());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const winHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const pageHeight = document.querySelector('.full-page')?.clientHeight;
      if (pageHeight) {
        const newPage = Math.round(scrollTop / pageHeight) + 1;
        setCurrentPage(newPage);

        const revScroll = Math.round(-document.querySelector('.team-col-l').clientHeight + scrollTop + winHeight);
        document.querySelector('.col-r').style.marginTop = `${revScroll}px`;
      }
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
  }, [team]); // Add team to dependencies to recalculate on data load

  const handleSidebarToggle = (isOpen) => {
    setSidebarOpen(isOpen);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar onToggle={handleSidebarToggle} />
      <div className="home-content">
        <TeamLeft teamMembers={team} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <TeamRight teamMembers={team} />
        <TeamRightSidebar teamMembers={team} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default Team;