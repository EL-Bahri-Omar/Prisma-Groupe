import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Footer.css';

const Footer = () => {
  const [selectedOption, setSelectedOption] = useState('briefer');
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when component mounts
    if (dropdownRef.current) {
      dropdownRef.current.scrollTop = dropdownRef.current.scrollHeight;
    }
  }, []);

  const handleSubmitClick = () => {
    navigate('/contact');
  };

  return (
    <div className="exact-footer">
      <div className="footer-title">On se rencontre quand ?</div>
      
      <div className="footer-actions">
        <div className="action-prompt">vous souhaitez nous</div>
        
        <select 
          ref={dropdownRef}
          className="footer-custom-dropdown"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="briefer">briefer</option>
          <option value="rejoindre">rejoindre</option>
          <option value="rencontrer">rencontrer</option>
        </select>
        
        <button 
          className="footer-submit-btn"
          onClick={handleSubmitClick}
        >
          ENVOYER
        </button>
      </div>
    </div>
  );
};

export default Footer;