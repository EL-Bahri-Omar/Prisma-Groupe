import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import Sidebar from './Sidebar';
import './App.css';
import './styles/clients.css'

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
                      <img src="src/assets/clients/client1.png" alt="Jerba Sun Club" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client2.png" alt="MM Logo" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client3.png" alt="Agora Premium" />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client4.png" alt="BNA" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client5.png" alt="Maghrebia" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client6.png" alt="BTK" />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client7.png" alt="TAEF" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client8.png" alt="Africinvest" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client9.png" alt="Tunisie Leasing" />
                    </div>
                  </div>
                  
                  {/* Row 4 (will require scrolling) */}
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client10.png" alt="TAEF" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client11.png" alt="Africinvest" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client12.png" alt="Tunisie Leasing" />
                    </div>
                  </div>
                  
                  {/* Row 5 (will require scrolling) */}
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client13.png" alt="TAEF" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client14.png" alt="Africinvest" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client15.png" alt="Tunisie Leasing" />
                    </div>
                  </div>
                  
                  {/* Row 6 (will require scrolling) */}
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client16.png" alt="TAEF" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client17.jpg" alt="Africinvest" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client18.png" alt="Tunisie Leasing" />
                    </div>
                  </div>

                      {/* Row 7 (will require scrolling) */}
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client19.png" alt="TAEF" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client20.png" alt="Africinvest" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client21.png" alt="Tunisie Leasing" />
                    </div>
                  </div>

                  {/* Row 8 (will require scrolling) */}
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client22.png" alt="TAEF" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client23.png" alt="Africinvest" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client24.jpg" alt="Tunisie Leasing" />
                    </div>
                  </div>


                  {/* Row 9 (will require scrolling) */}
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client25.jpg" alt="TAEF" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client26.jpg" alt="Africinvest" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client27.png" alt="Tunisie Leasing" />
                    </div>
                  </div>


                  {/* Row 10 (will require scrolling) */}
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client28.png" alt="TAEF" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client29.png" alt="Africinvest" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client30.png" alt="Tunisie Leasing" />
                    </div>
                  </div>



                  {/* Row 11 (will require scrolling) */}
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client31.png" alt="TAEF" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client32.png" alt="Africinvest" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client33.png" alt="Tunisie Leasing" />
                    </div>
                  </div>


                  {/* Row 12 (will require scrolling) */}
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client34.png" alt="TAEF" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client35.png" alt="Africinvest" />
                    </div>
                  </div>
                  <div className="client-cell">
                    <div className="client-card">
                      <img src="src/assets/clients/client36.png" alt="Tunisie Leasing" />
                    </div>
                  </div>









                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Go Back button*/}
      <div id="bottom-navigation-arrow" className="client-scroll-to-top">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={goToHome}>
          <path d="M14 5L7 12L14 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

export default ClientsPage;