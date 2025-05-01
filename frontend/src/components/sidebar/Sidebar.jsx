import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../actions/userActions';

const Sidebar = ({ onToggle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [showNumbers, setShowNumbers] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const sidebarRef = useRef(null);
  const userDropdownRef = useRef(null);
  const alert = useAlert();
  const dispatch = useDispatch();
  
  const { user, loading } = useSelector(state => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success('Déconnecté avec succès.');
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    if (sidebarOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  };

  const openSidebar = () => {
    setSidebarOpen(true);
    if (onToggle) onToggle(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setExpandedMenu(null);
    setShowNumbers(false);
    if (onToggle) onToggle(false);
  };

  const toggleUserDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUserDropdownOpen(!userDropdownOpen);
  };

  const handleWhatsAppClick = (e) => {
    e.stopPropagation();
    setShowNumbers(!showNumbers);
  };

  const handleNumberClick = (number) => {
    const cleanNumber = number.replace(/\s+/g, '');
    window.open(`https://wa.me/${cleanNumber}`, '_blank');
  };

  const toggleMenu = (menu, e) => {
    e.stopPropagation();
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`} ref={sidebarRef}>
      {/* Hamburger toggle button */}
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <div className={`hamburger ${sidebarOpen ? 'open' : ''}`}></div>
        <div className={`hamburger ${sidebarOpen ? 'open' : ''}`}></div>
        <div className={`hamburger ${sidebarOpen ? 'open' : ''}`}></div>
      </div>
      
      {/* Logo */}
      {sidebarOpen ? (
        <div className="sidebar-logo">
          <Link to="/" onClick={closeSidebar}>
            <img 
              src="/src/assets/prisma-groupe1.png" 
              alt="Prisma Digital Logo" 
              className="logo-large"
            />
          </Link>
        </div>
      ) : (
        <>
          {/* User avatar in closed sidebar state */}
          {user && !loading && (
            <div className="closed-sidebar-user" ref={userDropdownRef}>
              <figure className="sidebar-avatar sidebar-avatar-closed-sidebar" onClick={toggleUserDropdown}>
                <img
                  src={user.avatar?.url}
                  alt={user.name}
                  className="rounded-circle"
                />
              </figure>
            </div>
          )}
          <div className="sidebar-logo-closed">
            <Link to="/">
              <img 
                src="/src/assets/prisma-groupe.png" 
                alt="Prisma Digital Logo" 
                className="logo-small"
              />
            </Link>
          </div>
        </>
      )}
      
      {/* Navigation links */}
      {sidebarOpen && (
        <div className="sidebar-nav">
          <ul>
            {/* AGENCES menu */}
            {expandedMenu === 'agences' ? (
              <>
                <li className="menu-item">
                  <div 
                    className="menu-header active-menu"
                    onClick={(e) => toggleMenu('agences', e)}
                  >
                    <span>AGENCES</span>
                    <span className="dropdown-arrow">▼</span>
                  </div>
                  <ul className="submenu active-menu">
                    <li>
                      <Link 
                        to="/agence/depuis-2008" 
                        className={window.location.pathname === '/agence/depuis-2008' ? 'active-nav-item' : ''}
                        onClick={closeSidebar}
                      >
                        Depuis 2008
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/agence/team" 
                        className={window.location.pathname === '/agence/team' ? 'active-nav-item' : ''}
                        onClick={closeSidebar}
                      >
                        Team
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/agence/philosophie" 
                        className={window.location.pathname === '/agence/philosophie' ? 'active-nav-item' : ''}
                        onClick={closeSidebar}
                      >
                        Philosophie
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/agence/actualites" 
                        className={window.location.pathname === '/agence/actualites' ? 'active-nav-item' : ''}
                        onClick={closeSidebar}
                      >
                        Actualités
                      </Link>
                    </li>
                  </ul>
                </li>
                
                {/* User section (always visible) */}
                {user ? (
                  <li className="user-menu-item">
                    <div ref={userDropdownRef} className="user-menu-container">
                      <div className="user-menu-header" onClick={toggleUserDropdown}>
                        <figure className="sidebar-avatar sidebar-avatar-nav">
                          <img
                            src={user.avatar?.url}
                            alt={user.name}
                            className="rounded-circle"
                          />
                        </figure>
                        <span>{user.name}</span>
                        <span className="dropdown-arrow">
                          {userDropdownOpen ? '▼' : '▶'}
                        </span>
                      </div>
                      
                      {userDropdownOpen && (
                        <ul className="user-submenu">
                          {user.role === 'admin' || user.role === 'super' ? (
                            <li>
                              <Link 
                                className="dropdown-item" 
                                to="/dashboard"
                                onClick={() => {
                                  setUserDropdownOpen(false);
                                  closeSidebar();
                                }}
                              >
                                Dashboard
                              </Link>
                            </li>
                          ): null}
                          <li>
                            <Link 
                              className="dropdown-item" 
                              to="/messages/me"
                              onClick={() => {
                                setUserDropdownOpen(false);
                                closeSidebar();
                              }}
                            >
                              Mes Messages
                            </Link>
                          </li>
                          <li>
                            <Link 
                              className="dropdown-item" 
                              to="/me"
                              onClick={() => {
                                setUserDropdownOpen(false);
                                closeSidebar();
                              }}
                            >
                              Profil
                            </Link>
                          </li>
                          <li>
                            <Link 
                              className="dropdown-item text-danger" 
                              to="/"
                              onClick={() => {
                                setUserDropdownOpen(false);
                                logoutHandler();
                              }}
                            >
                              Déconnexion
                            </Link>
                          </li>
                        </ul>
                      )}
                    </div>
                  </li>
                ) : !loading && (
                  <li>
                    <Link 
                      to="/login" 
                      className="login-btn"
                      onClick={closeSidebar}
                    >
                      SE CONNECTER
                    </Link>
                  </li>
                )}
              </>
            ) : (
              <>
                <li className="menu-item">
                  <div 
                    className={`menu-header ${window.location.pathname.startsWith('/agence') ? 'active-menu' : ''}`}
                    onClick={(e) => toggleMenu('agences', e)}
                  >
                    <span>AGENCES</span>
                    <span className="dropdown-arrow">▶</span>
                  </div>
                </li>

                <li>
                  <Link 
                    to="/expertises" 
                    className={window.location.pathname === '/expertises' ? 'active-nav-item' : ''}
                    onClick={closeSidebar}
                  >
                    EXPERTISES
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/references" 
                    className={window.location.pathname === '/references' ? 'active-nav-item' : ''}
                    onClick={closeSidebar}
                  >
                    RÉFÉRENCES
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/clients" 
                    className={window.location.pathname === '/clients' ? 'active-nav-item' : ''}
                    onClick={closeSidebar}
                  >
                    CLIENTS
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/blog" 
                    className={window.location.pathname === '/blog' ? 'active-nav-item' : ''}
                    onClick={closeSidebar}
                  >
                    BLOG
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className={window.location.pathname === '/contact' ? 'active-nav-item' : ''}
                    onClick={closeSidebar}
                  >
                    CONTACT
                  </Link>
                </li>
                
                {/* User authentication section */}
                {user ? (
                  <li className="user-menu-item">
                    <div ref={userDropdownRef} className="user-menu-container">
                      <div className="user-menu-header" onClick={toggleUserDropdown}>
                        <figure className="sidebar-avatar sidebar-avatar-nav">
                          <img
                            src={user.avatar?.url}
                            alt={user.name}
                            className="rounded-circle"
                          />
                        </figure>
                        <span>{user.name}</span>
                        <span className="dropdown-arrow">
                          {userDropdownOpen ? '▼' : '▶'}
                        </span>
                      </div>
                      
                      {userDropdownOpen && (
                        <ul className="user-submenu">
                          {user.role === 'admin' || user.role === 'super' ? (
                            <li>
                              <Link 
                                className="dropdown-item" 
                                to="/dashboard"
                                onClick={() => {
                                  setUserDropdownOpen(false);
                                  closeSidebar();
                                }}
                              >
                                Dashboard
                              </Link>
                            </li>
                          ): null}
                          <li>
                            <Link 
                              className="dropdown-item" 
                              to="/messages/me"
                              onClick={() => {
                                setUserDropdownOpen(false);
                                closeSidebar();
                              }}
                            >
                              Mes Messages
                            </Link>
                          </li>
                          <li>
                            <Link 
                              className="dropdown-item" 
                              to="/me"
                              onClick={() => {
                                setUserDropdownOpen(false);
                                closeSidebar();
                              }}
                            >
                              Profil
                            </Link>
                          </li>
                          <li>
                            <Link 
                              className="dropdown-item text-danger" 
                              to="/"
                              onClick={() => {
                                setUserDropdownOpen(false);
                                logoutHandler();
                              }}
                            >
                              Déconnexion
                            </Link>
                          </li>
                        </ul>
                      )}
                    </div>
                  </li>
                ) : !loading && (
                  <li>
                    <Link 
                      to="/login" 
                      className="login-btn"
                      onClick={closeSidebar}
                    >
                      SE CONNECTER
                    </Link>
                  </li>
                )}
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
      
      {/* Social icons section */}
      {sidebarOpen && (
        <div className="social-icons">
          <div className="social-icon" onClick={handleWhatsAppClick} style={{ marginRight : '40px'}}>
            <i className="fab fa-whatsapp"></i>
          </div>
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