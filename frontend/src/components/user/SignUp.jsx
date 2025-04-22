import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from './AuthLayout';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearErrors } from '../../actions/userActions';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

const SignUp = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');

    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    
    const { isAuthenticated, error, loading } = useSelector(state => state.auth);
    
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
            
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, isAuthenticated, error, navigate]);
    
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);

        dispatch(register(formData));
    }

    const onChange = e => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Inscription'} />
                    <AuthLayout 
                        overlayTitle="Content de vous revoir !"
                        overlayText="Connectez-vous avec vos identifiants pour accéder à votre compte"
                        overlayButtonText="Se connecter"
                        overlayButtonLink="/login"
                    >
                        <form 
                            className="signup-auth-form signup-active" 
                            onSubmit={submitHandler}
                            encType="multipart/form-data"
                        >
                            <h2>Créer votre compte</h2>
                            
                            <div className="signup-divider">
                                <span>ou inscrivez-vous avec votre email</span>
                            </div>
                            
                            <input
                                type="text"
                                name="name"
                                placeholder="Nom complet"
                                value={name}
                                onChange={onChange}
                                required
                            />
                            
                            <input
                                type="email"
                                name="email"
                                placeholder="Adresse email"
                                value={email}
                                onChange={onChange}
                                required
                            />
                            
                            <input
                                type="password"
                                name="password"
                                placeholder="Créez un mot de passe"
                                value={password}
                                onChange={onChange}
                                required
                            />
                            
                            <div className="avatar-upload">
                                <div className="avatar-preview">
                                    <img 
                                        src={avatarPreview} 
                                        alt="Avatar Preview" 
                                        className="rounded-circle"
                                    />
                                </div>
                                <label htmlFor="avatar-upload" className="avatar-upload-label">
                                    Choisir une photo de profil
                                    <input
                                        type="file"
                                        id="avatar-upload"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={onChange}
                                        hidden
                                    />
                                </label>
                            </div>
                            
                            <button
                                type="submit"
                                className="signup-submit-btn"
                                disabled={loading}
                            >
                                {loading ? 'Inscription en cours...' : 'S\'inscrire'}
                            </button>
                            
                            <p className="signup-switch-text">
                                Vous avez déjà un compte ?{' '}
                                <Link
                                    to="/login"  
                                    className="signup-switch-link"
                                >
                                    Se connecter
                                </Link>
                            </p>
                        </form>
                    </AuthLayout>
                </Fragment>
            )}
        </Fragment>
    );
};

export default SignUp;