import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../sidebar/Sidebar';
import GoBack from '../../action_buttons/GoBack';
import ScrollTop from '../../action_buttons/ScrollTop';
import '../../../styles/actualitedetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { getActualiteDetails, clearErrors } from '../../../actions/actualiteActions';
import { useAlert } from 'react-alert';
import Loader from '../../layout/Loader';
import moment from 'moment';

const ActualiteDetails = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, actualite } = useSelector(state => state.actualiteDetails);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getActualiteDetails(id));
  }, [dispatch, alert, error, id]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const formatDate = (dateString) => {
    return moment(dateString).format('DD.MM.YYYY');
  };

  // Helper function to chunk gallery images into pairs
  const chunkGalleryIntoPairs = (gallery) => {
    const pairs = [];
    for (let i = 0; i < gallery.length; i += 2) {
      const pair = gallery.slice(i, i + 2);
      pairs.push(pair);
    }
    return pairs;
  };

  const galleryPairs = actualite?.photos ? chunkGalleryIntoPairs(actualite.photos) : [];

  if (loading) return <Loader />;

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      {actualite && (
        <main className={`actualite-details-container ${sidebarOpen ? 'content-shifted' : ''}`}>
          {/* Hero section with full width image */}
          <div className="hero-image-container">
            <img 
              src={actualite.image?.url} 
              alt={actualite.title} 
              className="hero-image" 
            />
            <div className="hero-overlay">
              <h1 className="hero-title">{actualite.title}</h1>
            </div>
          </div>
          
          <div className="actualite-content">
            <div className="actualite-header">
              <div className="actualite-meta">
                <span className="actualite-date">{formatDate(actualite.date)}</span>
                <span className="actualite-category">{actualite.category}</span>
              </div>
              <h2 className="actualite-description">{actualite.subtitle}</h2>
            </div>
            
            <div className="actualite-body">
              <p className="actualite-text">{actualite.paragraph}</p>
            </div>
            
            {/* Gallery section */}
            {actualite.photos && actualite.photos.length > 0 && (
              <div className="actualite-gallery">
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
                            alt={`${actualite.title} - image ${pairIndex * 2 + imgIndex + 1}`} 
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
      )}
      
      <GoBack />
      <ScrollTop />
    </div>
  );
};

export default ActualiteDetails;