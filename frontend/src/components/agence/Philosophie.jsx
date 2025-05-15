import React, { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import GoBack from '../action_buttons/GoBack';
import './../../styles/philosophie.css';

const Philosophie = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className="main-content">
        <div className="philosophie-container">
          <div className="philosophie-text-overlay">
            <h3 className="philosophie-heading">Une organisation pensée pour l'impact</h3>
            
            <p className="philosophie-paragraph">
              Chez PRISMA GROUPE, nous considérons la communication comme un levier de relation durable entre les marques et leurs publics. Notre philosophie repose sur l'écoute, la co-création et l'exigence créative pour concevoir des projets authentiques, utiles et porteurs de sens.
            </p>
            
            <p className="philosophie-paragraph">
              Engagés et passionnés, nous plaçons l'humain au cœur de chaque action, avec la volonté constante de générer de l'impact, de l'émotion et de la valeur sur le long terme.
            </p>
          </div>
        </div>
      </div>
      
      <GoBack />
    </div>
  );
};

export default Philosophie;