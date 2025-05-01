import React, { useState, useEffect, useRef } from 'react';
import '../../App.css';
import { Link } from "react-router-dom";

const LeftColumn = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8;
  const isScrollingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);

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

  // Map from ID to page number (reverse mapping)
  const idToPageMap = Object.entries(pageIdMap).reduce((acc, [pageNum, id]) => {
    acc[id] = parseInt(pageNum);
    return acc;
  }, {});

  useEffect(() => {
    // Find the most visible page when normal scrolling occurs
    const updateCurrentPageFromScroll = () => {
      const pageElements = document.querySelectorAll('.left-page');
      let mostVisiblePage = 1;
      let maxVisibility = 0;
      
      pageElements.forEach(page => {
        const rect = page.getBoundingClientRect();
        const pageId = page.id;
        const pageNum = idToPageMap[pageId];
        
        // Calculate how much of the page is visible in the viewport
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const visibility = visibleHeight > 0 ? visibleHeight / window.innerHeight : 0;
        
        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          mostVisiblePage = pageNum;
        }
      });
      
      setCurrentPage(mostVisiblePage);
    };

    // Scroll to a specific page
    const scrollToPage = (targetPage) => {
      const safeTargetPage = Math.max(1, Math.min(totalPages, targetPage));
      const targetId = pageIdMap[safeTargetPage];
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        isScrollingRef.current = true;
        targetElement.scrollIntoView({ behavior: 'smooth' });
        setCurrentPage(safeTargetPage);
        
        // Reset scroll flag after animation completes
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
      }
    };

    // Handle wheel events for page-by-page scrolling
    const handleWheel = (e) => {
      e.preventDefault();
      
      // Prevent rapid firing of wheel events
      const now = Date.now();
      if (now - lastScrollTimeRef.current < 800 || isScrollingRef.current) {
        return;
      }
      
      lastScrollTimeRef.current = now;
      
      // Determine scroll direction
      const direction = e.deltaY > 0 ? 1 : -1;
      
      // Calculate target page
      const targetPage = currentPage + direction;
      
      if (targetPage >= 1 && targetPage <= totalPages) {
        scrollToPage(targetPage);
      }
    };

    // Handle keyboard arrow keys for navigation
    const handleKeyDown = (e) => {
      // Only proceed if not currently scrolling and enough time has passed since last scroll
      const now = Date.now();
      if (now - lastScrollTimeRef.current < 800 || isScrollingRef.current) {
        return;
      }
      
      // Only handle up and down arrow keys
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        
        lastScrollTimeRef.current = now;
        
        // Determine direction based on key pressed
        const direction = e.key === 'ArrowDown' ? 1 : -1;
        
        // Calculate target page
        const targetPage = currentPage + direction;
        
        if (targetPage >= 1 && targetPage <= totalPages) {
          scrollToPage(targetPage);
        }
      }
    };

    // Normal scroll event for tracking current page
    const handleScroll = () => {
      if (!isScrollingRef.current) {
        updateCurrentPageFromScroll();
      }
    };

    // Set up event listeners
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);
    
    // Initialize
    updateCurrentPageFromScroll();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage, idToPageMap, pageIdMap, totalPages]);

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
    <div className="col col-l">
      
      <div id="page1" className="full-page left-page" style={{ backgroundColor: '#014351'}}>
        <div className="left-content">
            <div id="top-navigation-arrow" className="top-nav-arrow page-top-nav-arrow" onClick={navigateUp}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              </svg>
            </div>

          <img src="/src/assets/home/prisma-groupe.png"/>
          <p></p>
          <Link to="/about" className="cta-button" style={{ backgroundColor: '#dfe3e8', color: 'black'}}>Découvrir</Link>

          <div id="bottom-navigation-arrow" className="bottom-nav-arrow page-bottom-nav-arrow">
            <div className="page-counter">
              <span className="current-page">{currentPage}</span>
              <span className="page-exponent">
                <span className="page-separator">/</span>
                <span className="total-pages">{totalPages}</span>
              </span>
            </div>
            {/* Only show down arrow if not on last page */}
            {currentPage < totalPages && (
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={navigateDown}>
                <path d="M5 10L12 17L19 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </div>
      </div>
      <div id="page3" className="full-page left-page" style={{ 
        backgroundImage: 'url("/src/assets/home/digital0.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="left-content">
          {currentPage > 1 && (
            <div id="top-navigation-arrow" className="top-nav-arrow page-top-nav-arrow" onClick={navigateUp}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 14L12 7L19 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}

          <img src="/src/assets/home/prisma-digital.png"/>
          <p></p>
          <Link to="/PrismaEvents" className="cta-button" style={{ backgroundColor: '#98a389', color: 'black'}}>En savoir plus</Link>

          <div id="bottom-navigation-arrow" className="bottom-nav-arrow page-bottom-nav-arrow">
            <div className="page-counter">
              <span className="current-page">{currentPage}</span>
              <span className="page-exponent">
                <span className="page-separator">/</span>
                <span className="total-pages">{totalPages}</span>
              </span>
            </div>
            {/* Only show down arrow if not on last page */}
            {currentPage < totalPages && (
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={navigateDown}>
                <path d="M5 10L12 17L19 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </div>
      </div>
      <div id="page5" className="full-page left-page" style={{ 
        backgroundImage: 'url("/src/assets/home/spazio0.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="left-content">
          {currentPage > 1 && (
            <div id="top-navigation-arrow" className="top-nav-arrow page-top-nav-arrow" onClick={navigateUp}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 14L12 7L19 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}

          <img src="/src/assets/home/prisma-spazio.png"/>
          <p></p>
          <Link to="/PrismaLogestique" className="cta-button" style={{ backgroundColor: '#f7eb17'}}>En savoir plus</Link>

          <div id="bottom-navigation-arrow" className="bottom-nav-arrow page-bottom-nav-arrow">
            <div className="page-counter">
              <span className="current-page">{currentPage}</span>
              <span className="page-exponent">
                <span className="page-separator">/</span>
                <span className="total-pages">{totalPages}</span>
              </span>
            </div>
            {/* Only show down arrow if not on last page */}
            {currentPage < totalPages && (
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={navigateDown}>
                <path d="M5 10L12 17L19 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </div>
      </div>
     


      <div id="page7" className="full-page left-page" style={{ 
        backgroundImage: 'url("/src/assets/home/event0.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
  <div className="left-content">
    {currentPage > 1 && (
      <div id="top-navigation-arrow" className="top-nav-arrow page-top-nav-arrow" onClick={navigateUp}>
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 14L12 7L19 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    )}

    <img src="/src/assets/home/prisma-event.png"/>
    <p></p>
    <Link to="/PrismaLab" className="cta-button" style={{ backgroundColor: '#ddaab3', color: 'black'}}>En savoir plus</Link>

    <div id="bottom-navigation-arrow" className="bottom-nav-arrow page-bottom-nav-arrow">
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


      <div id="page9" className="full-page left-page" style={{ 
        backgroundImage: 'url("/src/assets/home/studio0.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="left-content">
          {currentPage > 1 && (
            <div id="top-navigation-arrow" className="top-nav-arrow page-top-nav-arrow" onClick={navigateUp}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 14L12 7L19 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}

          <img src="/src/assets/home/prisma-studio.png"/>
          <p></p>
          <Link to="/PrismaEspaceDeco" className="cta-button" style={{ backgroundColor: '#003f5d', color: 'black'}}>En savoir plus</Link>

          <div id="bottom-navigation-arrow" className="bottom-nav-arrow page-bottom-nav-arrow">
            <div className="page-counter">
              <span className="current-page">{currentPage}</span>
              <span className="page-exponent">
                <span className="page-separator">/</span>
                <span className="total-pages">{totalPages}</span>
              </span>
            </div>
            {/* Only show down arrow if not on last page */}
            {currentPage < totalPages && (
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={navigateDown}>
                <path d="M5 10L12 17L19 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </div>
      </div>
      <div id="page11" className="full-page left-page" style={{ backgroundColor: '#c1272d'}}>
        <div className="left-content">
            <div id="top-navigation-arrow" className="top-nav-arrow page-top-nav-arrow" onClick={navigateUp}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 14L12 7L19 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          <img src="/src/assets/home/prisma-logistique.png"/>
          <p></p>
          <Link to="/PrismaStudio" className="cta-button" style={{ backgroundColor: '#0530475', color: 'black'}}>En savoir plus</Link>
          <div id="bottom-navigation-arrow" className="bottom-nav-arrow page-bottom-nav-arrow">
            <div className="page-counter">
              <span className="current-page">{currentPage}</span>
              <span className="page-exponent">
                <span className="page-separator">/</span>
                <span className="total-pages">{totalPages}</span>
              </span>
            </div>
            {/* Only show down arrow if not on last page */}
            {currentPage < totalPages && (
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={navigateDown}>
                <path d="M5 10L12 17L19 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </div>
      </div>
      <div id="page13" className="full-page left-page" style={{ backgroundColor: '#0533a6'}}>
        <div className="left-content">
          {currentPage > 1 && (
            <div id="top-navigation-arrow" className="top-nav-arrow page-top-nav-arrow" onClick={navigateUp}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 14L12 7L19 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}

          <img src="/src/assets/home/prisma-distribution.png"/>
          <p></p>
          <Link to="/PrismaLab" className="cta-button" style={{ backgroundColor: '#9198aa', color: 'black'}}>En savoir plus</Link>

          <div id="bottom-navigation-arrow" className="bottom-nav-arrow page-bottom-nav-arrow">
            <div className="page-counter">
              <span className="current-page">{currentPage}</span>
              <span className="page-exponent">
                <span className="page-separator">/</span>
                <span className="total-pages">{totalPages}</span>
              </span>
            </div>
            {/* Only show down arrow if not on last page */}
            {currentPage < totalPages && (
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={navigateDown}>
                <path d="M5 10L12 17L19 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </div>
      </div>
      <div id="page15" className="full-page left-page" style={{ backgroundColor: '#6bc9e6', width: '655px'}}>
        <div className="left-content">
          {currentPage > 1 && (
            <div id="top-navigation-arrow" className="top-nav-arrow page-top-nav-arrow" onClick={navigateUp}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 14L12 7L19 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}

          <h2>Contact</h2>
          <p></p>
          <Link to="/contact" className="cta-button">Contacter-nous</Link>

          <div id="bottom-navigation-arrow" className="bottom-nav-arrow page-bottom-nav-arrow">
            <div className="page-counter">
              <span className="current-page">{currentPage}</span>
              <span className="page-exponent">
                <span className="page-separator">/</span>
                <span className="total-pages">{totalPages}</span>
              </span>
            </div>
            {/* Only show down arrow if not on last page */}
            {currentPage < totalPages && (
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={navigateDown}>
                <path d="M5 10L12 17L19 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default LeftColumn;