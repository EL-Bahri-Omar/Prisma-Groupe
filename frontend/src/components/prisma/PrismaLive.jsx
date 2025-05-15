import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import GoBack from "../action_buttons/GoBack";
import Footer from "../Footer";
import "../../styles/PrismaStyles/Live.css";

const PrismaLive = () => {
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
    <div className={`live-app-container ${sidebarOpen ? "live-sidebar-open" : ""}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className="live-main-content">
        <div className="live-page-container">
          {/* CTA Section */}
          <div 
            className="live-cta-section" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaLive/live_s1.png")' }}
          >
            <div className="live-cta-content">
              <h2>Got a project? Let's talk</h2>
              <div className="live-cta-divider"></div>
              <div className="live-cta-buttons">
                <img
                  src="/src/assets/home/contact_buttons/white-contact.png"
                  alt="Contact Button"
                  onClick={handleContactClick}
                  className="live-email-button"
                />
                <img
                  src="/src/assets/home/contact_buttons/white-whatsapp.png"
                  alt="WhatsApp Button"
                  onClick={handleWhatsAppClick}
                  className="live-whatsapp-button"
                />
              </div>
              <h3>Nous donnons vie à tous vos moments</h3>
            </div>
          </div>
          
          {/* Audio Section - Text on right */}
          <div 
            className="live-content-section live-right-text section-600 " 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaLive/live_s2.png")' }}
          >
            <div className="live-section-content">
              <h2>PRISMA Live </h2>
              <h3>Créez l’événement qui fait vibrer</h3>
              <p>
                PRISMA LIVE, c’est l’expertise des événements grand public à grande échelle.
              </p>
              <p>
                Nous imaginons, produisons et coordonnons des expériences live inoubliables,
                des concerts, des festivals, des shows en plein air ou des activations immersives.
              </p>
              <p>
                Chaque détail compte, chaque moment est pensé pour marquer les esprits.
              </p>
              <p>
                Conception artistique & scénographie créative<br></br>
                Équipements techniques dernière génération<br></br>
                Équipes passionnées, réactives et expérimentées
              </p>
            </div>
          </div>
          
          {/* Equipment Section - Centered text */}
          <div 
            className="live-full-width-section" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaLive/live_s3.png")' }}
          >
            <h2>SOLUTIONS POUR VOS ÉVÉNEMENTS</h2>
            <p>L’émotion en grand, l’événement en vrai</p>
          </div>

                  {/* Audio Section - Text on right */}
          <div 
            className="live-content-section live-right-text" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaLive/live_s4.png")' }}
          >
            <div className="live-section-content white">
              <h3>L’émotion au cœur de chaque événement</h3>
              <p>
                PRISMA LIVE, c’est la branche spectacle et événementiel grand format de PRISMA GROUPE.<br/>
                Spécialisée dans la conception et la production d’événements à forte visibilité, PRISMA LIVE transforme chaque projet en expérience vivante.
              </p>
              <p>
                Que ce soit pour un concert, un festival, un événement grand
                public ou un show immersif, notre équipe conjugue créativité
                artistique, maîtrise technique et logistique de terrain pour garantir
                un résultat spectaculaire.
              </p>
            </div>
          </div>

          {/* About Section - Text on left */}
          <div 
            className="live-content-section live-left-text" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaLive/live_s5.png")' }}
          >
            <div className="live-section-content">
              <h3>L’excellence au service de votre événement</h3>
              <p>
                Avec PRISMA Live, vous ne vous contentez pas d’organiser un
                événement, vous créez une véritable expérience.
              </p>
              <p>
                Grâce à une scénographie et une direction artistique sur mesure, nous donnons vie à vos idées avec une production technique complète, son, lumière, vidéo, effets spéciaux… Tout est pensé pour captiver.
              </p>
              <p>
                Nous assurons également la gestion des talents, des artistes et des animations live, tout en garantissant une coordination opérationnelle impeccable sur le terrain, grâce à des équipes formées et réactives.
              </p>
              <p>
                Faites de votre événement un spectacle inoubliable, un moment fédérateur et une signature forte.
              </p>
            </div>
          </div>
          
          {/* About Section - Text on left */}
          <div 
            className="live-content-section live-left-text" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaLive/live_s6.png")' }}
          >
            <div className="live-section-content">
              <p>
                Notre force réside dans notre capacité à allier direction artistique sur mesure et production technique
                de haut niveau. Son, lumière, vidéo, effets spéciaux, captation live tout est pris en charge par nos équipes
                formées et passionnées.<br/>
                Nous assurons également la gestion des talents artistes, performeurs, animateurs
                et la coordination opérationnelle complète sur le terrain, pour une exécution fluide, sécurisée et impactante.
              </p>
              <p>
                PRISMA Audiovisual propose une gamme complète de services techniques à forte valeur 
                ajoutée pour tous vos événements. De la conception à la réalisation des équipes 
                expertes vous garantissent des prestations sur mesure, innovantes et de haute qualité 
                dans le domaine de l'audiovisual.
              </p>
            </div>
          </div>

          {/* Equipment Section - Centered text */}
          <div 
            className="live-full-width-section" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaLive/live_s7.png")' }}
          >
            <h2 style={{color : 'white'}}>Une idée, un projet ? Transformons le en expérience</h2>
          </div>

          {/* Audio Section - Text on right */}
          <div 
            className="live-content-section live-right-text" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaLive/live_s8.png")' }}
          >
            <div className="live-section-content">
              <img src="/src/assets/home/contact_buttons/cote.png"/>
              <p>
                PRISMA LIVE est une filiale de PRISMA GROUPE spécialisée dans la création et la production
                d’événements grand public, culturels et immersifs. Notre mission est simple, transformer chaque
                idée en une expérience vivante, marquante et fédératrice. Nous croyons que l’événementiel est un
                art qui mêle émotion, technique et storytelling.<br/>
                Avec PRISMA LIVE, vos projets prennent vie à travers des scénographies créatives, des univers puissants
                et une production impeccable.
              </p>
            </div>
          </div>
          
        </div>
      </div>
      <Footer sidebarOpen={sidebarOpen} />
      <GoBack />
    </div>
  );
};

export default PrismaLive;