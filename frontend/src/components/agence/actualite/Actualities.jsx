import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../sidebar/Sidebar';
import GoBack from '../../action_buttons/GoBack';
import '../../../styles/actualities.css';
import ScrollTop from "../../action_buttons/ScrollTop";
import { useDispatch, useSelector } from 'react-redux';
import { getActualites, clearErrors } from '../../../actions/actualiteActions';
import { useAlert } from 'react-alert';
import Loader from '../../layout/Loader';
import moment from 'moment';

const Actualities = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, actualites, error } = useSelector(state => state.actualites);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getActualites());
  }, [dispatch, alert, error]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleCardClick = (id) => {
    navigate(`/agence/actualites/${id}`);
  };

  const formatDate = (dateString) => {
    return moment(dateString).format('DD.MM.YYYY');
  };

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <main className={`actualities-container ${sidebarOpen ? 'content-shifted' : ''}`}>
        <h1 className="page-title">ACTUALITÉS</h1>

        {loading ? (
          <Loader />
        ) : (
          <div className="news-vertical-container">
            {actualites && actualites.map((actualite) => (
              <div 
                key={actualite._id} 
                className="news-vertical-card"
                onClick={() => handleCardClick(actualite._id)}
              >
                <div className="vertical-card-image-container">
                  <img 
                    src={actualite.image.url} 
                    alt={actualite.title} 
                    className="vertical-card-image" 
                  />
                </div>
                
                <div className="vertical-card-content">
                  <div className="vertical-card-header">
                    <h2 className="vertical-card-title">{actualite.title}</h2>
                    
                    <div className="vertical-card-meta">
                      <span className="vertical-card-date">{formatDate(actualite.date)}</span>
                      <span className="vertical-card-date">{actualite.category}</span>
                    </div>
                  </div>
                  
                  <div className="vertical-card-body">
                    {actualite.subtitle && <p className="vertical-card-description">{actualite.subtitle}</p>}
                    <p className="vertical-card-excerpt">{actualite.paragraph.substring(0, 50)}...</p>
                  </div>
                  
                  <div className="vertical-card-footer">
                    <button className="read-more">LIRE LA SUITE</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}       
      </main>
      
      <GoBack />
      <ScrollTop/>
    </div>
  );
};

export default Actualities;