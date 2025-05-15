import React, { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import GoBack from '../action_buttons/GoBack';
import '../../styles/information.css';

const Informations = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className="main-content">
        <div className="information-container">
          {/* Main content on the left */}
          <div className="information-text-overlay">
            <h2 className="information-heading">ADN</h2>
            
            <p className="information-paragraph">
              Né en 2008 au cœur de l'écosystème entrepreneurial tunisien, PRISMA GROUPE s'est construit autour de profils passionnés, créatifs et parfois atypiques, unis par une même ambition, donner du sens à la communication et faire émerger des marques fortes, durables et engageantes.
            </p>
            
            <p className="information-paragraph">
              Notre raison d'être : accompagner nos clients dans la création de valeur, en générant un engagement réel et durable auprès de leurs cibles. Nous croyons à la co-construction, à l'écoute active et à la proximité comme leviers essentiels pour bâtir des stratégies performantes et conquérir de nouveaux territoires.
            </p>
            
            <p className="information-paragraph">
              Agence de communication globale, PRISMA GROUPE associe depuis plus de
              17 ans conseil stratégique, création de contenu, marketing digital, événementiel, brand content et design, avec une approche agile.<br/>
              Nous activons nos expertises à travers une méthode unique PULP qui place l'utilité, le lien et le plaisir au cœur de chaque parcours de communication pour créer des expériences qui marquent.
            </p>
          </div>
          
          {/* Tagline content on the bottom right */}
          <div className="information-tagline-container">
            <h4 className="information-main-tagline">We create You lead</h4>
            <h4 className="information-tagline-item">We build, you grow</h4>
            <h4 className="information-tagline-item">We design, you shine</h4>
            <h4 className="information-tagline-item">We imagine, you inspire</h4>
          </div>
        </div>
      </div>
      
      <GoBack />
    </div>
  );
};

export default Informations;