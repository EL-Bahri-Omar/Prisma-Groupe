import React, { useState } from 'react';
import Sidebar from './Sidebar';
import GoBack from './GoBack';
import './App.css';

const ReferencesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredRef, setHoveredRef] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sample references data
  const references = [
    { id: 1, name: "Site web d'Université", image: "src/assets/references/10_min.jpg", logo: "src/assets/references/logos/22_min.svg", category: "education" },
    { id: 2, name: "Site Internet / Extranet Clients", image: "src/assets/references/2_min.jpg", logo: "src/assets/references/logos/1_min.svg", category: "web" },
    { id: 3, name: "Application Mobile", image: "src/assets/references/3_min.jpg", logo: "src/assets/references/logos/10_min.svg", category: "startups" },
    { id: 4, name: "Portail E-commerce", image: "src/assets/references/4_min.jpg", logo: "src/assets/references/logos/1_min.svg", category: "commerce" },
    { id: 5, name: "Système de Réservation", image: "src/assets/references/5_min.jpg", logo: "src/assets/references/logos/10_min.svg", category: "tourism" },
    { id: 6, name: "Portail Bancaire", image: "src/assets/references/1_min.jpg", logo: "src/assets/references/logos/22_min.svg", category: "finance" },
    { id: 7, name: "Solution CRM", image: "src/assets/references/11_min.jpg", logo: "src/assets/references/logos/1_min.svg", category: "it" },
    { id: 8, name: "Système de Gestion Hôtelière", image: "src/assets/references/12_min.jpg", logo: "src/assets/references/logos/22_min.svg", category: "hotels" },
    { id: 9, name: "Portail Immobilier", image: "src/assets/references/13_min.jpg", logo: "src/assets/references/logos/10_min.svg", category: "immobilier" },
    { id: 10, name: "Application Web Progressive", image: "src/assets/references/14_min.jpg", logo: "src/assets/references/logos/22_min.svg", category: "web" },
    { id: 11, name: "Plateforme d'Apprentissage", image: "src/assets/references/15_min.jpg", logo: "src/assets/references/logos/1_min.svg", category: "education" },
    { id: 12, name: "Site Vitrine", image: "src/assets/references/16_min.jpg", logo: "src/assets/references/logos/10_min.svg", category: "web" },
    { id: 13, name: "Extranet Assurance", image: "src/assets/references/17_min.jpg", logo: "src/assets/references/logos/22_min.svg", category: "assurance" },
    { id: 14, name: "Portail Culturel", image: "src/assets/references/18_min.jpg", logo: "src/assets/references/logos/1_min.svg", category: "culture" },
    { id: 15, name: "Application de Gestion", image: "src/assets/references/19_min.jpg", logo: "src/assets/references/logos/10_min.svg", category: "it" },
    { id: 16, name: "Site E-commerce", image: "src/assets/references/21_min.jpg", logo: "src/assets/references/logos/22_min.svg", category: "commerce" },
    { id: 17, name: "Portail Organisationnel", image: "src/assets/references/20_min.jpg", logo: "src/assets/references/logos/1_min.svg", category: "organisations" },
    { id: 18, name: "Système de Billetterie", image: "src/assets/references/22_min.jpg", logo: "src/assets/references/logos/10_min.svg", category: "events" },
    { id: 19, name: "Plateforme Événementielle", image: "src/assets/references/23_min.jpg", logo: "src/assets/references/logos/22_min.svg", category: "events" },
    { id: 20, name: "Site Touristique", image: "src/assets/references/24_min.jpg", logo: "src/assets/references/logos/1_min.svg", category: "tourism" },
    { id: 21, name: "Application de Restauration", image: "src/assets/references/25_min.jpg", logo: "src/assets/references/logos/10_min.svg", category: "restauration" },
    { id: 22, name: "Portail Magazine", image: "src/assets/references/26_min.jpg", logo: "src/assets/references/logos/22_min.svg", category: "magazine" },
    { id: 23, name: "Solution Automobile", image: "src/assets/references/41_min.jpg", logo: "src/assets/references/logos/1_min.svg", category: "automobile" },
    { id: 24, name: "Plateforme BTP", image: "src/assets/references/28_min.jpg", logo: "src/assets/references/logos/10_min.svg", category: "btp" }
  ];

  // Filter categories with their display names
  const categories = [
    { id: 'all', name: 'Toutes' },
    { id: 'finance', name: 'Institutions Financières' },
    { id: 'education', name: 'Education' },
    { id: 'assurance', name: 'Banques Et Assurances' },
    { id: 'organisations', name: 'Organisations' },
    { id: 'it', name: 'Ingénierie Et Services IT' },
    { id: 'commerce', name: 'Commerce Et Industrie' },
    { id: 'automobile', name: 'Automobile' },
    { id: 'immobilier', name: 'Immobilier Et BTP' },
    { id: 'tourism', name: 'Tourisme' },
    { id: 'hotels', name: 'Hôtels' },
    { id: 'restauration', name: 'Restauration' },
    { id: 'startups', name: 'Startups / Portails Web' },
    { id: 'magazine', name: 'Web Magazine' },
    { id: 'culture', name: 'Art Et Culture' },
    { id: 'events', name: 'Festivals Et Événements' }
  ];

  // Filter references based on selected category
  const filteredReferences = activeFilter === 'all' 
    ? references 
    : references.filter(ref => ref.category === activeFilter);

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className="main-content">
        <div className="references-container">
          <div className="references-layout">
            {/* Left side project filters */}
            <div className="project-filters">
              <p className="filter-title-small">Derniers</p>
              <h1 className="filter-title-large">Projets</h1>
              
              <div className="filter-categories">
                {categories.map((category) => (
                  <div 
                    key={category.id}
                    className={`filter-category ${activeFilter === category.id ? 'active' : ''} ${category.id === 'all' ? 'all' : ''}`}
                    onClick={() => setActiveFilter(category.id)}
                  >
                    <div className="filter-circle-cell">
                      <div className="filter-circle"></div>
                    </div>
                    <div className="filter-text">{category.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side references grid - Scrollable */}
            <div className="references-grid-section">
              <div className="references-grid">
                {filteredReferences.map((reference) => (
                  <div key={reference.id} className="reference-cell">
                    <div 
                      className="reference-card"
                      onMouseEnter={() => setHoveredRef(reference.id)}
                      onMouseLeave={() => setHoveredRef(null)}
                    >
                      <div className="reference-image-container">
                        <img 
                          src={reference.image} 
                          alt={reference.name} 
                          className={`reference-image ${hoveredRef === reference.id ? 'colored' : 'grayscale'}`}
                        />
                        
                        {hoveredRef === reference.id && (
                          <div className="reference-overlay">
                            <div className="reference-logo">
                              <img src={reference.logo} alt={`${reference.name} logo`} />
                            </div>
                            <div className="reference-divider"></div>
                            <div className="reference-name">{reference.name}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <GoBack />
    </div>
  );
};

export default ReferencesPage;