import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import GoBack from '../action_buttons/GoBack';
import ScrollTop from '../action_buttons/ScrollTop';
import '../../styles/ProjectDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectDetails, createProjectReview } from '../../actions/projectActions';
import ListReviews from '../review/ListReviews';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader';
import moment from 'moment';
import { NEW_REVIEW_RESET } from '../../constants/projectConstants';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ProjectDetails = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, project } = useSelector(state => state.projectDetails);
  const { error: reviewError, success } = useSelector(state => state.newReview);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    if (reviewError) {
      alert.error(reviewError);
    }

    if (success) {
      alert.success('Avis publié avec succès');
      dispatch({ type: NEW_REVIEW_RESET });
      setShowReviewModal(false);
    }

    dispatch(getProjectDetails(id));
  }, [dispatch, alert, error, reviewError, success, id]);

  useEffect(() => {
    // Check if user has already reviewed this project
    if (user && project?.reviews) {
      const userReview = project.reviews.find(review => review.user === user._id);
      if (userReview) {
        setRating(userReview.rating);
        setComment(userReview.comment);
      }
    }
  }, [user, project]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const nextImage = () => {
    if (project?.photos && project.photos.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === project.photos.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (project?.photos && project.photos.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? project.photos.length - 1 : prevIndex - 1
      );
    }
  };

  const setUserRatings = () => {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
      star.starValue = index + 1;
      ['click', 'mouseover', 'mouseout'].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === 'click') {
          if (index < this.starValue) {
            star.classList.add('orange');
            setRating(this.starValue);
          } else {
            star.classList.remove('orange');
          }
        }

        if (e.type === 'mouseover') {
          if (index < this.starValue) {
            star.classList.add('yellow');
          } else {
            star.classList.remove('yellow');
          }
        }

        if (e.type === 'mouseout') {
          star.classList.remove('yellow');
        }
      });
    }
  };

  const reviewHandler = () => {
    const formData = new FormData();
    formData.set('rating', rating);
    formData.set('comment', comment);
    formData.set('projectId', id);
    dispatch(createProjectReview(formData));
  };

  const formatDate = (dateString) => {
    return moment(dateString).format('DD MMMM YYYY');
  };

  const hasUserReviewed = user && project?.reviews?.some(review => review.user === user._id);

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <main className={`ref-details-container ${sidebarOpen ? 'ref-details-content-shifted' : ''}`}>
        {loading ? <Loader /> : (
          <Fragment>
            {/* Hero section with full width image */}
            <div className="ref-details-hero-image-container">
              <img src={project?.image?.url} alt={project?.title} className="ref-details-hero-image" />
              <div className="ref-details-hero-overlay">
                <h1 className="ref-details-hero-title">{project?.title}</h1>
              </div>
            </div>
            
            <div className="ref-details-content">
              <div className="ref-details-header">
                <div className="ref-details-meta">
                  <span className="ref-details-date">{project?.createdAt && formatDate(project.createdAt)}</span>
                  <span className="ref-details-category">{project?.category}</span>
                </div>
                <h2 className="ref-details-description">{project?.subtitle}</h2>
              </div>
              
              <div className="ref-details-body">
                <p className="ref-details-text">{project?.description}</p>
              </div>
              
              {/* Video Container */}
              {project?.video && (
                <div className="ref-details-video-section">
                  <div className="ref-details-video-container">
                    {/* Directly embed the video instead of showing thumbnail */}
                    <video 
                      src={project?.video?.url}
                      controls
                      className="direct-video-player"
                      width="100%"
                      height="100%"
                    />
                  </div>
                </div>
              )}
              
              {/* Gallery - displaying one image at a time with navigation arrows */}
              {project?.photos && project.photos.length > 0 && (
                <div className="ref-details-gallery">
                  <h3 className="ref-details-gallery-title">GALERIE DU PROJET</h3>
                  <div className="ref-details-gallery-container">
                    <div className="gallery-arrow gallery-arrow-left" onClick={prevImage}>
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    
                    <div className="ref-details-single-image-container">
                      {project.photos[currentImageIndex] && (
                        <img 
                          src={project.photos[currentImageIndex].url} 
                          alt={`${project.title} - image ${currentImageIndex + 1}`} 
                          className="ref-details-single-image"
                        />
                      )}
                      <div className="gallery-navigation-indicator">
                        {project.photos.map((_, index) => (
                          <span 
                            key={index} 
                            className={`gallery-navigation-dot ${index === currentImageIndex ? 'active' : ''}`}
                            onClick={() => setCurrentImageIndex(index)}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="gallery-arrow gallery-arrow-right" onClick={nextImage}>
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Section */}
              <div className="ref-details-reviews">
                {project && project.reviews && project.reviews.length > 0 ? (
                  <ListReviews reviews={project.reviews} />
                ) : (
                  <p className="no-reviews">Aucun avis pour ce projet</p>
                )}

                {user ? (
                  <div className="add-review-button-container">
                    <button 
                      className="add-review-button"
                      onClick={() => setShowReviewModal(true)}
                    >
                      {hasUserReviewed ? 'Modifier votre avis' : 'Ajouter un avis'}
                    </button>
                  </div>
                ) : (
                  <div className="login-to-review">
                    Connectez-vous pour laisser un avis
                  </div>
                )}
              </div>
                        
              <div className="ref-details-footer">
                <button 
                  className="ref-details-contact-btn"
                  onClick={() => navigate('/contact')}
                >
                  CONTACTER NOUS
                </button>
              </div>
            </div>
          </Fragment>
        )}
      </main>

      {/* Review Modal */}
<Modal
  isOpen={showReviewModal}
  onRequestClose={() => setShowReviewModal(false)}
  className="review-modal"
  overlayClassName="review-modal-overlay"
>
  <div className="review-modal-header">
    <h3>{hasUserReviewed ? 'Modifier votre avis' : 'Ajouter un avis'}</h3>
    <button 
      className="review-close-btn"
      onClick={() => setShowReviewModal(false)}
    >
      &times;
    </button>
  </div>
  <div className="review-modal-body">
    <div className="review-rating-stars">
      {[...Array(5)].map((_, i) => (
        <i 
          key={i}
          className={`review-star fa fa-star${i < rating ? ' orange' : ''}`}
          onClick={() => setRating(i + 1)}
        ></i>
      ))}
    </div>
    <textarea
      className="review-comment-textarea"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Votre avis..."
    ></textarea>
  </div>
  <div className="review-modal-footer">
    <button 
      className="review-cancel-btn"
      onClick={() => setShowReviewModal(false)}
    >
      Annuler
    </button>
    <button 
      className="review-submit-btn"
      onClick={reviewHandler}
      disabled={loading || rating === 0 || comment.trim() === ''}
    >
      {hasUserReviewed ? 'Mettre à jour' : 'Publier'}
    </button>
  </div>
</Modal>
      
      <GoBack />
      <ScrollTop />
    </div>
  );
};

export default ProjectDetails;