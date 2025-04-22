import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import GoBack from './GoBack';
import "./styles/actualities.css"
import ScrollTop from "./ScrollTop";

const Actualities = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const newsItems = [
    {
      id: 'musiqat',
      title: "MUSIQAT",
      description: "Un nouveau site Internet pour la 11ème édition de Musiqât",
      date: "07.10.2016",
      content: "Comme chaque année, Musiqât revient pour une 11ème édition du 7 au 22 octobre 2016 au palais Ennejma Ezzahra à Sidi Bou Said.",
      image: "/src/assets/musiqat.jpg"
    },
    {
      id: 'jazz-tabarka',
      title: "WEEK END JAZZ IN TABARKA",
      description: "Tabarka Jazz Festival : Un come-back tout en digital",
      date: "30.08.2016",
      content: "Le Tabarka Jazz Festival annonce son grand come-back et renaîtra du 1 au 3 septembre 2016 avec un week-end qui s'annonce riche et animé avec au programme des concerts IN",
      image: "/src/assets/jazz-tabarka.jpg"
    },
    {
      id: 'automobile',
      title: "AUTOMOBILE.TN",
      description: "Automobile.tn se met au responsive design !",
      date: "14.06.2016",
      content: "C'est en 2011 que Same Team a conçu la première version du site automobile.tn. Aujourd'hui, ce portail est devenu la référence incontournable du secteur automobile en Tunisie.",
      image: "/src/assets/automobile.jpg"
    },
    {
      id: 'jazz-carthage',
      title: "JAZZ À CARTHAGE",
      description: "SAME TEAM partenaire digital de Jazz à Carthage 2016",
      date: "01.03.2016",
      content: "Depuis son lancement en 2005, « Jazz à Carthage » s'est vu rapidement gravir les échelons pour devenir l'événement phare par excellence réunissant tous les amateurs acharnés de ce genre musical émergé du sud des Etats-Unis.",
      image: "/src/assets/jazz-carthage.png"
    }
  ];

  const handleCardClick = (id) => {
    navigate(`/actualites/${id}`);
  };

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <main className={`actualities-container ${sidebarOpen ? 'content-shifted' : ''}`}>
        <h1 className="page-title">ACTUALITÉS</h1>

        <div className="news-vertical-container">
          {newsItems.map((item) => (
            <div 
              key={item.id} 
              className="news-vertical-card"
              onClick={() => handleCardClick(item.id)}
            >
              <div className="vertical-card-image-container">
                <img src={item.image} alt={item.title} className="vertical-card-image" />
              </div>
              
              <div className="vertical-card-content">
                <div className="vertical-card-header">
                  <h2 className="vertical-card-title">{item.title}</h2>
                  
                  {item.dates && (
                    <div className="vertical-date-columns">
                      <div className="vertical-date-column">
                        {item.dates.map((date, i) => (
                          <div key={i} className="vertical-date-item">{date}</div>
                        ))}
                      </div>
                      {item.subDates && (
                        <div className="vertical-date-column">
                          {item.subDates.map((date, i) => (
                            <div key={i} className="vertical-date-item">{date}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="vertical-card-body">
                  {item.subtitle && <p className="vertical-card-subtitle">{item.subtitle}</p>}
                  {item.website && <p className="vertical-card-website">{item.website}</p>}
                  {item.highlight && <p className="vertical-card-highlight">{item.highlight}</p>}
                  
                  <p className="vertical-card-description">{item.description}</p>
                  <div className="vertical-card-meta">
                    <span className="vertical-card-date">{item.date}</span>
                  </div>
                  <p className="vertical-card-excerpt">{item.content.substring(0, 100)}...</p>
                </div>
                
                <div className="vertical-card-footer">
                  <button className="read-more">LIRE LA SUITE</button>
                </div>
              </div>
            </div>
          ))}
        </div>       
      </main>
      
      <GoBack />
      <ScrollTop/>
    </div>
  );
};

export default Actualities;