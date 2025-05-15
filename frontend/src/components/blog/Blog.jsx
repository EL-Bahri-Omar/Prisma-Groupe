import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import GoBack from '../action_buttons/GoBack';
import '../../styles/BlogPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs, clearErrors } from '../../actions/blogActions';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader';
import moment from 'moment';

const BlogPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  const { loading, blogs, error } = useSelector(state => state.blogs);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getBlogs());
  }, [dispatch, alert, error]);

  // Filter blogs based on search and category
  const filteredBlogs = blogs && blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         blog.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Tous' || blog.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredBlogs ? filteredBlogs.slice(indexOfFirstArticle, indexOfLastArticle) : [];
  const totalPages = filteredBlogs ? Math.ceil(filteredBlogs.length / articlesPerPage) : 0;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

  // Get unique categories
  const categories = ['Tous'];
  if (blogs) {
    const uniqueCategories = [...new Set(blogs.map(blog => blog.category))];
    categories.push(...uniqueCategories);
  }

  const formatDate = (dateString) => {
    return moment(dateString).format('DD MMMM YYYY');
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className="main-content">
        <div className="blog-container">
          <header className="blog-header">
            <h1 className="blog-title animate-fade-in">Notre Blog</h1>
            
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

          {loading ? (
            <Loader />
          ) : currentArticles.length > 0 ? (
            <>
              <div className="blog-grid">
                {currentArticles.map((blog, index) => (
                  <article 
                    key={blog._id} 
                    className={`blog-card animate-slide-up delay-${index % 4}`}
                    onClick={() => navigate(`/blog/${blog._id}`)}
                  >
                    <div className="card-image">
                      <img src={blog.image.url} alt={blog.title} />
                      <span className="card-category">{blog.category}</span>
                    </div>
                    <div className="card-content">
                      <div className="card-meta">
                        <span className="card-date">{formatDate(blog.createdAt)}</span>
                        <span className="card-read-time">{blog.readTime}</span>
                      </div>
                      <h2 className="card-title">{blog.title}</h2>
                      <p className="card-excerpt">{blog.subtitle}</p>
                      <button className="read-more-btn">
                        Lire l'article <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="pagination-container">
                <div className="pagination-info">
                  Page {currentPage} sur {totalPages} • {filteredBlogs.length} articles
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
        </div>
      </div>

      <GoBack />
    </div>
  );
};

export default BlogPage;