import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import GoBack from './GoBack';
import ScrollTop from './ScrollTop';
import './styles/ProjectDetails.css';

// Import images directly
import img1 from './assets/references/10_min.jpg';
import img2 from './assets/references/2_min.jpg';
import img3 from './assets/references/3_min.jpg';
import img4 from './assets/references/4_min.jpg';
import img5 from './assets/references/5_min.jpg';

const ProjectDetails = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Sample project data with correct image paths
  const projects = [
    {
      id: 1,
      title: "Site web d'Université",
      category: "education",
      description: "Une refonte rafraîchissante de votre site web événementiel conçu avec un design élégant et contemporain qui saura captiver et engager vos participants.",
      date: "15.03.2023",
      mainImage: img1, // Using imported image
      content: "Notre équipe a développé une refonte complète du site universitaire, avec un focus particulier sur l'expérience utilisateur et la facilité de navigation. Le nouveau design répond aux besoins spécifiques des différents utilisateurs : étudiants, enseignants, personnel administratif et visiteurs. Nous avons intégré un système de gestion de contenu personnalisé qui permet aux administrateurs de mettre à jour facilement les informations sur les programmes, les événements et les actualités du campus. Le site est entièrement responsive et optimisé pour tous les appareils, garantissant une expérience cohérente que ce soit sur desktop, tablette ou mobile.",
      images: [img1, img2, img3, img4, img5] // Using imported images
    },
    {
      id: 2,
      title: "Site Internet / Extranet Clients",
      category: "web",
      description: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maceenas vel lacinia ipsum, nec fermentum diam.",
      date: "22.09.2022",
      mainImage: img2, // Using imported image
      content: "Nous avons développé une solution complète intégrant un site Internet public et un extranet client sécurisé. L'interface publique présente l'entreprise et ses services dans un design moderne et intuitif, tandis que l'extranet offre aux clients un espace personnalisé pour accéder à leurs documents, suivre leurs projets et communiquer directement avec les équipes. La solution comprend un système d'authentification robuste, un tableau de bord personnalisable, et des fonctionnalités de partage de fichiers sécurisés. L'ensemble a été développé avec les technologies les plus récentes pour garantir performance, sécurité et évolutivité.",
      images: [img2, img1, img3, img4] // Using imported images
    }
    // Add all other projects matching your references data
  ];

  const project = projects.find(p => p.id === parseInt(id)) || projects[0];

  // Helper function to chunk gallery images into pairs
  const chunkImagesIntoPairs = (images) => {
    const pairs = [];
    for (let i = 0; i < images.length; i += 2) {
      // Create pairs, but handle the case where there might be an odd number of images
      const pair = images.slice(i, i + 2);
      pairs.push(pair);
    }
    return pairs;
  };

  const galleryPairs = project.images ? chunkImagesIntoPairs(project.images) : [];

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <main className={`ref-details-container ${sidebarOpen ? 'ref-details-content-shifted' : ''}`}>
        {/* Hero section with full width image */}
        <div className="ref-details-hero-image-container">
          <img src={project.mainImage} alt={project.title} className="ref-details-hero-image" />
          <div className="ref-details-hero-overlay">
            <h1 className="ref-details-hero-title">{project.title}</h1>
          </div>
        </div>
        
        <div className="ref-details-content">
          <div className="ref-details-header">
            <div className="ref-details-meta">
              <span className="ref-details-date">{project.date}</span>
              <span className="ref-details-category">{project.category}</span>
            </div>
            <h2 className="ref-details-description">{project.description}</h2>
          </div>
          
          <div className="ref-details-body">
            <p className="ref-details-text">{project.content}</p>
          </div>
          
          {/* Gallery - displaying images in pairs with same width but different heights */}
          {project.images && project.images.length > 0 && (
            <div className="ref-details-gallery">
              <h3 className="ref-details-gallery-title">GALERIE DU PROJET</h3>
              <div className="ref-details-gallery-grid-container">
                {galleryPairs.map((pair, pairIndex) => (
                  <div key={pairIndex} className="ref-details-gallery-pair">
                    {pair.map((image, imgIndex) => (
                      <div 
                        key={imgIndex} 
                        className={`ref-details-gallery-item ${
                          pairIndex % 2 === 0 ? 
                            (imgIndex % 2 === 0 ? 'ref-details-tall' : 'ref-details-short') : 
                            (imgIndex % 2 === 0 ? 'ref-details-short' : 'ref-details-tall')
                        }`}
                        onClick={() => setCurrentImageIndex(project.images.indexOf(image))}
                      >
                        <img 
                          src={image} 
                          alt={`${project.title} - image ${pairIndex * 2 + imgIndex + 1}`} 
                          className="ref-details-gallery-image"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
                    
          <div className="ref-details-footer">
            <button 
              className="ref-details-contact-btn"
              onClick={() => navigate('/contact')}
            >
              CONTACTER NOUS
            </button>
          </div>
        </div>
        
      </main>
      
      <GoBack />
      <ScrollTop />
    </div>
  );
};

export default ProjectDetails;