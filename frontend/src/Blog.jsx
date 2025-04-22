import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import GoBack from './GoBack';
import './styles/BlogPage.css';
import ScrollTop from "./ScrollTop";

const BlogPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  // Données des articles
  const [allArticles] = useState([
    {
      id: 1,
      title: "Sponsoring Événementiel : Comment Maximiser le ROI",
      excerpt: "Notre stratégie pour transformer un sponsoring en ventes concrètes - cas Viatbike",
      date: "15 mars 2024",
      category: "Retail",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      tags: ["sponsoring", "retail", "ROI"],
      featured: true
    },
    {
      id: 2,
      title: "Marketing Direct 2.0 : Personnalisation grâce à l'IA",
      excerpt: "Comment nos algorithmes boostent les taux d'ouverture de 40%",
      date: "22 mars 2024",
      category: "Data",
      readTime: "10 min",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      tags: ["IA", "marketing direct", "personnalisation"]
    },
    {
      id: 3,
      title: "Promotions Digitale vs Physique : Le Match",
      excerpt: "Analyse comparative sur 6 mois avec une marque de cosmétiques",
      date: "5 avril 2024",
      category: "Innovation",
      readTime: "12 min",
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      tags: ["promotion", "innovation", "phygital"]
    },
    {
      id: 4,
      title: "Relations Presse Créatives : 5 Campagnes Qui Ont Marqué 2023",
      excerpt: "Exemples concrets dont notre opération 'Art dans la Rue' pour une marque de luxe",
      date: "10 avril 2024",
      category: "Luxe",
      readTime: "9 min",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      tags: ["RP", "créativité", "luxe"]
    },
    {
      id: 5,
      title: "Événements Durables : Notre Charte Zéro Carbone",
      excerpt: "Comment nous avons réduit de 65% l'impact environnemental de nos opérations",
      date: "18 avril 2024",
      category: "RSE",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      tags: ["RSE", "événementiel", "durabilité"]
    },
    {
      id: 6,
      title: "Sponsoring Sportif 2.0 : Intégrer le Digital aux Expériences Fans",
      excerpt: "Cas pratique avec un club de football et ses NFTs exclusifs",
      date: "25 avril 2024",
      category: "Innovation",
      readTime: "11 min",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      tags: ["sponsoring", "web3", "sport"]
    },
    {
      id: 7,
      title: "Goodies Connectés : Le Retour en Force du Print Intelligent",
      excerpt: "Comment les QR codes dynamiques ont boosté nos campagnes de 30%",
      date: "2 mai 2024",
      category: "Retail",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1636051028886-0059ad2383c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      tags: ["promotion", "print", "tech"]
    },
    {
      id: 8,
      title: "Marketing Direct dans la Santé : Le Pari de l'Hyper-Personnalisation",
      excerpt: "Notre approche RGPD-friendly pour un groupe hospitalier",
      date: "9 mai 2024",
      category: "Santé",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      tags: ["santé", "RGPD", "personnalisation"]
    },
    {
      id: 9,
      title: "Influenceurs Micro-Nichés : Pourquoi Nous Y Croyons",
      excerpt: "Analyse d'une campagne avec 15 nano-influenceurs (+32% d'engagement)",
      date: "16 mai 2024",
      category: "Luxe",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      tags: ["influence", "luxe", "réseaux sociaux"]
    },
    {
      id: 10,
      title: "Data et Sponsoring : Mesurer l'Impact au-delà des Vues",
      excerpt: "Nos KPI émotionnels brevetés pour évaluer les partenariats",
      date: "23 mai 2024",
      category: "Data",
      readTime: "10 min",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      tags: ["data", "sponsoring", "KPI"]
    }

  ]);

  // Filtrer les articles
  const filteredArticles = allArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Tous' || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Réinitialiser la page quand les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

  // Catégories uniques
  const categories = ['Tous', ...new Set(allArticles.map(article => article.category))];

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      

      <div className="main-content">
        <div className="blog-container">
          <header className="blog-header">
            <h1 className="blog-title animate-fade-in">Notre Blog </h1>
            
            <div className="blog-search animate-fade-in">
              <input 
                type="text" 
                placeholder="Rechercher des articles..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button><i className="fas fa-search"></i></button>
            </div>
          </header>

          <div className="category-filter">
            {categories.map(category => (
              <button
                key={category}
                className={activeCategory === category ? 'active' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {currentArticles.length > 0 ? (
            <>
              <div className="blog-grid">
                {currentArticles.map((article, index) => (
                  <article 
                    key={article.id} 
                    className={`blog-card animate-slide-up delay-${index % 4}`}
                    onClick={() => navigate(`/blog/${article.id}`)}
                  >
                    <div className="card-image">
                      <img src={article.image} alt={article.title} />
                      <span className="card-category">{article.category}</span>
                    </div>
                    <div className="card-content">
                      <div className="card-meta">
                        <span className="card-date">{article.date}</span>
                        <span className="card-read-time">{article.readTime}</span>
                      </div>
                      <h2 className="card-title">{article.title}</h2>
                      <p className="card-excerpt">{article.excerpt}</p>
                      <button className="read-more-btn">
                        Lire l'article <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="pagination-container">
                <div className="pagination-info">
                  Page {currentPage} sur {totalPages} • {filteredArticles.length} articles
                </div>
                <div className="pagination-controls">
                  <button 
                    onClick={prevPage} 
                    disabled={currentPage === 1}
                    className="pagination-button"
                  >
                    <i className="fas fa-chevron-left"></i> Précédent
                  </button>
                  
                  <div className="page-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                      <button
                        key={number}
                        className={`page-number ${currentPage === number ? 'active' : ''}`}
                        onClick={() => paginate(number)}
                      >
                        {number}
                      </button>
                    ))}
                  </div>
                  
                  <button 
                    onClick={nextPage} 
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                  >
                    Suivant <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="no-results">
              <i className="fas fa-search fa-2x"></i>
              <h3>Aucun article trouvé</h3>
              <p>Essayez de modifier vos critères de recherche</p>
              <button 
                className="reset-filters"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('Tous');
                }}
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}

          <div className="newsletter-section animate-fade-in">
            <div className="newsletter-content">
              <h2>Abonnez-vous à notre newsletter</h2>
              <p>
                Recevez nos derniers articles, tutoriels et ressources directement 
                dans votre boîte de réception.
              </p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Votre adresse email" 
                  required 
                />
                <button type="submit">
                  S'abonner <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ScrollTop/>
      <GoBack />
    </div>
  );
};

export default BlogPage;