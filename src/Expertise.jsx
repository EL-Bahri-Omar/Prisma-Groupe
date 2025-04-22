import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import GoBack from './GoBack';
import "./Expertise.css";
import ScrollTop from "./ScrollTop";

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
      'prisma-groupe': '/PrismaGroupe',
      'prisma-events': '/PrismaEvents',
      'prisma-studio': '/PrismaStudio',
      'prisma-logistique': '/PrismaLogestique',
      'prisma-deco': '/PrismaEspaceDeco',
      'prisma-lab': '/PrismaLab'
    };
    navigate(routeMap[entity]);
  };

  const prismaEntities = [
    {
      id: 'prisma-groupe',
      title: 'PRISMA GROUPE',
      image: '/src/assets/PrismaGroupe.png'
    },
    {
      id: 'prisma-events',
      title: 'PRISMA EVENTS',
      image: '/src/assets/Prisma Events.png'
    },
    {
      id: 'prisma-studio',
      title: 'PRISMA STUDIO',
      image: '/src/assets/Prisma Studio.png'
    },
    {
      id: 'prisma-logistique',
      title: 'PRISMA LOGISTIQUE',
      image: '/src/assets/Prisma Logistique.png'
    },
    {
      id: 'prisma-deco',
      title: 'PRISMA ESPACE DÉCO',
      image: '/src/assets/Prisma Espace Déco.png'
    },
    {
      id: 'prisma-lab',
      title: 'PRISMA LAB',
      image: '/src/assets/Prisma Lab.png'
    }
  ];

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
            {prismaEntities.map((entity) => (
              <div 
                key={entity.id} 
                className="prisma-card"
                onClick={() => navigateToPrisma(entity.id)}
              >
                <div className="prisma-card-image-container">
                  <div className="prisma-card-image">
                    <img src={entity.image} alt={entity.title} />
                  </div>
                </div>
                <div className="prisma-card-title">
                  <h3>{entity.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flèche de retour en haut */}
      <ScrollTop/>

      <GoBack />
    </div>
  );
};

export default ExpertisePage;