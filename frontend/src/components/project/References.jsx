import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Sidebar from '../sidebar/Sidebar';
import GoBack from '../action_buttons/GoBack';
import '../../App.css';
import '../../styles/references.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../actions/projectActions';
import Loader from '../layout/Loader';
import { useAlert } from 'react-alert';

const ReferencesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredRef, setHoveredRef] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, projects } = useSelector(state => state.projects);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getProjects());
  }, [dispatch, alert, error]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Categories from your project schema
  const categories = [
  { id: 'all', name: 'Toutes' },
  { id: 'Education', name: 'Education' },
  { id: 'Web', name: 'Web' },
  { id: 'Finance', name: 'Finance' },
  { id: 'Commerce', name: 'Commerce' },
  { id: 'Tourism', name: 'Tourism' },
  { id: 'Hotels', name: 'Hotels' },
  { id: 'IT', name: 'IT' },
  { id: 'Immobilier', name: 'Immobilier' },
  { id: 'Culture', name: 'Culture' },
  { id: 'Organizations', name: 'Organizations' },
  { id: 'Events', name: 'Events' },
  { id: 'Restauration', name: 'Restauration' },
  { id: 'Magazine', name: 'Magazine' },
  { id: 'Automobile', name: 'Automobile' },
  { id: 'BTP', name: 'BTP' },
  { id: 'Assurance', name: 'Assurance' }
];

  // Filter projects based on selected category
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className="main-content">
        <div className="references-container">
          {loading ? (
            <Loader />
          ) : (
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
                  {filteredProjects && filteredProjects.map((project) => (
                    <div key={project._id} className="reference-cell">
                      <Link
                        to={`/project/${project._id}`} 
                        className="reference-card"
                        onMouseEnter={() => setHoveredRef(project._id)}
                        onMouseLeave={() => setHoveredRef(null)}
                      >
                        <div className="reference-image-container">
                          <img 
                            src={project.image.url} 
                            alt={project.title} 
                            className={`reference-image ${hoveredRef === project._id ? 'colored' : 'grayscale'}`}
                          />
                          
                          {hoveredRef === project._id && (
                            <div className="reference-overlay">
                              <div className="reference-name">{project.title}</div>
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <GoBack />
    </div>
  );
};

export default ReferencesPage;