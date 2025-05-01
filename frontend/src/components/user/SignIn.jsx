import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from './AuthLayout';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors } from '../../actions/userActions';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

const SignIn = () => {
  const navigate = useNavigate();
  
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      
      const alert = useAlert();
      const dispatch = useDispatch();
      
      const { isAuthenticated, error, loading } = useSelector(state => state.auth);
      
      useEffect(() => {
          if (isAuthenticated) {
              navigate('/');
          }
              
          if (error) {
      if (error.includes('Invalid') || error.includes('Invalide')) {
        alert.error('Email ou mot de passe incorrect');
      } else {
        alert.error(error);
      }
      dispatch(clearErrors());
    }
      }, [dispatch, alert, isAuthenticated, error, navigate]);
      
      const submitHandler = (e) => {
          e.preventDefault();
          dispatch(login(email, password))
      }

  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={'Connexion'} />
          <AuthLayout 
            overlayTitle="Nouveau ici ?"
            overlayText="Inscrivez-vous et découvrez toutes les fonctionnalités que nous proposons"
            overlayButtonText="S'inscrire"
            overlayButtonLink="/signup"
          >
            <form 
              className="signup-auth-form signup-active" 
              onSubmit={submitHandler}
            >
              <h2>Bienvenue à nouveau</h2>
              
              <div className="signup-divider">
                <span>ou connectez-vous avec votre email</span>
              </div>
              
              <input
                type="email"
                name="email"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <input
                type="password"
                name="motDePasse"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <div className="signup-form-options">
                <Link
                  to="/password/forgot"
                  className="signup-forgot-link"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              
              <button type="submit" className="signup-submit-btn">
                Se connecter
              </button>
              
              <p className="signup-switch-text">
                Pas encore de compte ?{' '}
                <Link
                  to="/signup"  
                  className="signup-switch-link"
                >
                  Créer un compte
                </Link>
              </p>
            </form>
          </AuthLayout>
        </Fragment>
      )}
    </Fragment>
  );
};

export default SignIn;