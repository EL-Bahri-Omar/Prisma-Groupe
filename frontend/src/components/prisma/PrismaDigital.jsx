import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import GoBack from "../action_buttons/GoBack";
import Footer from "../Footer";
import "../../styles/PrismaStyles/Digital.css";
import ScrollTop from "../action_buttons/ScrollTop";

const PrismaDigital = () => {
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
    <div className={`digital-app-container ${sidebarOpen ? "digital-sidebar-open" : ""}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className="digital-main-content">
        <div className="digital-page-container">
          {/* CTA Section */}
          <div 
            className="digital-cta-section" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaDigital/digital_s1.png")' }}
          >
            <div className="digital-cta-content">
              <h2>Got a project? Let's talk</h2>
              <div className="digital-cta-divider"></div>
              <div className="digital-cta-buttons">
                <img
                  src="/src/assets/home/contact_buttons/white-contact.png"
                  alt="Contact Button"
                  onClick={handleContactClick}
                  className="digital-email-button"
                />
                <img
                  src="/src/assets/home/contact_buttons/white-whatsapp.png"
                  alt="WhatsApp Button"
                  onClick={handleWhatsAppClick}
                  className="digital-whatsapp-button"
                />
              </div>
              <h3>Le digital, avec du sens et de l’impact
              </h3>
            </div>
          </div>
          
        {/* About Section - Modified Layout */}
        <div 
        className="digital-content-section" 
        style={{ 
            backgroundImage: 'url("/src/assets/home/PrismaDigital/digital_s2.png")'}}
        >
        {/* Text Content on Left */}
        <div className="digital-section-content" style={{
            width: '50%',
            padding: '0 5%'
        }}>
            <h3>L'innovation au cœur de vos connexions</h3>
            <p>
            PRISMA DIGITALE conçoit et déploie des stratégies digitales agiles, créatives et orientées performance.<br />
            Notre pôle réunit des experts du contenu, des médias sociaux, de la publicité digitale, du développement web et de l'innovation technologique.<br />
            Nous aidons les marques à émerger, à dialoguer avec leurs publics et à se développer dans un monde en constante évolution.<br />
            Du storytelling à l'activation, chaque action est pensée pour générer de l'impact, du lien et de la valeur.
            </p>
        </div>

        {/* Tagline on Right */}
        <div className="digital-tagline-container" style={{
            position: 'absolute',
            right: '9%',
            bottom: '20%',
            textAlign: 'center',
            maxWidth: '90%'
        }}>
            <div className="digital-tagline">
              <span className="digital-tagline-main">Think digital, act human</span>
              <span className="digital-tagline-sub">Des solutions technologiques avec une touche humaine</span>
            </div>
        </div>
        </div>


<div 
  className="digital-full-width-section text-overlay-container" 
  style={{ backgroundImage: 'url("/src/assets/home/PrismaDigital/digital_s3.png")' }}
>
  {/* Superposition de texte */}
  <div className="text-overlay">
        <div className="think-text" >think</div>
        <div className="outside-text">outside</div><br></br><br></br><br></br><br></br><br></br> <br />
          <div className="box-container" style={{marginLeft: '100px'}}>
          <div className="the-text"></div>
          <div className="box-text"></div>
        </div>
      </div>
</div>
          {/* About Section - Text on left */}
          <div 
            className="digital-content-section digital-left-text" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaDigital/digital_s4.png")' }}
          >
            <div className="digital-section-content">
                <h3>Au cœur de notre impact</h3>
              <p>Notre force réside dans notre capacité à allier stratégie, créativité et technologie pour générer de véritables leviers de croissance.<br></br>
                 Nous pensons chaque projet digital comme un écosystème vivant, où le contenu, les plateformes, les audiences et les objectifs se rencontrent pour créer de la performance mesurable.<br></br>
                 Notre équipe pluridisciplinaire anticipe les tendances, maîtrise les outils et s’adapte en temps réel aux évolutions du marché digital.<br></br>
                 C’est cette agilité, cette vision globale et cette exigence de résultats qui font de PRISMA DIGITAL un partenaire digital à forte valeur ajoutée.</p>
                            
            </div>
          </div>

         {/* Modified Section - Image on right, text on left */}
<div 
  className="digital-content-section digital-right-text section-600" 
  style={{ backgroundImage: 'url("/src/assets/home/PrismaDigital/digital_s5.png")' }}
>
  <div className="digital-section-content">
    <h3>L’innovation au cœur de vos plateformes</h3>
    <p>Chez PRISMA DIGITALE, nous concevons des plateformes sur mesure, pensées pour allier performance technique, fluidité d’expérience et impact visuel.<br></br>
       Sites web, applications, interfaces e-commerce ou plateformes interactives : chaque solution est développée selon les besoins spécifiques de nos clients et les attentes de leurs utilisateurs.<br></br>
       De l’architecture à l’UX/UI design, du développement à l’optimisation SEO, nous intégrons chaque étape avec exigence et agilité.<br></br>
       Notre objectif : créer des outils digitaux durables, évolutifs et parfaitement alignés avec votre stratégie de marque.
    </p>
   
  </div>
</div>
          
          {/* About Section - Text on left */}
          <div 
            className="digital-content-section digital-left-text" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaDigital/digital_s6.png")' }}
          >
            <div className="digital-section-content">
            <img src="/src/assets/home/contact_buttons/pink-cote.png"/>
              <h3>Le contenu attire, La stratégie engage,<br/>L’expérience fidélise</h3>
              <p>
              Nous croyons que la réussite d’une marque dans l’univers numérique repose sur un équilibre subtil entre contenu, stratégie et expérience. Le contenu attire en captivant l’attention grâce à des messages forts, des formats innovants et une identité visuelle maîtrisée. La stratégie engage en donnant du sens, en connectant la marque à ses publics au bon moment, sur les bons canaux. Et l’expérience fidélise en offrant des parcours digitaux fluides, intuitifs et mémorables. En combinant créativité, agilité et expertise technologique, nous concevons des dispositifs digitaux sur mesure, pensés pour performer durablement dans un monde en mouvement.
              </p>
              
            </div>
          </div>

          {/* Equipment Section - Centered text */}
          <div 
            className="digital-full-width-section" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaDigital/digital_s7.png")' }}
          >
            <h2>We drive digital impact</h2>
            <p>Des stratégies connectées, des résultats concrets
            </p>
          </div>
  
        </div>
        <Footer sidebarOpen={sidebarOpen} />
        <ScrollTop/>
        <GoBack />
      </div>
      
    </div>
  );
};

export default PrismaDigital;