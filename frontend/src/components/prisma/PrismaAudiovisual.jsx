import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import GoBack from "../action_buttons/GoBack";
import Footer from "../Footer";
import "../../styles/PrismaStyles/AudioVisual.css";

const PrismaAudioVisual = () => {
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
    <div className={`audio-app-container ${sidebarOpen ? "audio-sidebar-open" : ""}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className="audio-main-content">
        <div className="audio-page-container">
          {/* CTA Section */}
          <div 
            className="audio-cta-section" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaAudioVisual/audio_s1.png")' }}
          >
            <div className="audio-cta-content">
              <h2>Got a project? Let's talk</h2>
              <div className="audio-cta-divider"></div>
              <div className="audio-cta-buttons">
                <img
                  src="/src/assets/home/contact_buttons/white-contact.png"
                  alt="Contact Button"
                  onClick={handleContactClick}
                  className="audio-email-button"
                />
                <img
                  src="/src/assets/home/contact_buttons/white-whatsapp.png"
                  alt="WhatsApp Button"
                  onClick={handleWhatsAppClick}
                  className="audio-whatsapp-button"
                />
              </div>
              <h3>PRISMA Audiovisual</h3>
              <p>Votre partenaire technique pour des événements inoubliables.<br></br><br></br>
                PRISMA Audiovisual propose une gamme complète de services techniques à forte valeur ajoutée pour tous vos événements.<br></br>
                De la conception à la réalisation, nos équipes expertes vous garantissent des prestations sur-mesure, innovantes et de haute qualité dans le domaine de l’audiovisual.
              </p>
            </div>
          </div>

          
          {/* Equipment Section - Centered text */}
          <div 
            className="audio-full-width-section" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaAudioVisual/audio_s2.png")' }}
          >
            <h2>DÉCOUVRIR NOTRE NOUVEAU MATÉRIEL AUDIOVISUAL</h2>
            <p>UNE SÉLECTION D'ÉQUIPEMENT DE QUALITÉ</p>
          </div>

          <div className="line"></div>

          {/* New Services Grid Section */}
          <div 
            className="audio-services-grid-section" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaAudioVisual/audio_s3.png")' }}
          >
          </div>

          <div className="line margin-line"></div>

          {/* About Section - Text on left */}
          <div 
            className="audio-content-section audio-left-text" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaAudioVisual/audio_s4.png")' }}
          >
            <div className="audio-section-content">
              <h2>VIDÉO</h2>
              <h3>OFFREZ À VOTRE ÉVÉNEMENT UNE QUALITÉ <br/> D’IMAGE EXCEPTIONNELLE</h3>
              <p style={{width:'90%'}}>
              Pour sublimer votre événement et maximiser son impact visuel, PRISMA Audiovisual met à votre disposition une large gamme de solutions vidéo adaptées à tous les niveaux de complexité,<br></br> 
              de l'installation d’écrans LED ou LCD à la mise en place de systèmes de vidéoprojection panoramique, en passant par la captation et la retransmission en direct de vos contenus.
              </p>
              <p style={{width:'90%'}}>
              Aux côtés de nos clients, nos experts conçoivent des dispositifs vidéo sur-mesure, parfaitement alignés avec les objectifs et le format de chaque événement.
              </p>
             
            </div>
          </div>

          <div className="line"></div>

          {/* About Section - Text on left */}
          <div 
            className="audio-content-section audio-left-text section-600" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaAudioVisual/audio_s5.png")' }}
          >
            <div className="audio-section-content">
              <h2>SON</h2>
              <h3>UNE EXPÉRIENCE SONORE CLAIRE <br></br>ET IMMERSIVE</h3>
              <p style={{width:'90%', fontSize:'1.2rem', lineHeight:'1.1'}}>Un bon son est essentiel à la réussite de tout événement, PRISMA Audiovisual vous propose des solutions audio sur-mesure, adaptées à vos espaces et à vos besoins.</p>
              <p style={{width:'90%', fontSize:'1.2rem', lineHeight:'1.1'}}>De la sonorisation simple d’une conférence à la mise en place de systèmes audio multizones pour des événements de grande envergure, nos équipements de pointe garantissent une restitution sonore optimale.</p>
              <p style={{ width: '90%', fontSize: '1.2rem', lineHeight: '1.1' }}>Nos ingénieurs de son travaillent à vos côtés pour créer une ambiance sonore fluide, équilibrée, parfaitement synchronisée avec votre contenu et votre public.</p>
              <div className="line"style={{width:'130%', marginLeft:'-80px', marginTop:'136px'}}></div>
            </div>
          </div>

           <div className="line"></div>
          
          {/* Audio Section - Text on right */}
          <div 
            className="audio-content-section audio-right-text" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaAudioVisual/audio_s6.png")' }}
          >
            <div className="audio-section-content">
              <h2>LUMIÈRE</h2>
              <h3>SUBLIMEZ VOS ÉVÉNEMENTS <br></br>
              AVEC UNE MISE EN LUMIÈRE SUR-MESURE</h3>
              <p style={{width:'90%', fontSize:'1.2rem', lineHeight:'1.1'}}>La lumière donne le ton, l’ambiance et valorise chaque moment de votre événement.<br/>
              PRISMA Audiovisual conçoit des mises en lumière artistiques et techniques adaptées à votre scénographie, des projecteurs LED, éclairage architectural, effets dynamiques, gestion DMX… tout est pensé pour renforcer l’impact visuel et émotionnel de vos instants clés.</p>
              <p style={{width:'90%', fontSize:'1.2rem', lineHeight:'1.1'}}>Nos experts lumière vous accompagnent dans la création d’univers lumineux cohérents, élégants et parfaitement maîtrisés.</p>
              <div className="line"style={{width:'130%', marginLeft:'-80px', marginTop:'54px'}}></div>
            </div>
          </div>

          <div className="line"></div>
          
            {/* About Section - Text on left */}
            <div 
            className="audio-content-section audio-left-text section-600" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaAudioVisual/audio_s7.png")' }}
            >
            <div className="audio-section-content">
              <h2>INTERPRÉTATION SIMULTANÉE</h2>
              <h3>UNE TECHNOLOGIE NUMÉRIQUE AVANCÉE POUR<br></br>
              UNE EXPÉRIENCE D’ÉCOUTE DE HAUTE QUALITÉ</h3>
              <p>Depuis plus de 17ans PRISMA Audiovisual propose des<br></br> solutions d’interprétation simultanée dans le cadre de <br></br>congrès, colloques, rencontres internationales, sommets,<br></br> conférences, symposiums, visites guidées…</p>
              <p>L’interprétation simultanée exige une assistance<br></br>
                 technique performante. C’est pourquoi nous vous<br></br>
                 offrons notre savoir-faire unique pour garantir le succès<br></br>
                 de votre événement. 
              </p>
              <p>Nos valeurs fondamentales sont concentrées sur la réponse <br></br>
                 à vos besoins spécifiques, pour chaque phase de votre événement.
              </p>
              <div className="line"style={{width:'130%', marginLeft:'-80px', marginTop:'30px'}}></div>
            </div>
          </div>

           {/* Equipment Section - Centered text */}
           <div 
            className="audio-full-width-section" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaAudioVisual/audio_s8.png")' }}
          >
            <h2>L’émotion en image, le message en son</h2>
          </div>
          {/* Audio Section - Text on right */}
          <div 
            className="audio-content-section audio-right-text" 
            style={{ backgroundImage: 'url("/src/assets/home/PrismaAudioVisual/audio_s9.png")' }}
          >
            <div className="audio-section-content wide">
            <img src="/src/assets/home/contact_buttons/purple-cote.png"/>
              <h3>AUDIOVISUAL, <br/> FAIRE VIVRE VOTRE ÉVÉNEMENT</h3>
              <p className="p">PRISMA Audiovisual est votre partenaire de confiance dans tous les métiers à forte valeur technologique de l’événementiel. Depuis plus de 17 ans, nos équipes de spécialistes mettent leur expertise au service de vos projets, en vous proposant des prestations audiovisuelles globales, sur mesure et de haute qualité. Grâce à un parc de matériel régulièrement renouvelé, nous vous garantissons des équipements récents, performants et à la pointe de l’innovation, pour des expériences inoubliables.</p>
            </div>
          </div>
          
        </div>
      </div>
      <Footer sidebarOpen={sidebarOpen} />
      <GoBack />
    </div>
  );
};

export default PrismaAudioVisual;
