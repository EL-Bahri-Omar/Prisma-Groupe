import React, { useEffect, useState } from 'react';
import './App.css';

const RightSidebar = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Function to handle radio button changes
  const handleRadioChange = (event) => {
    const target = document.querySelector(event.target.value);
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  // Listen for scroll events to update radio button selection
  useEffect(() => {
    const handleScroll = () => {
      const pageHeight = document.querySelector('.full-page')?.clientHeight || window.innerHeight;
      const scrollTop = window.scrollY;
      const newPage = Math.floor(scrollTop / pageHeight) + 1;
      
      // Update the current page
      setCurrentPage(newPage);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initialize correct radio selection on component mount
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Map between page numbers and their corresponding IDs
  const pageIdMap = {
    1: '#page1',
    2: '#page3',
    3: '#page5',
    4: '#page7',
    5: '#page9',
    6: '#page11',
    7: '#page13',
    8: '#page15'
  };

  return (
    <div className="right-sidebar">
      <div className="radio-group">
        {Object.entries(pageIdMap).map(([pageNum, pageId]) => (
          <label key={pageId}>
            <input
              type="radio"
              name="page"
              value={pageId}
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