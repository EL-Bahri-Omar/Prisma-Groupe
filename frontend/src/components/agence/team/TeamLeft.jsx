import React, { useEffect, useState, useRef } from 'react';
import '../../../App.css';

const TeamLeft = ({ teamMembers, currentPage, setCurrentPage }) => {
  const totalPages = teamMembers?.length || 0;
  const isScrollingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);

  // Generate page IDs based on team members count
  const pageIdMap = {};
  for (let i = 1; i <= totalPages; i++) {
    pageIdMap[i] = `page${i * 2 - 1}`; // page1, page3, page5, etc.
  }

  // Map from ID to page number (reverse mapping)
  const idToPageMap = Object.entries(pageIdMap).reduce((acc, [pageNum, id]) => {
    acc[id] = parseInt(pageNum);
    return acc;
  }, {});

  useEffect(() => {
    const updateCurrentPageFromScroll = () => {
      const pageElements = document.querySelectorAll('.team-left-page');
      let mostVisiblePage = 1;
      let maxVisibility = 0;
      
      pageElements.forEach(page => {
        const rect = page.getBoundingClientRect();
        const pageId = page.id;
        const pageNum = idToPageMap[pageId];
        
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const visibility = visibleHeight > 0 ? visibleHeight / window.innerHeight : 0;
        
        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          mostVisiblePage = pageNum;
        }
      });
      
      setCurrentPage(mostVisiblePage);
    };

    const scrollToPage = (targetPage) => {
      const safeTargetPage = Math.max(1, Math.min(totalPages, targetPage));
      const targetId = pageIdMap[safeTargetPage];
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        isScrollingRef.current = true;
        targetElement.scrollIntoView({ behavior: 'smooth' });
        setCurrentPage(safeTargetPage);
        
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      
      const now = Date.now();
      if (now - lastScrollTimeRef.current < 800 || isScrollingRef.current) {
        return;
      }
      
      lastScrollTimeRef.current = now;
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const targetPage = currentPage + direction;
      
      if (targetPage >= 1 && targetPage <= totalPages) {
        scrollToPage(targetPage);
      }
    };

    const handleKeyDown = (e) => {
      const now = Date.now();
      if (now - lastScrollTimeRef.current < 800 || isScrollingRef.current) {
        return;
      }
      
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        lastScrollTimeRef.current = now;
        
        const direction = e.key === 'ArrowDown' ? 1 : -1;
        const targetPage = currentPage + direction;
        
        if (targetPage >= 1 && targetPage <= totalPages) {
          scrollToPage(targetPage);
        }
      }
    };

    const handleScroll = () => {
      if (!isScrollingRef.current) {
        updateCurrentPageFromScroll();
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);
    
    updateCurrentPageFromScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage, idToPageMap, pageIdMap, totalPages, setCurrentPage]);

  const navigateUp = () => {
    if (currentPage > 1) {
      const targetElement = document.getElementById(pageIdMap[currentPage - 1]);
      if (targetElement) {
        isScrollingRef.current = true;
        targetElement.scrollIntoView({ behavior: 'smooth' });
        setCurrentPage(currentPage - 1);
        
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
      }
    }
  };

  const navigateDown = () => {
    if (currentPage < totalPages) {
      const targetElement = document.getElementById(pageIdMap[currentPage + 1]);
      if (targetElement) {
        isScrollingRef.current = true;
        targetElement.scrollIntoView({ behavior: 'smooth' });
        setCurrentPage(currentPage + 1);
        
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
      }
    }
  };

  return (
    <div className="col team-col-l">
      {teamMembers?.map((member, index) => (
        <div 
          key={member._id} 
          id={`page${index * 2 + 1}`} 
          className="full-page team-left-page"
        >
          <div className="team-left-content">
            {currentPage == 1 && (
              <div className="top-nav-arrow page-top-nav-arrow" onClick={navigateUp}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                </svg>
              </div>
            )}
            {currentPage > 1 && (
              <div className="top-nav-arrow page-top-nav-arrow" onClick={navigateUp}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 14L12 7L19 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}

            <h2>{member.name}</h2>
            <h3>{member.position}</h3>
            <p>{member.description}</p>

            <div className="bottom-nav-arrow page-bottom-nav-arrow">
              <div className="page-counter">
                <span className="current-page">{currentPage}</span>
                <span className="page-exponent">
                  <span className="page-separator">/</span>
                  <span className="total-pages">{totalPages}</span>
                </span>
              </div>
              {currentPage < totalPages && (
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={navigateDown}>
                  <path d="M5 10L12 17L19 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamLeft;