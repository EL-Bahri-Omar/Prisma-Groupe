import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar/Sidebar';
import GoBack from './action_buttons/GoBack';
import './../styles/contact.css';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, clearErrors } from '../actions/messageActions';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    societe: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    nameOrSociete: false
  });

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, success } = useSelector(state => state.newMessage);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear name/societe error if either has value
    if ((name === 'name' && value) || (name === 'societe' && value)) {
      setErrors({ nameOrSociete: false });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate either name or societe
    if (!formData.name && !formData.societe) {
      setErrors({ nameOrSociete: true });
      return;
    }

    // Validate other required fields
    if (!formData.email || !formData.phone || !formData.subject || !formData.message) {
      alert.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    alert.success('Votre message a été envoyé avec succès!');
    setFormData({
      name: '',
      societe: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    });
    setShowModal(false);
    window.scrollTo(0, 0);
    
    dispatch(createMessage(formData));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, success]);

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className="main-content">
        <div className="contact-container">
          <div className="contact-layout">
            {/* Left contact section */}
            <div className="contact-text-section">
              <h1>Restons en contact</h1>
              <p>Vous Avez Une Idée, Un Projet ? Discutons ?</p>
              
              <div className="contact-details">
                <p>29 Rue de l'énergie solaire</p>
                <p>Z.I. Charguia 1</p>
                <p>2035 Tunis -Tunisie</p>
                
                <div className="contact-info">
                  <p><span className="icon email"></span>contact@prisma-groupe.com</p>
                  <p><span className="icon phone"></span>(+216) 71 828 422 </p>
                  <p><span className="icon fax"></span>(+216) 70 031 019</p>
                </div>
              </div>
              
              <hr className="separator" />
              
              <div className="contact-social-icons">
                <a href="https://whatsapp.com" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <div style={{ marginRight: "80px"}}><i className="fab fa-whatsapp"></i></div>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61573906960120" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.linkedin.com/in/prisma-groupe-a40591364/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BrOjzKXuwRv6pxifZuMXEQA%3D%3D" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://www.tiktok.com/@prisma_groupe" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-tiktok"></i>
                </a>
                <a href="https://www.instagram.com/prisma_groupe/#" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
                            
              <button 
                onClick={() => setShowModal(true)}
                className="contact-button"
              >
               ENVOYER UN MESSAGE
              </button>
            </div>

            {/* Right map section */}
            <div className="contact-map-section">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.673127002574!2d10.18966147554845!3d36.84578097144222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd34c6aa7a81fd%3A0xf35d3ce3b95f45ed!2s29%20Rue%20de%20l%27%C3%A9nergie%20solaire%2C%20Tunis%2C%20Tunisie!5e0!3m2!1sfr!2stn!4v1711450800927!5m2!1sfr!2stn&iwloc=near&q=Prisma%20Groupe" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="29 Rue de l'énergie solaire, Tunis"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showModal && (
        <div className="full-screen-modal">
          <div className="modal-content">
            <button 
              onClick={() => setShowModal(false)}
              className="modal-close"
            >
              ×
            </button>
            
            <h2>CONTACTEZ-NOUS</h2>
            <hr className="modal-separator" />
            
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <input 
                  type="text" 
                  name="societe"
                  placeholder="Société" 
                  value={formData.societe}
                  onChange={handleInputChange}
                  className={errors.nameOrSociete ? 'error' : ''}
                />

                <input 
                  type="text" 
                  name="name"
                  placeholder="Nom" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.nameOrSociete ? 'error' : ''}
                />
              </div>
              {errors.nameOrSociete && (
                <div className="error-message">** ! Veuillez remplir soit la société soit le nom ! **</div>
              )}
              
              <div className="form-row">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />

                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Téléphone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <input 
                  type="text" 
                  name="subject"
                  placeholder="Sujet" 
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <textarea 
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
              
              <button 
                type="submit" 
                className="submit-button"
              >
                ENVOYER
              </button>
            </form>
          </div>
        </div>
      )}

      <GoBack />
    </div>
  );
};

export default ContactPage;