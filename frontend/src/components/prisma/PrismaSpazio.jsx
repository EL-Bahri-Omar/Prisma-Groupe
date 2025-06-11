import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import GoBack from "../action_buttons/GoBack";
import Footer from "../Footer";
import "../../styles/PrismaStyles/Spazio.css";
import ScrollTop from "../action_buttons/ScrollTop";

const PrismaSpazio = () => {
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
    <div className={`spazio-app-container ${sidebarOpen ? "spazio-sidebar-open" : ""}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className="spazio-main-content">
        <div className="spazio-page-container">
          {/* CTA Section */}
          <div 
            className="spazio-cta-section" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaSpazio/spazio_s1.png")' }}
          >
            <div className="spazio-cta-content">
              <h2>Got a project? Let's talk</h2>
              <div className="spazio-cta-divider"></div>
              <div className="spazio-cta-buttons">
                <img
                  src="/src/assets/home/contact_buttons/blue-contact.png"
                  alt="Contact Button"
                  onClick={handleContactClick}
                  className="spazio-email-button"
                />
                <img
                  src="/src/assets/home/contact_buttons/blue-whatsapp.png"
                  alt="WhatsApp Button"
                  onClick={handleWhatsAppClick}
                  className="spazio-whatsapp-button"
                />
              </div>
              <p>Aménagement, PLV, Design, Location de mobilier pour vos salons  et événements</p>
              <h3>TAKE</h3>
              <h3>A SEAT !</h3>
            </div>
          </div>

          {/* Spazio Section - Text on right */}
           <div 
            className="spazio-content-section spazio-right-text section-800" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaSpazio/spazio_s2.png")' }}
          >
            <div className="spazio-section-content">
              <h3 className="h800">L’élégance sur-mesure, <br/> même en plein air </h3>
              
              <p className="p800">
                Prisma Spazio transforme chaque espace en un lieu d’exception.<br/>
                Spécialisés dans la location et l’installation de chapiteaux et tentes événementielles, nous créons des structures sur-mesure pour accueillir tous vos événements. 
              </p>
              <p className="p800">
                Nos chapiteaux allient élégance, sécurité 
                et modularité, s’adaptant parfaitement à vos 
                besoins, quelle que soit la taille ou la nature de votre événement.
              </p>
              <p className="p800">
                Avec Prisma Spazio, offrez à vos invités un cadre unique, fonctionnel et esthétique, même en plein air.
              </p>
            </div>
          </div>
          
          {/* Equipment Section - Centered text */}
          <div 
            className="spazio-full-width-section" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaSpazio/spazio_s3.png")'}}
          >
            <h2>C’EST L’EXIGENCE QUI FAIT LA DIFFERENCE</h2>
            <div className="spazio-cta-dividers"></div>
            
          </div>
          
          {/* Equipment Section - Centered text */}
          <div 
            className="spazio-full-width-section" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaSpazio/spazio_s4.png")' }}
          >
          </div>

          {/* About Section - Text on left */}
          <div 
            className="spazio-content-section spazio-left-text" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaSpazio/spazio_s5.png")' }}
          >
            <div className="spazio-section-content">
              <h3>Les détails ne sont pas des détails,<br></br>
              ils font le design</h3>
              <p>
              Chez Prisma Spazio, nous croyons que chaque détail compte ce sont eux qui façonnent l’expérience. Animée par un esprit créatif et rigoureux, notre équipe conçoit des structures modulaires alliant design, robustesse et praticité.</p>
              <p>
              Chaque élément est pensé pour offrir une installation rapide, fluide et sans contrainte. Plug & play, même en grand format. Notre ambition, offrir à chaque client une solution élégante, fonctionnelle et parfaitement adaptée à son événement, quel que soit le lieu ou l’envergure.
              </p>
            </div>
          </div>

          {/* Spazio Mini Section */}
          <div className="spazio-mini-section">
            <h2>Transformer chaque espace en un lieu d’exception avec PRISMA Spazio</h2>
          </div>

           {/* Spazio Section - Text on right */}
           <div 
            className="spazio-content-section spazio-right-text" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaSpazio/spazio_s6.png")' }}
          >
            <div className="spazio-section-content">
            <img src="/src/assets/home/contact_buttons/y-cote.png"/>
              <h3 style={{color:'white'}}>Une gestion clé en main de vos projets</h3>
              
             
              <p className="white">De la conception à la réalisation, nous prenons en charge chaque étape chez <br></br>Prisma Spazio, nous nous occupons de tout, de la création du concept à <br></br>la mise en  place  de l’aménagement,  en passant par<br></br> 
              la  sélection des matériaux et des fournisseurs.</p>
              <p className="white">Notre équipe gère   également toute la logistique, <br></br>
                 l’installation et la coordination des différents intervenants pour garantir <br></br>un événement à la perfection . 
              </p>
              <p className="white">Nous vous  assurons une qualité irréprochable, dans des délais <br></br>optimisés, aﬁn que vous puissiez vous concentrer sur 
                 l’essentiel.
              </p>
            </div>
          </div>


          {/* New Services Grid Section */}
          <div 
            className="spazio-services-grid-section" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaSpazio/spazio_s7.png")' }}
          >
          </div>

           {/* About Section - Text on left */}
           <div 
            className="spazio-content-section spazio-left-text" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaSpazio/spazio_s8.png")' , height:'600px'}}
          >
            <div className="spazio-section-content">
              <h3>Transformer chaque espace en un lieu <br></br>
                d’exception avec PRISMA Spazio
              </h3>
              <div className="spazio-cta-divider"></div>
              <p className="gris">En tant que créateur d'espaces événementiels et fournisseur de <br></br>
              structures modulaires haut de gamme, PRISMA Spazio repousse les <br></br>
              limites de l’aménagement temporaire avec une expertise reconnue <br></br>
              et une vision résolument tournée vers l’innovation.</p>
              
              <p className="gris">Spécialisés dans la conception, la location et l’installation de <br></br>
              chapiteaux et tentes événementielles, nous combinons design élégant, ingénierie<br></br> fiable et modularité absolue pour offrir des solutions sur mesure adaptées <br></br>à tout type d’événement, en intérieur comme en <br></br>
              extérieur.</p>
              <p className="gris">Grâce à une logistique maîtrisée, une équipe expérimentée et une <br></br>
              capacité à s’adapter à chaque contexte, nous accompagnons nos clients dans la <br></br>création de lieux uniques, fonctionnels et impactants.</p> 
              

              <p className="gris">Notre approche flexible et créative garantit des installations <br></br>
                 sécurisées, esthétiques et durables, tout en assurant une parfaite <br></br>
                 cohérence avec l’identité de chaque événement.</p>
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

export default PrismaSpazio;
