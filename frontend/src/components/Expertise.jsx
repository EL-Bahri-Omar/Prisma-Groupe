import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import GoBack from './action_buttons/GoBack';
import "./../styles/Expertise.css";

const ExpertisePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  const navigateToPrisma = (entity) => {
    const routeMap = {
      'Prisma-Groupe': '/Prisma-Groupe',
      'prisma-digital': '/Prisma-Digital',
      'prisma-spazio': '/Prisma-Spazio',
      'prisma-audio': '/Prisma-AudioVisual',
      'prisma-venues': '/Prisma-Venues',
      'prisma-live': '/Prisma-Live',
      'prisma-distribution': '/Prisma-Distribution'
    };
    navigate(routeMap[entity]);
  };

  return (
    <div className={`app-container ${sidebarOpen ? "sidebar-open" : ""}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className={`main-content-expertise ${sidebarOpen ? "content-shifted" : ""}`}>
        {/* Section Titre */}
        <div className="title-section">
          <div className="title-content">
            <h1>NOS <span className="highlight">ENTITÉS PRISMA</span></h1>
            <div className="red-underline"></div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="call-to-action">
          <h2>Découvrez Nos Divisions Spécialisées</h2>
          <button className="btn-contact" onClick={handleContactClick}>
            CONTACTEZ-NOUS
          </button>
        </div>

        {/* Section des cartes Prisma */}
        <div className="prisma-cards-container">
          <div className="prisma-cards-grid">
            {/* Prisma Groupe Card */}
            <div 
              className="prisma-card"
              onClick={() => navigateToPrisma('Prisma-Groupe')}
            >
              <div className="prisma-card-image-container">
                <div className="prisma-card-image">
                  <img src="/src/assets/home/logosPrisma/PrismaGroupe.png" alt="PRISMA GROUPE" />
                </div>
              </div>
              <div className="prisma-card-title" style={{ color: '#042E38' }}>
                <h3>PRISMA GROUPE</h3>
              </div>
            </div>

            {/* Prisma Digital Card */}
            <div 
              className="prisma-card"
              onClick={() => navigateToPrisma('prisma-digital')}
            >
              <div className="prisma-card-image-container">
                <div className="prisma-card-image">
                  <img src="/src/assets/home/logosPrisma/PrismaDigital.png" alt="PRISMA DIGITAL" />
                </div>
              </div>
              <div className="prisma-card-title" style={{ color: '#042E38' }}>
                <h3>PRISMA <span style={{ color: '#ee2176' }}>DIGITAL</span></h3>
              </div>
            </div>

            {/* Prisma Spazio Card */}
            <div 
              className="prisma-card"
              onClick={() => navigateToPrisma('prisma-spazio')}
            >
              <div className="prisma-card-image-container">
                <div className="prisma-card-image">
                  <img src="/src/assets/home/logosPrisma/PrismaSpazio.png" alt="PRISMA SPAZIO" />
                </div>
              </div>
              <div className="prisma-card-title" style={{ color: '#042E38' }}>
                <h3>PRISMA <span style={{ color: '#f7eb17' }}>SPAZIO</span></h3>
              </div>
            </div>

            {/* Prisma Audio Card */}
            <div 
              className="prisma-card"
              onClick={() => navigateToPrisma('prisma-audio')}
            >
              <div className="prisma-card-image-container">
                <div className="prisma-card-image">
                  <img src="/src/assets/home/logosPrisma/PrismaAudio.png" alt="PRISMA AUDIO" />
                </div>
              </div>
              <div className="prisma-card-title" style={{ color: '#042E38' }}>
                <h3>PRISMA <span style={{ color: '#7e82bd' }}>AUDIOVISUAL</span></h3>
              </div>
            </div>

            {/* Prisma Venues Card */}
            <div 
              className="prisma-card"
              onClick={() => navigateToPrisma('prisma-venues')}
            >
              <div className="prisma-card-image-container">
                <div className="prisma-card-image">
                  <img src="/src/assets/home/logosPrisma/PrismaVenues.png" alt="PRISMA VENUES" />
                </div>
              </div>
              <div className="prisma-card-title" style={{ color: '#042E38' }}>
                <h3>PRISMA <span style={{ color: '#c89d6f' }}>VENUES</span></h3>
              </div>
            </div>

            {/* Prisma Live Card */}
            <div 
              className="prisma-card"
              onClick={() => navigateToPrisma('prisma-live')}
            >
              <div className="prisma-card-image-container">
                <div className="prisma-card-image">
                  <img src="/src/assets/home/logosPrisma/PrismaLive.png" alt="PRISMA LIVE" />
                </div>
              </div>
              <div className="prisma-card-title" style={{ color: '#042E38' }}>
                <h3>PRISMA <span style={{ color: '#f58639' }}>LIVE</span></h3>
              </div>
            </div>

            {/* Prisma Distribution Card */}
            <div 
              className="prisma-card"
              onClick={() => navigateToPrisma('prisma-distribution')}
            >
              <div className="prisma-card-image-container">
                <div className="prisma-card-image">
                  <img src="/src/assets/home/logosPrisma/PrismaDistribution.png" alt="PRISMA DISTRIBUTION" />
                </div>
              </div>
              <div className="prisma-card-title" style={{ color: '#042E38' }}>
                <h3>PRISMA <span style={{ color: '#faaf3e' }}>DISTRIBUTION</span></h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flèche de retour en haut */}
      <GoBack />
    </div>
  );
};

export default ExpertisePage;