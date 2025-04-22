import React, { useState } from 'react';
import Sidebar from '../Sidebar'; // Importez le composant Sidebar
import GoBack from '../GoBack'; // Importez le composant GoBack
import '../App.css'; // Assurez-vous d'importer App.css
import { useNavigate } from 'react-router-dom'; // Pour la redirection
import Footer from "../Footer";

const PrismaGroupe = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // État pour gérer l'ouverture/fermeture de la sidebar
  const navigate = useNavigate(); // Hook pour la navigation

  // Fonction pour basculer l'état de la sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fonction pour rediriger vers la page de contact
  const handleContactClick = () => {
    navigate('/contact'); // Redirige vers la page de contact
  };

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Barre latérale */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className="main-content">
        <div className="explore-container">
          {/* Section de texte avec arrière-plan et animation */}
          <div className="text-section">
            <div className="text-content">
              <h1>PRISMA GROUPE</h1>
              <p className="website-link">WWW.PRISMAGROUPE.COM</p>
              <h2>Innovation et Conseil Technologique</h2>
              <p className="description">
                Prisma Groupe est un leader dans le domaine de l'innovation et du conseil technologique. Depuis 2005, nous accompagnons nos clients dans la transformation digitale, l'optimisation des processus et la mise en œuvre de solutions technologiques de pointe. Notre mission est de créer un impact durable grâce à l'innovation.
              </p>
              {/* Bouton "Contactez-nous" */}
              <button className="contact-button" onClick={handleContactClick}>
                Contactez-nous
              </button>
            </div>
          </div>

          {/* Section des deux images côte à côte */}
          <div className="two-images-section">
            <div className="image-container">
              <img src="/src/assets/digital-transformation.jpg" alt="Transformation Digitale" className="small-image" />
              <p className="image-description">
                Nous aidons les entreprises à adopter des technologies modernes pour une transformation digitale réussie.
              </p>
            </div>
            <div className="image-container">
              <img src="/src/assets/tech-consulting.jpg" alt="Conseil Technologique" className="small-image" />
              <p className="image-description">
                Nos experts en conseil technologique vous guident dans la sélection et la mise en œuvre des meilleures solutions.
              </p>
            </div>
          </div>

          {/* Section avec une seule image et description */}
          <div className="text-section-one">
            <div className="image-container">
              <img src="/src/assets/innovation-lab.jpg" alt="Laboratoire d'Innovation" className="small-image" />
              
            </div>
          </div>

          {/* Section des deux images côte à côte */}
          <div className="two-images-section">
            <div className="image-container">
              <img src="/src/assets/success-story.jpg" alt="Collaboration d'Équipe" className="small-image" />
              
            </div>
            <div className="image-container">
              <img src="/src/assets/future-tech.webp" alt="Technologie du Futur" className="small-image" />
          
            </div>
          </div>
          <Footer/>

          {/* Section avec une seule image et description */}
          <div className="text-section-too">
            <div className="image-container">
              <img src="/src/assets/team-collaboration.png" alt="Histoire de Succès" className="small-image" />
              <p className="image-description">
                Notre équipe travaille en étroite collaboration pour vous offrir des solutions sur mesure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ajoutez le composant GoBack ici */}
      <GoBack />
    </div>
  );
};

export default PrismaGroupe;