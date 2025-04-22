import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import GoBack from '../action_buttons/GoBack';
import ScrollTop from '../action_buttons/ScrollTop';
import '../../styles/BlogDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogDetails, getBlogs, clearErrors } from '../../actions/blogActions';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader';
import moment from 'moment';

const BlogDetails = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [categoryBlogs, setCategoryBlogs] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(false);

  const { loading, error, blog: article } = useSelector(state => state.blogDetails);
  const { blogs } = useSelector(state => state.blogs);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getBlogDetails(id));
  }, [dispatch, alert, error, id]);

  // Load all blogs to find same-category ones
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  // Filter blogs by same category when article or blogs change
  useEffect(() => {
    if (article && blogs) {
      setLoadingCategory(true);
      try {
        // Exclude current article and filter by same category
        const sameCategory = blogs.filter(blog => 
          blog._id !== article._id && 
          blog.category === article.category
        ).slice(0, 3); // Show max 3 articles from same category
        setCategoryBlogs(sameCategory);
      } catch (err) {
        console.error("Error filtering category blogs:", err);
      } finally {
        setLoadingCategory(false);
      }
    }
  }, [article, blogs]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const nextImage = () => {
    if (article?.photos?.length) {
      setCurrentImageIndex((currentImageIndex + 1) % article.photos.length);
    }
  };

  const prevImage = () => {
    if (article?.photos?.length) {
      setCurrentImageIndex((currentImageIndex - 1 + article.photos.length) % article.photos.length);
    }
  };

  const chunkGalleryIntoPairs = (gallery) => {
    if (!gallery) return [];
    const pairs = [];
    for (let i = 0; i < gallery.length; i += 2) {
      const pair = gallery.slice(i, i + 2);
      pairs.push(pair);
    }
    return pairs;
  };

  const formatDate = (dateString) => {
    return moment(dateString).format('DD MMMM YYYY');
  };

  if (loading) {
    return (
      <div className="blogdetail-loading-container">
        <div className="blogdetail-loading-spinner"></div>
        <p>Chargement de l'article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="blogdetail-error-container">
        <h2>Article non trouvé</h2>
        <button onClick={() => navigate('/blog')}>Retour au blog</button>
      </div>
    );
  }

  const renderContent = () => {
    if (!article.paragraph) return null;
    
    // Split paragraphs by double newlines
    const paragraphs = article.paragraph.split('\n\n');
    
    return paragraphs.map((para, index) => (
      <p key={index} className="blogdetail-article-paragraph">{para}</p>
    ));
  };

  const renderRelatedArticles = () => {
    if (loadingCategory) {
      return <div className="blogdetail-loading">Chargement des articles similaires...</div>;
    }

    if (categoryBlogs.length === 0) {
      return <div className="blogdetail-no-results">Aucun article similaire trouvé dans cette catégorie.</div>;
    }

    return (
      <div className="blogdetail-related-articles-grid">
        {categoryBlogs.map(blog => (
          <div 
            key={blog._id} 
            className="blogdetail-related-article-card"
            onClick={() => navigate(`/blog/${blog._id}`)}
          >
            <div className="blogdetail-related-article-image">
              <img src={blog.image.url} alt={blog.title} />
              <span className="blogdetail-related-article-category">{blog.category}</span>
            </div>
            <div className="blogdetail-related-article-content">
              <h4>{blog.title}</h4>
              <p>{blog.subtitle}</p>
              <div>
                <span>{formatDate(blog.createdAt)}</span>
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const galleryPairs = chunkGalleryIntoPairs(article.photos);

  return (
    <div className={`blogdetail-app-container ${sidebarOpen ? 'blogdetail-sidebar-open' : ''}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      <div className={`blogdetail-main-content ${sidebarOpen ? 'content-shifted' : ''}`}>
        {/* Hero Image Section */}
        <div className="hero-image-container">
          <img src={article.image?.url} alt={article.title} className="hero-image" />
          <div className="hero-overlay">
            <h1 className="hero-title">{article.title}</h1>
          </div>
        </div>

        <div className="blogdetail-container">
          <div className="blogdetail-header">
            <div className="blogdetail-header-meta">
              <span className="blogdetail-header-category">{article.category}</span>
              <span className="blogdetail-header-date">{formatDate(article.createdAt)} • {article.readTime}</span>
            </div>
            <h2 className="blogdetail-header-subtitle">{article.subtitle}</h2>

            {/* Author section */}
            {article.author && (
              <div className="blogdetail-author-info">
                <img 
                  src={article.author.avatar?.url || '/images/default_avatar.jpg'} 
                  alt={article.author.name} 
                  className="blogdetail-author-image" 
                />
                <div className="blogdetail-author-details">
                  <span className="blogdetail-author-name">{article.author.name}</span>
                  <span className="blogdetail-author-role">Auteur</span>
                </div>
              </div>
            )}
            
            {/* Tags and Share */}
            <div className="blogdetail-tags-share-container">
              <div className="blogdetail-tags">
                <h4>Tags</h4>
                <div className="blogdetail-tags-container">
                  {article.tags && article.tags.map((tag, index) => (
                    <span key={index} className="blogdetail-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="blogdetail-share-article">
                <h4>Partager</h4>
                <div className="blogdetail-social-icons">
                  <a href="#" className="blogdetail-social-icon"><i className="fab fa-linkedin"></i></a>
                  <a href="#" className="blogdetail-social-icon"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="blogdetail-social-icon"><i className="fab fa-facebook"></i></a>
                  <a href="#" className="blogdetail-social-icon"><i className="fas fa-envelope"></i></a>
                </div>
              </div>
          </div>

          <div className="blogdetail-content-wrapper">
            <div className="blogdetail-content">
              {renderContent()}

              {/* PDF Download if available */}
              {article.pdf && article.pdf.url && (
                <div className="blogdetail-pdf-section">
                  <h3>Document à télécharger</h3>
                  <a 
                    href={article.pdf.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="blogdetail-pdf-download"
                  >
                    <i className="fas fa-file-pdf"></i> Télécharger le PDF
                  </a>
                </div>
              )}

              {/* Gallery */}
              {article.photos && article.photos.length > 0 && (
                <div className="blogdetail-gallery">
                  <h3 className="gallery-title">GALERIE</h3>
                  <div className="gallery-grid-container">
                    {galleryPairs.map((pair, pairIndex) => (
                      <div key={pairIndex} className="gallery-pair">
                        {pair.map((photo, imgIndex) => (
                          <div 
                            key={imgIndex} 
                            className={`gallery-item ${
                              pairIndex % 2 === 0 ? 
                                (imgIndex % 2 === 0 ? 'tall' : 'short') : 
                                (imgIndex % 2 === 0 ? 'short' : 'tall')
                            }`}
                          >
                            <img 
                              src={photo.url} 
                              alt={`${article.title} - image ${pairIndex * 2 + imgIndex + 1}`} 
                              className="gallery-image"
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Articles Section */}
          <div className="blogdetail-related-articles">
            <h3>Articles similaires</h3>
            <p className="blogdetail-related-articles-subtitle">
              D'autres articles de la catégorie <strong>{article.category}</strong>
            </p>
            {renderRelatedArticles()}
          </div>
        </div>
      </div>

      <ScrollTop/>
      <GoBack />
    </div>
  );
};

export default BlogDetails;