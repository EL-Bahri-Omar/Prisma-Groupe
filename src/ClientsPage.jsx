import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import Sidebar from './Sidebar';
import './App.css';

const ClientsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };
  
  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className="main-content">
        <div className="clients-container">
          <div className="clients-layout">
            {/* Left side text content */}
            <div className="clients-text-section">
              <p className="clients-subtitle-small">Ils nous ont fait</p>
              <h1 className="clients-title-large">confiance</h1>
              <p className="clients-intro">
                Nous sommes partenaires d'enseignes et institutions de renommée avec de 
                solides références internationales.
              </p>
            </div>

            {/* Right side clients grid with scroll */}
            <div className="clients-grid-section">
              <div className="clients-grid-container">
                <div className="clients-grid">
                  {/* Row 1 */}
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/client1.png" alt="Jerba Sun Club" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/client2.jpg" alt="MM Logo" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/client3.png" alt="Agora Premium" />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/client4.png" alt="BNA" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/client1.png" alt="Maghrebia" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/client3.png" alt="BTK" />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/client4.png" alt="TAEF" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/client2.jpg" alt="Africinvest" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/client1.png" alt="Tunisie Leasing" />
                    </div>
                  </div>
                  
                  {/* Row 4 (will require scrolling) */}
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/client4.png" alt="TAEF" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/client2.jpg" alt="Africinvest" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/client1.png" alt="Tunisie Leasing" />
                    </div>
                  </div>
                  
                  {/* Row 5 (will require scrolling) */}
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/client4.png" alt="TAEF" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/client2.jpg" alt="Africinvest" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/client1.png" alt="Tunisie Leasing" />
                    </div>
                  </div>
                  
                  {/* Row 6 (will require scrolling) */}
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/client4.png" alt="TAEF" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/client2.jpg" alt="Africinvest" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/client1.png" alt="Tunisie Leasing" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="bottom-navigation-arrow" className="client-scroll-to-top">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={goToHome}>
          <path d="M14 5L7 12L14 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

export default ClientsPage;