import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import GoBack from '../action_buttons/GoBack';
import '../../styles/siginup.css';

const AuthLayout = ({ children, overlayTitle, overlayText, overlayButtonText, overlayButtonLink }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleOverlayButtonClick = () => {
    // This will navigate to the specified link
    navigate(overlayButtonLink);
  };

  // Determine if we need the "signup-active" class based on the current path
  const isActive = location.pathname !== '/login';

  return (
    <div className={`signup-app-container ${sidebarOpen ? 'signup-sidebar-open' : ''}`}>
      {/* Barre latérale */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className="signup-main-content">
        <div className={`signup-auth-container ${isActive ? 'signup-active' : ''}`}>
          <div className="signup-form-container">
            {children}
          </div>

          {/* Panneau d'animation */}
          <div className="signup-overlay-container">
            <div className="signup-overlay">
              <div className={`signup-overlay-panel ${isActive ? 'signup-left' : 'signup-right'}`}>
                <h2>{overlayTitle}</h2>
                <p>{overlayText}</p>
                <button 
                  className="signup-ghost-btn" 
                  onClick={handleOverlayButtonClick}
                >
                  {overlayButtonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Composant GoBack */}
      <GoBack />
    </div>
  );
};

export default AuthLayout;