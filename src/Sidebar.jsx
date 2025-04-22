import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [showNumbers, setShowNumbers] = useState(false);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) {
      onToggle(newState);
    }
    // Reset expanded menu when closing sidebar
    if (!newState) {
      setExpandedMenu(null);
    }

    // When closing sidebar, also close the WhatsApp numbers popup
    if (!newState) {
      setShowNumbers(false);
    }
  };

  const handleWhatsAppClick = () => {
    setShowNumbers(!showNumbers);
  };

  const handleNumberClick = (number) => {
    // Remove spaces and non-numeric characters for compatibility
    const cleanNumber = number.replace(/\s+/g, '');
    
    // Open WhatsApp with the number
    window.open(`https://wa.me/${cleanNumber}`, '_blank');
  };

  const toggleMenu = (menu) => {
    if (expandedMenu === menu) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(menu);
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Hamburger toggle button - always visible */}
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <div className="hamburger"></div>
        <div className="hamburger"></div>
        <div className="hamburger"></div>
      </div>
      
      {/* Logo - position based on sidebar state */}
      {isOpen ? (
        // Logo when sidebar is open - positioned at top
        <div className="sidebar-logo">
          <Link to="/">
            <img 
              src="/src/assets/prisma-groupe1.png" 
              alt="Prisma Digital Logo" 
              className="logo-large"
            />
          </Link>
        </div>
      ) : (
        // Logo when sidebar is closed - positioned at bottom
        <div className="sidebar-logo-closed">
          <Link to="/">
            <img 
              src="/src/assets/prisma-groupe.png" 
              alt="Prisma Digital Logo" 
              className="logo-small"
            />
          </Link>
        </div>
      )}
      
      {/* Navigation links - only visible when sidebar is open */}
      {isOpen && (
        <div className="sidebar-nav">
          <ul>
            {/* If AGENCES is expanded, only show AGENCES with its submenu */}
            {expandedMenu === 'agences' ? (
              <li className="menu-item">
                <div 
                  className="menu-header active-menu"
                  onClick={() => toggleMenu('agences')}
                >
                  <span>AGENCES</span>
                  <span className="dropdown-arrow">▼</span>
                </div>
                <ul className="submenu active-menu">
                  <li><Link to="/agence/depuis-2008" className={window.location.pathname === '/agence/depuis-2008' ? 'active-nav-item' : ''}>Depuis 2008</Link></li>
                  <li><Link to="/agence/team" className={window.location.pathname === '/agence/team' ? 'active-nav-item' : ''}>Team</Link></li>
                  <li><Link to="/agence/philosophie" className={window.location.pathname === '/agence/philosophie' ? 'active-nav-item' : ''}>Philosophie</Link></li>
                  <li><Link to="/agence/actualites" className={window.location.pathname === '/agence/actualites' ? 'active-nav-item' : ''}>Actualités</Link></li>
                </ul>
              </li>
            ) : (
              /* Otherwise show all menu items */
              <>
                <li className="menu-item">
                  <div 
                    className={`menu-header ${window.location.pathname.startsWith('/agence') ? 'active-nav-item' : ''}`}
                    onClick={() => toggleMenu('agences')}
                  >
                    <span>AGENCES</span>
                    <span className="dropdown-arrow">▶</span>
                  </div>
                </li>
                <li>
                  <Link to="/expertises" className={window.location.pathname === '/expertises' ? 'active-nav-item' : ''}>
                    EXPERTISES
                  </Link>
                </li>
                <li>
                  <Link to="/references" className={window.location.pathname === '/references' ? 'active-nav-item' : ''}>
                    RÉFÉRENCES
                  </Link>
                </li>
                <li>
                  <Link to="/clients" className={window.location.pathname === '/clients' ? 'active-nav-item' : ''}>
                    CLIENTS
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className={window.location.pathname === '/blog' ? 'active-nav-item' : ''}>
                    BLOG
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className={window.location.pathname === '/contact' ? 'active-nav-item' : ''}>
                    CONTACT
                  </Link>
                </li>
                <li>
                  <Link to="/inscrire" className={window.location.pathname === '/inscrire' ? 'active-nav-item' : ''}>
                    S'INSCRIRE
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* WhatsApp number popup */}
            {showNumbers && (
              <div className="whatsapp-numbers">
                <p 
                  onClick={() => handleNumberClick('+216 12 345 678')}
                  className="whatsapp-number"
                >
                  +216 12 345 678
                </p>
              </div>
      )}
      
      {/* Social icons section - always visible when sidebar is open */}
      {isOpen && (
        <div className="social-icons">
          <a className="social-icon" target="_blank" rel="noopener noreferrer" >
            <div style={{ marginRight: "80px"}}><i className="fab fa-whatsapp" onClick={handleWhatsAppClick}></i></div>
          </a>
          
          <a href="https://facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://linkedin.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://tiktok.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-tiktok"></i>
          </a>
          <a href="https://instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      )}
    </div>
  );
};

export default Sidebar;