import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import ScrollToTop from '../ScrollToTop';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, Clock, MapPin, Briefcase, Users, Share2 } from 'lucide-react';

const Contact = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour envoyer le formulaire
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Barre latérale */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className="main-content">
        <div className="explore-container">
          {/* Section d'en-tête avec fond gradient */}
          <div className="contact-header">
            <div className="contact-header-content">
              <h1 className="contact-title">Contactez-nous</h1>
              <div className="contact-subtitle">Parlons de vos projets</div>
              <div className="contact-divider"></div>
              <p className="contact-intro">
                Chez Prisma Groupe, nous sommes passionnés par l'innovation et l'excellence. 
                Notre équipe d'experts est prête à vous accompagner dans tous vos défis technologiques.
              </p>
            </div>
          </div>

          {/* Section principale avec formulaire et infos de contact */}
          <div className="contact-main-section">
            <div className="contact-form-section">
              <div className="contact-form-card">
                <h2 className="form-title">Envoyez-nous un message</h2>
                
                {formSubmitted ? (
                  <div className="form-success">
                    <div className="success-icon">✓</div>
                    <h3>Message envoyé avec succès!</h3>
                    <p>Nous vous contacterons très prochainement.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">Nom complet</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Votre nom et prénom"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Adresse email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="exemple@email.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Sujet</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="L'objet de votre message"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Décrivez votre projet ou votre demande..."
                        rows="5"
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="submit-btn">Envoyer le message</button>
                  </form>
                )}
              </div>
            </div>

            <div className="contact-info-section">
              <div className="info-card">
                <div className="info-item">
                  <div className="info-icon">
                    <MapPin size={24} />
                  </div>
                  <div className="info-content">
                    <h3>Notre siège social</h3>
                    <p>Prisma Groupe<br />29 Rue de l'énergie solaire<br />Charguia 2, Tunis, Tunisie</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">
                    <Phone size={24} />
                  </div>
                  <div className="info-content">
                    <h3>Téléphone</h3>
                    <p>+33 1 23 45 67 89</p>
                    <p>+33 1 23 45 67 90 (Support)</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">
                    <Mail size={24} />
                  </div>
                  <div className="info-content">
                    <h3>Email</h3>
                    <p>contact@prismagroupe.com</p>
                    <p>support@prismagroupe.com</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">
                    <Clock size={24} />
                  </div>
                  <div className="info-content">
                    <h3>Horaires d'ouverture</h3>
                    <p>Lundi - Vendredi: 9h00 - 18h00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section des départements */}
          <div className="contact-departments">
            <h2 className="departments-title">Nos départements</h2>
            <div className="departments-grid">
              <div className="department-card">
                <div className="department-icon">
                  <Briefcase size={32} />
                </div>
                <h3>Service Commercial</h3>
                <p>Rejoignez notre équipe de talents</p>
                <a href="mailto:commercial@prismagroupe.com">commercial@prismagroupe.com</a>
              </div>
              
              <div className="department-card">
                <div className="department-icon">
                  <Users size={32} />
                </div>
                <h3>Ressources Humaines</h3>
                <p>Rejoignez notre équipe de talents</p>
                <a href="mailto:carriere@prismagroupe.com">carriere@prismagroupe.com</a>
              </div>
              
              <div className="department-card">
                <div className="department-icon">
                  <Share2 size={32} />
                </div>
                <h3>Partenariats</h3>
                <p>Rejoignez notre équipe de talents</p>
                <a href="mailto:partenariat@prismagroupe.com">partenariat@prismagroupe.com</a>
              </div>
            </div>
          </div>

          {/* Section carte et réseaux sociaux */}
          <div className="contact-map-section">
            <div className="map-container">
              {/* Intégrez ici une iframe Google Maps ou une image de carte */}
              <div className="map-placeholder">
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
      </div>
      <ScrollToTop />
    </div >
    
  );
};

export default Contact;