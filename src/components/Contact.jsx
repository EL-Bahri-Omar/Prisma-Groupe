import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import GoBack from '../GoBack';
import './contact.css';

const ContactPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    societe: '',
    telephone: '',
    email: '',
    sujet: '',
    message: '',
    captcha: ''
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nom || !formData.prenom || !formData.email || !formData.captcha) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    console.log('Form submitted:', formData);
    
    // Réinitialisation du formulaire
    setFormData({
      nom: '',
      prenom: '',
      societe: '',
      telephone: '',
      email: '',
      sujet: '',
      message: '',
      captcha: ''
    });
    
    // Fermer la modale
    setShowModal(false);
    
    // Afficher un message de succès
    alert('Votre message a été envoyé avec succès!');
  };

  // Générer un CAPTCHA aléatoire
  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  };

  const [captchaText] = useState(generateCaptcha());

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className="main-content">
        <div className="contact-container">
          <div className="contact-layout">
            {/* Section de contact (gauche) */}
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
          <a href="https://facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://linkedin.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://tiktok.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-tiktok"></i>
          </a>
          <a href="https://instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
              </div>
                            
              <button 
                onClick={() => setShowModal(true)}
                className="contact-button"
              >
                CONTACTER NOUS
              </button>
            </div>

            {/* Section carte (droite) */}
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

      {/* Modale de contact */}
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
                  name="nom"
                  placeholder="Nom" 
                  value={formData.nom}
                  onChange={handleInputChange}
                  required
                />
                <input 
                  type="text" 
                  name="prenom"
                  placeholder="Prénom" 
                  value={formData.prenom}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <input 
                  type="text" 
                  name="societe"
                  placeholder="Société" 
                  value={formData.societe}
                  onChange={handleInputChange}
                />
                <input 
                  type="tel" 
                  name="telephone"
                  placeholder="Téléphone" 
                  value={formData.telephone}
                  onChange={handleInputChange}
                />
              </div>
              
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
                  type="text" 
                  name="sujet"
                  placeholder="Sujet" 
                  value={formData.sujet}
                  onChange={handleInputChange}
                />
              </div>
              
              <textarea 
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleInputChange}
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