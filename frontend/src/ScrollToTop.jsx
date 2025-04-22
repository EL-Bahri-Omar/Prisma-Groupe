import React from 'react';
import { useNavigate } from 'react-router-dom';

const ScrollToTop = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div id="bottom-navigation-arrow" className="scroll-to-top">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={goToHome}>
          <path d="M14 5L7 12L14 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
  );
};

export default ScrollToTop;