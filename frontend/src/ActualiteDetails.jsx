import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import GoBack from './GoBack';
import ScrollTop from './ScrollTop';
import './styles/actualiteDetails.css';

const ActualiteDetails = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newsItem, setNewsItem] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // News items database - in a real app, this would come from an API
  const newsItems = [
    {
      id: 'musiqat',
      title: "MUSIQAT",
      subtitle: "Festival de musique",
      description: "Un nouveau site Internet pour la 11ème édition de Musiqât",
      date: "07.10.2016",
      content: "Comme chaque année, Musiqât revient pour une 11ème édition du 7 au 22 octobre 2016 au palais Ennejma Ezzahra à Sidi Bou Said. Le festival offre une programmation éclectique qui promet des moments musicaux inoubliables. Cette année, Same Team a eu le plaisir de concevoir le nouveau site Internet du festival, permettant aux visiteurs de découvrir le programme complet et de réserver leurs places en ligne. Le site reflète l'esthétique unique du festival, avec une interface élégante et intuitive qui met en valeur les artistes et les performances.",
      mainImage: "/src/assets/musiqat.jpg",
      gallery: [
        "/src/assets/musiqat.jpg",
        "/src/assets/musiqat.jpg",
        "/src/assets/musiqat.jpg",
        "/src/assets/musiqat.jpg"
      ]
    },
    {
      id: 'jazz-tabarka',
      title: "WEEK END JAZZ IN TABARKA",
      subtitle: "Festival de jazz",
      description: "Tabarka Jazz Festival : Un come-back tout en digital",
      date: "30.08.2016",
      content: "Le Tabarka Jazz Festival annonce son grand come-back et renaîtra du 1 au 3 septembre 2016 avec un week-end qui s'annonce riche et animé avec au programme des concerts IN. Same Team a eu l'honneur d'accompagner ce retour tant attendu en créant une présence digitale moderne pour le festival. Notre équipe a développé une stratégie de communication digitale complète, incluant un site web responsive, une présence active sur les réseaux sociaux et une campagne de marketing digital ciblée pour toucher les amateurs de jazz à travers le pays et au-delà des frontières.",
      mainImage: "/src/assets/jazz-tabarka.jpg",
      gallery: [
        "/src/assets/jazz-tabarka.jpg",
        "/src/assets/jazz-tabarka.jpg",
        "/src/assets/jazz-tabarka.jpg",
        "/src/assets/jazz-tabarka.jpg"
      ]
    },
    {
      id: 'automobile',
      title: "AUTOMOBILE.TN",
      subtitle: "Développement web",
      description: "Automobile.tn se met au responsive design !",
      date: "14.06.2016",
      content: "C'est en 2011 que Same Team a conçu la première version du site automobile.tn. Aujourd'hui, ce portail est devenu la référence incontournable du secteur automobile en Tunisie. Face à l'évolution des habitudes de navigation, nous avons entièrement repensé l'expérience utilisateur pour offrir un site parfaitement adapté à tous les appareils. Cette refonte en responsive design permet aux utilisateurs de consulter les annonces, de rechercher des véhicules et d'accéder à toutes les fonctionnalités du site depuis leur smartphone, tablette ou ordinateur avec un confort optimal. Cette évolution majeure s'accompagne également d'améliorations techniques pour une navigation plus rapide et plus fluide.",
      mainImage: "/src/assets/automobile.jpg",
      gallery: [
        "/src/assets/automobile.jpg",
        "/src/assets/automobile.jpg",
        "/src/assets/automobile.jpg",
        "/src/assets/automobile.jpg"
      ]
    },
    {
      id: 'jazz-carthage',
      title: "JAZZ À CARTHAGE",
      subtitle: "Festival de jazz",
      description: "SAME TEAM partenaire digital de Jazz à Carthage 2016",
      date: "01.03.2016",
      content: "Depuis son lancement en 2005, « Jazz à Carthage » s'est vu rapidement gravir les échelons pour devenir l'événement phare par excellence réunissant tous les amateurs acharnés de ce genre musical émergé du sud des Etats-Unis. Pour l'édition 2016, Same Team a été choisi comme partenaire digital officiel du festival. Notre équipe a déployé une stratégie digitale complète incluant la refonte du site web, la gestion des réseaux sociaux et la mise en place d'une billetterie en ligne sécurisée. Cette collaboration a permis d'accroître significativement la visibilité du festival et d'optimiser l'expérience des festivaliers, de la découverte du programme à l'achat des billets.",
      mainImage: "/src/assets/jazz-carthage.png",
      gallery: [
        "/src/assets/jazz-carthage.png",
        "/src/assets/jazz-carthage.png",
        "/src/assets/jazz-carthage.png",
        "/src/assets/jazz-carthage.png"
      ]
    }
  ];

  useEffect(() => {
    // Find the news item with the matching ID
    const item = newsItems.find(item => item.id === id);
    if (item) {
      setNewsItem(item);
    } else {
      // Redirect to the news page if the item is not found
      navigate('/actualites');
    }
  }, [id, navigate]);

  if (!newsItem) {
    return <div className="loading">Chargement...</div>;
  }

  // Helper function to chunk gallery images into pairs
  const chunkGalleryIntoPairs = (gallery) => {
    const pairs = [];
    for (let i = 0; i < gallery.length; i += 2) {
      // Create pairs, but handle the case where there might be an odd number of images
      const pair = gallery.slice(i, i + 2);
      pairs.push(pair);
    }
    return pairs;
  };

  const galleryPairs = newsItem.gallery ? chunkGalleryIntoPairs(newsItem.gallery) : [];

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <main className={`actualite-details-container ${sidebarOpen ? 'content-shifted' : ''}`}>
        {/* Hero section with full width image */}
        <div className="hero-image-container">
          <img src={newsItem.mainImage} alt={newsItem.title} className="hero-image" />
          <div className="hero-overlay">
            <h1 className="hero-title">{newsItem.title}</h1>
          </div>
        </div>
        
        <div className="actualite-content">
          <div className="actualite-header">
            <div className="actualite-meta">
              <span className="actualite-date">{newsItem.date}</span>
              <span className="actualite-category">{newsItem.subtitle}</span>
            </div>
            <h2 className="actualite-description">{newsItem.description}</h2>
          </div>
          
          <div className="actualite-body">
            <p className="actualite-text">{newsItem.content}</p>
          </div>
          
          {/* Modified Gallery - displaying images in pairs with same width but different heights */}
          {newsItem.gallery && newsItem.gallery.length > 0 && (
            <div className="actualite-gallery">
              <h3 className="gallery-title">GALERIE</h3>
              <div className="gallery-grid-container">
                {galleryPairs.map((pair, pairIndex) => (
                  <div key={pairIndex} className="gallery-pair">
                    {pair.map((image, imgIndex) => (
                      <div 
                        key={imgIndex} 
                        className={`gallery-item ${
                          pairIndex % 2 === 0 ? 
                            (imgIndex % 2 === 0 ? 'tall' : 'short') : 
                            (imgIndex % 2 === 0 ? 'short' : 'tall')
                        }`}
                      >
                        <img 
                          src={image} 
                          alt={`${newsItem.title} - image ${pairIndex * 2 + imgIndex + 1}`} 
                          className="gallery-image"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
                    
          <div className="actualite-footer">
            <button 
              className="back-to-news-btn"
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

export default ActualiteDetails;