import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import GoBack from "../action_buttons/GoBack";
import Footer from "../Footer";
import "../../styles/PrismaStyles/Groupe.css";

const PrismaGroupe = () => {
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
    <div className={`groupe-app-container ${sidebarOpen ? "groupe-sidebar-open" : ""}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className="groupe-main-content">
        <div className="groupe-page-container">
          {/* CTA Section */}
          <div 
            className="groupe-cta-section" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaGroupe/groupe_s1.png")' }}
          >
            <div className="groupe-cta-content">
              <h2>Got a project? Let's talk</h2>
              <div className="groupe-cta-divider"></div>
              <div className="groupe-cta-buttons">
                <img
                  src="/src/assets/home/contact_buttons/blue-contact.png"
                  alt="Contact Button"
                  onClick={handleContactClick}
                  className="groupe-email-button"
                />
                <img
                  src="/src/assets/home/contact_buttons/blue-whatsapp.png"
                  alt="WhatsApp Button"
                  onClick={handleWhatsAppClick}
                  className="groupe-whatsapp-button"
                />
              </div>
              <h3>We don’t follow trends We build them</h3>
            </div>
          </div>

          {/* About Section - Text on left */}
          <div className="groupe-content-section groupe-left-text section-600" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaGroupe/groupe_s2.png")'}}
          >
            <div className="groupe-section-content">
              <h2>ADN</h2>
              <p className="p">
                Né en 2008 au cœur de l'écosystème entrepreneurial tunisien, PRISMA GROUPE s'est construit autour de profils passionnés, créatifs et parfois atypiques, unis par une même ambition, donner du sens à la communication et faire émerger des marques fortes, durables et engageantes.
              </p>
              <p className="p">
                Notre raison d'être : accompagner nos clients dans la création de valeur, en générant un engagement réel et durable auprès de leurs cibles. Nous croyons à la co-construction, à l'écoute active et à la proximité comme leviers essentiels pour bâtir des stratégies performantes et conquérir de nouveaux territoires.
              </p>
              <p className="p">
                Agence de communication globale, PRISMA GROUPE associe depuis plus de<br/>
                17 ans conseil stratégique, création de contenu, marketing digital, événementiel, brand content et design, avec une approche agile.<br/>
                Nous activons nos expertises à travers une méthode unique  PULP qui place l'utilité, le lien et le plaisir au cœur de chaque parcours de communication pour créer des expériences qui marquent.
              </p>
            </div>
            
            {/* Repositioned taglines div */}
            <div className="PGroupe-adn-taglines">
              <h4 className="PGroupe-adn-main-tagline">We create You lead</h4>
              <h4 className="PGroupe-adn-tagline-item">We build, you grow</h4>
              <h4 className="PGroupe-adn-tagline-item">We design, you shine</h4>
              <h4 className="PGroupe-adn-tagline-item">We imagine, you inspire</h4>
            </div>
          </div>
          
          {/* Equipment Section - Centered text */}
          <div 
            className="groupe-full-width-section" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaGroupe/groupe_s3.png")' }}
          >
            <p className="map">De l’idée à l’action une approche en 6 dimensions</p>
          </div>

          {/* About Section - Text on left */}
          <div 
            className="groupe-content-section groupe-left-text" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaGroupe/groupe_s4.png")' }}
          >
            <div className="groupe-section-content">
              <h3>Une organisation pensée pour l’impact</h3>
              <p>
                Chez PRISMA GROUPE, nous considérons la communication comme un levier de relation durable entre les marques et leurs publics. Notre philosophie repose sur l’écoute, la co-création 
                et l’exigence créative pour concevoir des projets authentiques, utiles et porteurs de sens.<br/>
                Engagés et passionnés, nous plaçons l’humain au cœur de chaque action, avec la volonté constante de générer de l’impact, de l’émotion et de la valeur sur le long terme.
              </p>
            </div>
          </div>

          {/* Audio Section - Text on right */}
          <div 
            className="groupe-content-section groupe-right-text" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaGroupe/groupe_s5.png")' }}
          >
            <div className="groupe-section-content">
              <img src="/src/assets/home/contact_buttons/b-cote.png"/>
              <h3>We create with purpose, we act for impact.</h3>
              <p>
                Chez PRISMA GROUPE, chaque projet est porté par une équipe de professionnels passionnés, à l’écoute, rigoureux et créatifs.
              </p>
              <p>
                Nous mettons notre expertise multidisciplinaire au service de vos objectifs pour transformer chaque idée en expérience marquante.
              </p>
              <p>
                De la stratégie à la réalisation, nous vous accompagnons à chaque étape avec exigence, précision et engagement.<br/>
                Parce que vos projets méritent bien plus qu’un simple prestataire, nous devenons votre partenaire de confiance.
              </p>
            </div>
          </div>
          
          {/* About Section - Text on left */}
          <div 
            className="groupe-content-section groupe-left-text" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaGroupe/groupe_s6.png")' }}
          >
            <div className="groupe-section-content">
              <h2>PULP ™</h2>
              <h3>La signature de notre communication</h3>
              <p>
                Chez PRISMA GROUPE, nous appliquons la méthode PULP pour guider chaque projet de communication avec clarté et impact. 
              </p>
              <p>
                PULP, c’est une approche qui allie Personnalité, en révélant l’identité unique de chaque marque, Utilité, en créant du contenu réellement pertinent, Lien, en renforçant la connexion entre la marque et ses publics, et Plaisir, en apportant une dimension émotionnelle et mémorable à chaque expérience. 
              </p>
              <p>
                Cette méthode nous permet de concevoir des stratégies vivantes, efficaces et durables, au service d’une communication qui a du sens.
              </p>
            </div>
          </div>

          {/* Equipment Section - Centered text */}
          <div 
            className="groupe-full-width-section" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaGroupe/groupe_s7.png")' }}
          >
            <h2>ENVIRONNEMENT, SOCIÉTÉ ET RESPONSABILITÉ SOCIÉTALE D'ENTREPRISE</h2>
          </div>

          {/* About Section - Text on left */}
          <div 
            className="groupe-content-section groupe-left-text" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaGroupe/groupe_s8.png")' }}
          >
            <div className="groupe-section-content">
              <h3>Penser demain Agir aujourd’hui</h3>
              <p>
                Chez Prisma, nous plaçons la durabilité au cœur de nos actions. Chaque projet est pensé pour minimiser son impact environnemental, valoriser les ressources locales et encourager une consommation responsable, Parce que créer aujourd’hui, c’est aussi penser à demain.
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

export default PrismaGroupe;