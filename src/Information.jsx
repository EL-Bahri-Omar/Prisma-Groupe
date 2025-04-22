import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ScrollToTop from './ScrollToTop';
import './information.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCalendarAlt, faDesktop, faUsers } from "@fortawesome/free-solid-svg-icons";
import sameTeamImage from './assets/info1.png';
import teamImage from './assets/info2.png';

const Informations = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
    
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
    <div className="main-content">
      <div className="informations-container">
        {/* First Section: The SAME TEAM */}
        <section className="information-content-section">
          <div className="information-content-wrapper">
            <div className="information-text-content">
              <h2>The</h2>
              <h1 className="information-section-title">SAME TEAM</h1>
              <p className="information-section-description">
                Basée à Tunis depuis 2003, nous sommes une équipe de créatifs expérimentés, chaque jour nous relevons des défis et nous concevons des dispositifs digitaux originaux pour des clients uniques, nous leurs apportons le mix interactif adéquat pour la réussite de leurs démarches.
              </p>
            </div>
            
            <div className="information-image-content">
              <img src={sameTeamImage} alt="Agence digitale indépendante depuis 2003" className="information-section-image" />
            </div>
          </div>

          {/* Full-width Stats Cards with Floating Icons */}
          <div className="information-full-width-stats">
            <div className="information-stat-card">
              <div className="information-stat-icon-container">
                <div className="information-stat-icon">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </div>
              </div>
              <div className="information-stat-card-content">
                <span className="information-stat-card-value">13</span>
                <span className="information-stat-card-label">ANS DE PROJETS DIGITAUX</span>
              </div>
            </div>

            <div className="information-stat-card">
              <div className="information-stat-icon-container">
                <div className="information-stat-icon">
                  <FontAwesomeIcon icon={faDesktop} />
                </div>
              </div>
              <div className="information-stat-card-content">
                <span className="information-stat-card-value">+470</span>
                <span className="information-stat-card-label">DISPOSITIFS CRÉÉS</span>
              </div>
            </div>

            <div className="information-stat-card">
              <div className="information-stat-icon-container">
                <div className="information-stat-icon">
                  <FontAwesomeIcon icon={faUsers} />
                </div>
              </div>
              <div className="information-stat-card-content">
                <span className="information-stat-card-value">320</span>
                <span className="information-stat-card-label">CLIENTS SATISFAITS</span>
              </div>
            </div>
          </div>
        </section>

        {/* Second Section: The TEAM */}
        <section className="information-content-section">
          <div className="information-content-wrapper">
            <div className="information-text-content">
              <h2>The</h2>
              <h2 className="information-section-title">TEAM</h2>
              <p className="information-section-subtitle">Une équipe de créatifs expérimentés et passionnés</p>
              <p className="information-section-description">
                Issus d'une subtile alchimie entre marketing, communication et technologie, nous décryptons les tendances, nous anticipons les évolutions et nous innovons chaque jour pour accompagner nos clients tout au long de leur démarche.
              </p>
              <p className="information-section-description">
                Ce qui nous anime et nous motive chaque jour c'est de travailler en étroite collaboration avec nos clients, le plaisir d'exercer un métier qui doit rester avant tout une passion. C'est cette passion qui guide chacun de nous vers l'excellence.
              </p>
            </div>
            
            <div className="information-image-content">
              <img src={teamImage} alt="Créatifs expérimentés et passionnés" className="information-section-image" />
            </div>
          </div>
        </section>

        {/* Third Section: Pourquoi SAME TEAM? */}
        <section className="information-why-section">
          <div className="information-why-content">
            <h2 className="information-section-title">Pourquoi SAME TEAM ?</h2>
            <p className="information-section-description">
              La réussite de nos préconisations tient tout autant à la qualité de nos idées, au soin et à la rigueur apportés à leur réalisation, à la variété de nos prestations, qu'à la présence d'une équipe investie et réactive à vos côtés.
            </p>

            <div className="information-values-container">
              <div className="information-value-item">
                <h3>Ethique et Professionnalisme</h3>
                <p>Disponibles et réactifs, nous nous distinguons par notre minutie, notre efficacité et notre transparence quant au traitement de votre dossier.</p>
              </div>

              <div className="information-value-item">
                <h3>Un savoir faire intégré</h3>
                <p>Nous intégrons votre stratégie et votre culture d'entreprise. Notre équipe qualifiée, notre méthodologie et notre creativité constituent la garantie de nos prestations.</p>
              </div>

              <div className="information-value-item">
                <h3>De la pédagogie dans la conduite de projets</h3>
                <p>Nous nous occupons de la maîtrise d'œuvre totale de votre projet. À l'écoute de vos besoins et de vos attentes, nous travaillons en partenariat avec votre équipe, avant, pendant et après la mise en place de votre dispositif.</p>
              </div>
            </div>
          </div>
        </section>

        <button className="information-scroll-to-top-button" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} className="information-arrow-icon" />
        </button>
      </div>
      
        <ScrollToTop />
    </div>
    </div>
  );
};

export default Informations;