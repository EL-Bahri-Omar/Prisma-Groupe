import React, { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import GoBack from '../action_buttons/GoBack';
import './../../styles/philosophie.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ScrollTop from "../action_buttons/ScrollTop";

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
          {/* First Section: Notre Philosophie */}
          <section className="philosophie-content-section">
            <div className="philosophie-header-container">
              <div className="philosophie-title-wrapper">
                <h1 className="philosophie-main-title">Notre Philosophie</h1>
                <div className="philosophie-title-line"></div>
              </div>
              <div className="philosophie-description-wrapper">
                <p className="philosophie-main-description">
                  Répondre <strong>Efficacement</strong> aux<br />
                  Besoins Fondamentaux des<br />
                  <span>Communautés Professionnelles :</span>
                </p>
                
              </div>
            </div>

            {/* Philosophy Cards */}
            <div className="philosophie-table-container">
              <div className="philosophie-cards-container">
                <div className="philosophie-card">
                  <h3 className="philosophie-card-title">Move</h3>
                  <p className="philosophie-card-content">
                    Millisimo Experience assure une gestion experte des voyages d'affaires et des activités pour les oeuvres sociales. Nos services...
                  </p>
                  <button className="philosophie-card-button">
                    <FontAwesomeIcon icon={faArrowRight} className="philosophie-arrow-icon" />
                  </button>
                </div>

                <div className="philosophie-card">
                  <h3 className="philosophie-card-title">Meet</h3>
                  <p className="philosophie-card-content">
                    Millisimo Experience choisit avec rigueur des hôtels, restaurants, et centres de conférences conformes aux normes de compliance...
                  </p>
                  <button className="philosophie-card-button">
                    <FontAwesomeIcon icon={faArrowRight} className="philosophie-arrow-icon" />
                  </button>
                </div>

                <div className="philosophie-card">
                  <h3 className="philosophie-card-title">Connect</h3>
                  <p className="philosophie-card-content">
                    Millisimo Experience enrichit les événements MCE en combinant connexions humaines et digitales. Grâce à nos technologies avancées...
                  </p>
                  <button className="philosophie-card-button">
                    <FontAwesomeIcon icon={faArrowRight} className="philosophie-arrow-icon" />
                  </button>
                </div>

                <div className="philosophie-card">
                  <h3 className="philosophie-card-title">Share</h3>
                  <p className="philosophie-card-content">
                    Millisimo Experience organise des événements conçus pour faciliter un partage judiciaire du savoir et de l'information. Nos initiatives...
                  </p>
                  <button className="philosophie-card-button">
                    <FontAwesomeIcon icon={faArrowRight} className="philosophie-arrow-icon" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Second Section: Notre ADN */}
          <section className="philosophie-adn-section">
            <div className="philosophie-adn-header">
                <div className="philosophie-adn-line"></div>
                <h1 className="philosophie-adn-title">Notre ADN</h1>
            </div>
            <p className="philosophie-adn-description">
                Parmi les leaders incontestés de l'industrie du tourisme d'affaires et de l'événementiel, nous sommes le partenaire idéal pour créer des expériences mémorables et pérennes, tout en alignant nos actions sur les stratégies et les normes professionnelles de nos partenaires. Notre présence régionale nous permet de répondre aux besoins spécifiques de chaque marché. Avec une approche personnalisée et une maîtrise totale de la chaîne de valeur : « One-Stop-Solutions ». Nous garantissons une intégration fluide avec les objectifs de nos clients, renforçant ainsi notre engagement envers l'excellence et l'innovation, tout en demeurant fermement attachés à nos valeurs éthiques et en adoptant des pratiques durables.
            </p>

            {/* Vision, Mission, Values */}
            <div className="philosophie-values-container">
              <div className="philosophie-value-box">
                <div className="philosophie-value-header">
                  <div className="philosophie-value-img"><img src="/src/assets/philosophie/vision.png" alt="vision"/></div>
                </div>
                <p className="philosophie-value-content">
                  <strong>Élever les expériences humaines dans le monde professionnel, rendant chaque moment unique et mémorable.</strong>
                </p>
              </div>

              <div className="philosophie-value-box">
                <div className="philosophie-value-header">
                  <div className="philosophie-value-img"><img src="/src/assets/philosophie/mission.png" alt="vision"/></div>
                </div>
                <p className="philosophie-value-content">
                  <strong>Développer des expériences positives, efficientes et responsables pour nos partenaires et leurs communautés.</strong>
                </p>
              </div>

              <div className="philosophie-value-box">
                <div className="philosophie-value-header">
                  <div className="philosophie-value-img"><img src="/src/assets/philosophie/valeurs.png" alt="vision"/></div>
                </div>
                <div className="philosophie-values-grid">
                  <div className="philosophie-single-value">
                    <h3 className="philosophie-value-name">Engagement</h3>
                  </div>
                  <div className="philosophie-single-value">
                    <h3 className="philosophie-value-name">Collaboration</h3>
                  </div>
                  <div className="philosophie-single-value">
                    <h3 className="philosophie-value-name">Innovation</h3>
                  </div>
                  <div className="philosophie-single-value">
                    <h3 className="philosophie-value-name">Efficience</h3>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>       
        
      </div>
      <ScrollTop />
      <GoBack />
    </div>
  );
};

export default Philosophie;