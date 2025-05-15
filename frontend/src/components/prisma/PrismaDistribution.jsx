import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import GoBack from "../action_buttons/GoBack";
import Footer from "../Footer";
import "../../styles/PrismaStyles/Distribution.css";

const PrismaDistribution = () => {
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
    <div className={`distribution-app-container ${sidebarOpen ? "distribution-sidebar-open" : ""}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className="distribution-main-content">
        <div className="distribution-page-container">
          {/* CTA Section */}
          <div 
            className="distribution-cta-section" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaDistribution/distribution_s1.png")' }}
          >
            <div className="distribution-cta-content">
              <h2>Got a project? Let's talk</h2>
              <div className="distribution-cta-divider"></div>
              <div className="distribution-cta-buttons">
                <img
                  src="/src/assets/home/contact_buttons/white-contact.png"
                  alt="Contact Button"
                  onClick={handleContactClick}
                  className="distribution-email-button"
                />
                <img
                  src="/src/assets/home/contact_buttons/white-whatsapp.png"
                  alt="WhatsApp Button"
                  onClick={handleWhatsAppClick}
                  className="distribution-whatsapp-button"
                />
              </div>
              <h3>L’expertise audiovisuelle, de la vente à l’intégration</h3>
            </div>
          </div>
          
          {/* Audio Section - Text on right */}
          <div 
            className="distribution-content-section distribution-right-text" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaDistribution/distribution_s2.png")' }}
          >
            <div className="distribution-section-content">
              <h3>De l’équipement à l’intégration,<br/>une vision complète de projets</h3>
              <p>
                Prisma Distribution est un acteur incontournable dans le domaine de l’audiovisuel professionnel. Nous allions la vente d’équipements de haute performance à une expertise poussée en intégration audiovisuelle, broadcast et scénique. Depuis notre création, nous accompagnons les entreprises, institutions, lieux de culte, salles de spectacle et studios dans la conception et la mise en œuvre de solutions sur mesure, innovantes et durables.
              </p>
            </div>
          </div>

          {/* About Section - Text on left */}
          <div 
            className="distribution-content-section distribution-left-text section-550" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaDistribution/distribution_s3.png")' }}
          >
            <div className="distribution-section-content">
              <h3>Bien plus qu’un fournisseur,<br/> des architectes de solutions audiovisuelles</h3>
              <p>
                Chez Prisma Distribution, nous ne sommes pas de simples revendeurs. Nous sommes des architectes de solutions audiovisuelles, capables de piloter des projets complexes de la phase d’étude jusqu’à la livraison finale. Nous concevons et installons des systèmes audiovisuels sur mesure pour les salles de réunion, amphithéâtres, centres de conférence, hôtels et autres espaces professionnels. Nous intégrons également des solutions broadcast complètes pour les chaînes de télévision, studios de production et régies mobiles, avec une maîtrise totale des équipements de diffusion. Dans le domaine scénique, nous intervenons sur la machinerie, le contrôle lumière, la sonorisation et la vidéo, pour équiper les théâtres, auditoriums et lieux culturels. Enfin, notre pôle ingénierie développe des solutions techniques sur mesure, incluant études, modélisations 3D, connectiques spécifiques et automatisations. Chaque projet est pensé dans sa globalité, avec précision, exigence et innovation.
              </p>
            </div>
          </div>       
          <div className="line"></div>
          
          {/* Equipment Section - Centered text */}
          <div 
            className="distribution-full-width-section" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaDistribution/distribution_s4.png")' }}
          >
            <h2>Des solutions sur mesure pour un monde connecté</h2>
          </div>

          {/* About Section - Text on left */}
          <div 
            className="distribution-content-section distribution-left-text section-550" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaDistribution/distribution_s5.png")' }}
          >
            <div className="distribution-section-content margin">
              <h3>Des équipements de pointe,<br/> une approche 360°</h3>
              <p className="p">
                Notre catalogue rassemble une sélection rigoureuse des marques les plus performantes du marché, couvrant l’ensemble des besoins audiovisuels professionnels. Nous proposons des systèmes de sonorisation, consoles, microphones, écrans LED, vidéoprojecteurs, murs d’images, équipements de diffusion et d’enregistrement broadcast, caméras PTZ, mélangeurs vidéo, interphonie, ainsi que des régies audiovisuelles clés en main. Chaque projet bénéficie de notre expertise pour orienter les choix techniques en cohérence avec vos objectifs, qu’ils soient fonctionnels, esthétiques ou budgétaires. 
              </p>
            </div>
          </div>
          
          {/* About Section - Text on left */}
          <div 
            className="distribution-content-section distribution-left-text section-550" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaDistribution/distribution_s6.png")' }}
          >
            <div className="distribution-section-content margin">
              <p style={{width:'80%'}}>
                Chez Prisma Distribution, nous adoptons une approche globale, nous analysons vos besoins, concevons l’architecture de la solution, assurons la fourniture et l’installation des équipements, formons vos équipes à leur utilisation, et garantissons un support technique ainsi qu’une maintenance durable. <br/>
                Une véritable prise en charge 360° pour des installations fiables, évolutives et maîtrisées.
              </p>
            </div>
          </div>

          {/* Audio Section - Text on right */}
          <div 
            className="distribution-content-section distribution-right-text" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaDistribution/distribution_s7.png")' }}
          >
            <div className="distribution-section-content margin">
              <img src="/src/assets/home/contact_buttons/y-cote.png" />
              <h3>Une expertise qui fait la différence</h3>
              <p style={{width:'70%'}}>
                Choisir Prisma Distribution, c’est s’appuyer sur une expérience solide acquise à travers des projets variés, allant de simples auditoriums jusqu’aux studios de télévision à l’échelle nationale. C’est aussi bénéficier d’une créativité technique à forte valeur ajoutée, avec des solutions sur mesure conçues pour s’adapter parfaitement à votre espace, vos contraintes et votre vision.<br/>
                Enfin, c’est l’assurance d’un accompagnement fiable, assuré par une équipe compétente, réactive et engagée à chaque étape de votre projet.
              </p>
            </div>
          </div>      

          {/* Equipment Section - Centered text */}
          <div 
            className="distribution-full-width-section" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaDistribution/distribution_s8.png")' }}
          >
            <h2>Nos équipes, au cœur de chaque projet</h2>
            <p>
              Nos équipes sont notre plus grande force, Composées de techniciens spécialisés,<br/>
              d’ingénieurs passionnés et de coordinateurs expérimentés,elles unissent leurs expertises<br/>
              pour donner vie à des projets audiovisuels ambitieux et sur mesure.
            </p>
          </div>

        </div>
      </div>
      <Footer sidebarOpen={sidebarOpen} />
      <GoBack />
    </div>
  );
};

export default PrismaDistribution;