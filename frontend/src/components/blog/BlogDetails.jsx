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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
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

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (article && blogs) {
      setLoadingCategory(true);
      try {
        const sameCategory = blogs.filter(blog => 
          blog._id !== article._id && 
          blog.category === article.category
        ).slice(0, 3);
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
    if (article?.contentBlocks) {
      const galleryBlocks = article.contentBlocks.filter(block => block.type === 'gallery');
      if (galleryBlocks.length > 0) {
        const currentGallery = galleryBlocks[0];
        setCurrentImageIndex((currentImageIndex + 1) % currentGallery.photos.length);
      }
    }
  };

  const prevImage = () => {
    if (article?.contentBlocks) {
      const galleryBlocks = article.contentBlocks.filter(block => block.type === 'gallery');
      if (galleryBlocks.length > 0) {
        const currentGallery = galleryBlocks[0];
        setCurrentImageIndex((currentImageIndex - 1 + currentGallery.photos.length) % currentGallery.photos.length);
      }
    }
  };

  const formatDate = (dateString) => {
    return moment(dateString).format('DD MMMM YYYY');
  };

  const renderContentBlocks = () => {
    if (!article.contentBlocks || article.contentBlocks.length === 0) {
      return <p className="blogdetail-no-content">No content available</p>;
    }

    // Parse the contentBlocks if it's a string (from JSON)
    const blocks = typeof article.contentBlocks === 'string' 
      ? JSON.parse(article.contentBlocks)
      : article.contentBlocks;

    // Sort blocks by their order property if it exists
    const sortedBlocks = blocks.sort((a, b) => (a.order || 0) - (b.order || 0));

    return (
      <div className="blog-content-container">
        {sortedBlocks.map((block, index) => {
          switch (block.type) {
            case 'title':
              return (
                <h2 key={index} className="content-title">
                  {block.content}
                </h2>
              );
            case 'subtitle':
              return (
                <h3 key={index} className="content-subtitle">
                  {block.content}
                </h3>
              );
            case 'headline':
              return (
                <div key={index} className="content-headline-container">
                  <span className="headline-bullet"></span>
                  <h4 className="content-headline">{block.content}</h4>
                </div>
              );
            case 'paragraph':
              return block.content.split('\n').map((para, paraIndex) => (
                <p key={`${index}-${paraIndex}`} className="content-paragraph">
                  {para || <br />}
                </p>
              ));
            case 'gallery':
              return (
                <div key={index} className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {block.photos.map((photo, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={photo.url || photo}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-64 object-cover rounded-lg shadow-lg"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => {
                              const img = new Image();
                              img.src = photo.url || photo;
                              const win = window.open('', '_blank');
                              win.document.write(`
                                <html>
                                  <head>
                                    <title>Image Viewer</title>
                                    <style>
                                      body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #000; }
                                      img { max-width: 100%; max-height: 100%; object-fit: contain; }
                                    </style>
                                  </head>
                                  <body>
                                    <img src="${photo.url || photo}" alt="Full size image" />
                                  </body>
                                </html>
                              `);
                              win.document.close();
                            }}
                            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                            aria-label="View fullscreen"
                          >
                            <i className="fa fa-expand text-gray-700"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {block.caption && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center italic">
                      {block.caption}
                    </p>
                  )}
                </div>
              );
            default:
              return (
                <p key={index} className="content-paragraph">
                  {block.content}
                </p>
              );
          }
        })}
      </div>
    );
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
          </div>

          <div className="blogdetail-content-wrapper">
            <div className="blogdetail-content">
              {renderContentBlocks()}
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