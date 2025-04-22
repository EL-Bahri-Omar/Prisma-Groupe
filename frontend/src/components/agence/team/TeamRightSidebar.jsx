import React, { useEffect } from 'react';
import '../../../App.css';

const TeamRightSidebar = ({ teamMembers, currentPage, setCurrentPage }) => {
  const totalPages = teamMembers?.length || 0;

  // Generate page IDs based on team members count
  const pageIdMap = {};
  for (let i = 1; i <= totalPages; i++) {
    pageIdMap[i] = `page${i * 2 - 1}`; // page1, page3, page5, etc.
  }

  useEffect(() => {
    const handleScroll = () => {
      const pageElements = document.querySelectorAll('.team-left-page');
      let mostVisiblePage = 1;
      let maxVisibility = 0;
      
      pageElements.forEach(page => {
        const rect = page.getBoundingClientRect();
        const pageId = page.id;
        const pageNum = Object.entries(pageIdMap).find(([num, id]) => id === pageId)?.[0];
        
        if (pageNum) {
          const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
          const visibility = visibleHeight > 0 ? visibleHeight / page.clientHeight : 0;
          
          if (visibility > maxVisibility) {
            maxVisibility = visibility;
            mostVisiblePage = parseInt(pageNum);
          }
        }
      });
      
      setCurrentPage(mostVisiblePage);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pageIdMap, setCurrentPage, teamMembers]);

  const handleRadioChange = (event) => {
    const pageNum = event.target.value;
    const targetId = pageIdMap[pageNum];
    const target = document.getElementById(targetId);
    
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setCurrentPage(parseInt(pageNum));
    }
  };

  return (
    <div className="right-sidebar">
      <div className="radio-group">
        {teamMembers?.map((_, index) => (
          <label key={index}>
            <input
              type="radio"
              name="page"
              value={index + 1}
              checked={currentPage === index + 1}
              onChange={handleRadioChange}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default TeamRightSidebar;