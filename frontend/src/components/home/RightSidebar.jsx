import React, { useEffect, useState } from 'react';
import '../../App.css';

const RightSidebar = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Map between page numbers and their corresponding IDs
  const pageIdMap = {
    1: 'page1',
    2: 'page3',
    3: 'page5',
    4: 'page7',
    5: 'page9',
    6: 'page11',
    7: 'page13',
    8: 'page15'
  };

  // Listen for scroll events to update radio button selection
  useEffect(() => {
    const handleScroll = () => {
      // Find the most visible page
      const pageElements = document.querySelectorAll('.left-page');
      let mostVisiblePage = 1;
      let maxVisibility = 0;
      
      pageElements.forEach(page => {
        const rect = page.getBoundingClientRect();
        const pageId = page.id;
        
        // Find the page number for this page ID
        const pageNum = Object.entries(pageIdMap).find(([num, id]) => id === pageId)?.[0];
        
        if (pageNum) {
          // Calculate how much of the page is visible in the viewport
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
    
    // Initialize correct radio selection on component mount
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pageIdMap]);

  // Function to handle radio button changes
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
        {Object.entries(pageIdMap).map(([pageNum, pageId]) => (
          <label key={pageId}>
            <input
              type="radio"
              name="page"
              value={pageNum}
              checked={currentPage === parseInt(pageNum)}
              onChange={handleRadioChange}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;