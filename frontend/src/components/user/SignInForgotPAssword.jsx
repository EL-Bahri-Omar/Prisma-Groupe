import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearErrors } from '../../actions/userActions';

import AuthLayout from './AuthLayout';
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  
  const alert = useAlert();
  const dispatch = useDispatch();
  
  const { error, loading, message } = useSelector(state => state.forgotPassword);
  
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    
    if (message) {
      alert.success(message);
    }
  }, [dispatch, alert, error, message]);
  
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.set('email', email);
    
    dispatch(forgotPassword(formData));
  };

  return (
    <>
      <MetaData title={'Mot de passe oublié'} />
      
      <AuthLayout 
        overlayTitle="Content de vous revoir !"
        overlayText="Connectez-vous avec vos identifiants pour accéder à votre compte"
        overlayButtonText="Se connecter"
        overlayButtonLink="/login"
      >
        <form 
          className="signup-auth-form signup-active" 
          onSubmit={handleSubmit}
        >
          <div className="signup-lock-icon">
            <i className="fas fa-lock"></i>
          </div>
          
          <h2>Réinitialisation du mot de passe</h2>
          
          <p className="signup-reset-text">
            Entrez l'adresse email associée à votre compte et nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </p>
          
          <input
            type="email"
            name="email"
            id="email_field"
            placeholder="Votre adresse email"
            value={email}
            onChange={handleChange}
            required
          />
          
          <button 
            type="submit" 
            className="signup-submit-btn"
            id="forgot_password_button"
            disabled={loading ? true : false}
          >
            {loading ? 'Envoi en cours...' : 'Envoyer les instructions'}
          </button>
          
          <div className="signup-additional-options">
            <Link
              to="/login"  
              className="signup-back-btn"
            >
              <i className="fas fa-arrow-left"></i> Retour à la connexion
            </Link>
            
            <p className="signup-contact-support">
              Des problèmes ? <a href="/contact">Contactez notre support</a>
            </p>
          </div>
        </form>
      </AuthLayout>
    </>
  );
};

export default ForgotPassword;