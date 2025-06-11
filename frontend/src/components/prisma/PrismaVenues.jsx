import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import GoBack from "../action_buttons/GoBack";
import Footer from "../Footer";
import "../../styles/PrismaStyles/Venues.css";
import ScrollTop from "../action_buttons/ScrollTop";

const PrismaVenues = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/1234567890", "_blank");
  };

  return (
    <div className={`venues-app-container ${sidebarOpen ? "venues-sidebar-open" : ""}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className="venues-main-content">
        <div className="venues-page-container">
          {/* CTA Section */}
          <div 
            className="venues-cta-section" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaVenues/venues_s1.png")', marginLeft:'-3px', width: '101%' }}
          >
            <div className="venues-cta-content">
              <h2>Got a project? Let's talk</h2>
              <div className="venues-cta-divider"></div>
              <div className="venues-cta-buttons">
                <img
                  src="/src/assets/home/contact_buttons/white-contact.png"
                  alt="Contact Button"
                  onClick={handleContactClick}
                  className="venues-email-button"
                />
                <img
                  src="/src/assets/home/contact_buttons/white-whatsapp.png"
                  alt="WhatsApp Button"
                  onClick={handleWhatsAppClick}
                  className="venues-whatsapp-button"
                />
              </div>
              <p>L'expérience est la nouvelle valeur ajoutée,<br></br>Notre signature, PRISMA Venues </p>
            </div>
          </div>
          
          {/* Audio Section - Text on right */}
          <div 
            className="venues-content-section venues-right-text" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaVenues/venues_s2.png")' }}
          >
            <div className="venues-section-content">
              <h2>Des lieux pour vos idées,<br></br>
              Des cadres pour vos ambitions. </h2>
              <p>PRISMA VENUES est la solution idéale pour les entreprises et institutions à la recherche d'un cadre adapté à leurs événements professionnels.</p>
              <p>Congrès, séminaires, workshops, conférences, comités de direction, nous mettons à votre disposition une sélection d'espaces modernes, bien situés et entièrement équipés.</p>
              <p>Notre objectif est de vous offrir un lieu qui valorise votre image,
              renforce votre message et facilite votre organisation.  </p>
              <p>Notre équipe pluridisciplinaire met son expertise au service d'expériences uniques, porteuses de sens et d'impact. 
              Nous ne créons pas simplement des événements, nous créons des émotions, des connexions, et des opportunités de croissance</p>
            </div>
          </div>
          
          {/* Equipment Section - Centered text */}
          <div 
            className="venues-full-width-section" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaVenues/venues_s3.png")' }}
          >
            <h2>Créer l'exceptionnel, c'est notre quotidien</h2>
            <div className="venues-full-width-section-divider"></div>
            <p>Votre vision, Notre mission, Ensemble faisons sensation</p>
          </div>

          {/* Audio Section - Text on right */}
          <div 
            className="venues-content-section venues-right-text" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaVenues/venues_s4.png")' }}
          >
            <div className="venues-section-content">
              <h3>Offrez à vos événements le cadre <br></br>qu'ils méritent.</h3>
              <p>PRISMA VENUES met à votre disposition des lieux soigneusement sélectionnés pour accueillir toutes vos rencontres professionnelles et événements d'entreprise. Nos espaces sont pensés pour allier fonctionnalité, confort et image de marque, qu'il s'agisse de séminaires, de conférences, de congrès ou de réunions stratégiques.<br></br>
              Nous vous offrons des lieux modulables et élégants, des services logistiques et techniques entièrement intégrés, ainsi qu'un accompagnement sur-mesure de A à Z pour garantir la réussite de chaque moment clé.</p>
              
            </div>
          </div>
          
            {/* Audio Section - Text on right */}
          <div 
            className="venues-content-section venues-right-text" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaVenues/venues_s5.png")'}}
          >
            <div className="venues-section-content">
              <h2>Un engagement total pour des événements <br></br>inoubliables .</h2>
              <p>Avec PRISMA VENUES, concentrez-vous pleinement sur votre contenu, nous nous chargeons du contenant. Chaque lieu devient un véritable levier stratégique au service de votre événement. Nous vous proposons des espaces modulables, adaptés à toutes les configurations, avec des prestations intégrées incluant mobilier, équipements techniques, accueil et restauration. Notre équipe assure une logistique fluide et une coordination précise du début à la fin. Accessibles, élégants et parfaitement équipés, nos lieux offrent un cadre professionnel à la hauteur de vos ambitions.</p>
              
            </div>
          </div>
          
          {/* About Section - Text on left */}
          <div 
            className="venues-content-section venues-left-text" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaVenues/venues_s6.png")' }}
          >
            <div className="venues-section-content">
                <h3>L'expertise qui sublime vos événements</h3>
                <p>PRISMA Venues vous accompagne dans l'organisation de vos événements professionnels en mettant à votre disposition une sélection de lieux adaptés à vos besoins .</p>
                <p>Nous assurons l'aménagement sur mesure des espaces, la mise en place des équipements techniques (son, lumière, vidéo), ainsi qu'un accompagnement complet de la préparation jusqu'au jour J.</p>
                <p>Notre mission est de vous offrir un cadre professionnel, fonctionnel et valorisant, pour faire de chaque rencontre un véritable succès.</p>
                
            </div>
          </div>

          {/* Statistics Section */}
          <div 
            className="venues-stats-section" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaVenues/venues_s7.png")' }}
          >
            <h2>Venues en chiffres</h2>
            <div className="venues-stats-container">
              <div className="venues-stat-item">
                <div className="venues-stat-number">+250</div>
                <div className="venues-stat-label">collaborateurs</div>
              </div>
              <div className="venues-stat-item">
                <div className="venues-stat-number">+500</div>
                <div className="venues-stat-label">sites événementes</div>
              </div>
              <div className="venues-stat-item">
                <div className="venues-stat-number">+3000</div>
                <div className="venues-stat-label">événements accueillis</div>
              </div>
            </div>
          </div>

          {/* About Section - Text on left */}
          <div 
            className="venues-content-section venues-left-text" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaVenues/venues_s8.png")' }}
          >
            <div className="venues-section-content">
            <img src="/src/assets/home/contact_buttons/brown-cote.png"/>
              <p>
                Depuis plus de 17 ans, PRISMA Venues accompagne les marques, les institutions et les entreprises dans la création d'événements impactants, stratégiques et mémorables.
              </p>
              <p>
                Tant que experts en communication événementielle, nous transformons vos idées en expériences uniques.
              </p>
              <p>
                De la conception à la production, notre équipe vous offre un accompagnement sur mesure, avec passion, rigueur et créativité.
              </p>
            </div>
          </div>
          
        </div>
        <Footer sidebarOpen={sidebarOpen} />
        <ScrollTop/>
        <GoBack />
      </div>
      
    </div>
  );
};

export default PrismaVenues;