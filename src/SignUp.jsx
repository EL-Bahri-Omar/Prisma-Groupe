import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import ScrollToTop from './ScrollToTop';
import './siginup.css';

const SignUp = () => {
  const [authMode, setAuthMode] = useState('connexion'); // 'connexion', 'inscription', 'mot-de-passe-oublie'
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    motDePasse: '',
    confirmerMotDePasse: ''
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'inscription' && formData.motDePasse !== formData.confirmerMotDePasse) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    console.log(`${authMode} données:`, formData);
    // Ici vous ajouteriez votre logique d'authentification
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleBackClick = () => {
    navigate(-1); // Retour à la page précédente
  };

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Barre latérale */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      

      <div className="main-content">
        <div className={`auth-container ${authMode !== 'connexion' ? 'active' : ''}`}>
          <div className="form-container">
            {/* Formulaire de Connexion */}
            <form 
              className={`auth-form ${authMode === 'connexion' ? 'active' : ''}`} 
              onSubmit={handleSubmit}
            >
              <h2>Bienvenue à nouveau</h2>
              
              <div className="social-auth">
                <button type="button" className="social-btn google">
                  <i className="fab fa-google"></i> Continuer avec Google
                </button>
                <button type="button" className="social-btn facebook">
                  <i className="fab fa-facebook-f"></i> Continuer avec Facebook
                </button>
              </div>
              
              <div className="divider">
                <span>ou connectez-vous avec votre email</span>
              </div>
              
              <input
                type="email"
                name="email"
                placeholder="Adresse email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              
              <input
                type="password"
                name="motDePasse"
                placeholder="Mot de passe"
                value={formData.motDePasse}
                onChange={handleChange}
                required
              />
              
              <div className="form-options">
                <button 
                  type="button" 
                  className="forgot-link"
                  onClick={() => setAuthMode('mot-de-passe-oublie')}
                >
                  Mot de passe oublié ?
                </button>
              </div>
              
              <button type="submit" className="submit-btn">
                Se connecter
              </button>
              
              <p className="switch-text">
                Pas encore de compte ?{' '}
                <button 
                  type="button" 
                  onClick={() => setAuthMode('inscription')}
                  className="switch-link"
                >
                  Créer un compte
                </button>
              </p>
            </form>

            {/* Formulaire d'Inscription */}
            <form 
              className={`auth-form ${authMode === 'inscription' ? 'active' : ''}`} 
              onSubmit={handleSubmit}
            >
              <h2>Créer votre compte</h2>
              
              <div className="divider">
                <span>ou inscrivez-vous avec votre email</span>
              </div>
              
              <input
                type="text"
                name="nom"
                placeholder="Nom complet"
                value={formData.nom}
                onChange={handleChange}
                required
              />
              
              <input
                type="email"
                name="email"
                placeholder="Adresse email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              
              <input
                type="password"
                name="motDePasse"
                placeholder="Créez un mot de passe"
                value={formData.motDePasse}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="confirmerMotDePasse"
                placeholder="Confirmez votre mot de passe"
                value={formData.confirmerMotDePasse}
                onChange={handleChange}
                required
              />
              <button type="submit" className="submit-btn">
                S'inscrire
              </button>
              
              
              
              <p className="switch-text">
                Vous avez déjà un compte ?{' '}
                <button 
                  type="button" 
                  onClick={() => setAuthMode('connexion')}
                  className="switch-link"
                >
                  Se connecter
                </button>
              </p>
            </form>

            {/* Formulaire Mot de passe oublié */}
            <form 
              className={`auth-form ${authMode === 'mot-de-passe-oublie' ? 'active' : ''}`} 
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Un lien de réinitialisation a été envoyé à ${formData.email}`);
                setAuthMode('connexion');
              }}
            >
              <div className="lock-icon">
                <i className="fas fa-lock"></i>
              </div>
              
              <h2>Réinitialisation du mot de passe</h2>
              
              <p className="reset-text">
                Entrez l'adresse email associée à votre compte et nous vous enverrons un lien pour réinitialiser votre mot de passe.
              </p>
              
              <input
                type="email"
                name="email"
                placeholder="Votre adresse email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              
              <button type="submit" className="submit-btn">
                Envoyer les instructions
              </button>
              
              <div className="additional-options">
                <button 
                  type="button" 
                  onClick={() => setAuthMode('connexion')}
                  className="back-btn"
                >
                  <i className="fas fa-arrow-left"></i> Retour à la connexion
                </button>
                
                <p className="contact-support">
                  Des problèmes ? <a href="/contact">Contactez notre support</a>
                </p>
              </div>
            </form>
          </div>

          {/* Panneau d'animation */}
          <div className="overlay-container">
            <div className="overlay">
              <div className={`overlay-panel ${authMode === 'connexion' ? 'right' : 'left'}`}>
                <h2>
                  {authMode === 'connexion' ? 'Nouveau ici ?' : 'Content de vous revoir !'}
                </h2>
                <p>
                  {authMode === 'connexion'
                    ? 'Inscrivez-vous et découvrez toutes les fonctionnalités que nous proposons'
                    : 'Connectez-vous avec vos identifiants pour accéder à votre compte'}
                </p>
                <button 
                  className="ghost-btn" 
                  onClick={() => setAuthMode(authMode === 'connexion' ? 'inscription' : 'connexion')}
                >
                  {authMode === 'connexion' ? "S'inscrire" : "Se connecter"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ajoutez le composant ScrollToTop ici */}
      <ScrollToTop />
    </div>
  );
};

export default SignUp;