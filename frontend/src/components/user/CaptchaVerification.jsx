import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { register } from '../../actions/userActions';
import MetaData from '../layout/MetaData';
import AuthLayout from './AuthLayout';
import Loader from '../layout/Loader';
import axios from 'axios';

const CaptchaVerification = ({ userData, onSuccess, onClose }) => {
    const [captchaData, setCaptchaData] = useState({
        images: [],
        instruction: '',
        sessionToken: '',
        attempts: 0
    });
    const [selectedImages, setSelectedImages] = useState([]);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!userData) {
            alert.error('Aucune donnée disponible, veuillez vous inscrire à nouveau');
            onClose();
            return;
        }
        loadNewCaptcha();
    }, [userData, alert, onClose]);
    
    const loadNewCaptcha = async () => {
        try {
            setIsVerifying(true);
            setIsLoading(true);
            setErrorMessage('');
            const { data } = await axios.get('/api/v1/captcha/generate');
            setCaptchaData({
                images: data.images,
                instruction: data.instruction || 'Sélectionnez les images correspondantes',
                sessionToken: data.sessionToken,
                attempts: captchaData.attempts
            });
            setSelectedImages([]);
        } catch (error) {
            alert.error('Échec du chargement de la vérification');
            onClose();
        } finally {
            setIsVerifying(false);
            setIsLoading(false);
        }
    };
    
    const verifyCaptcha = async () => {
        if (selectedImages.length === 0) {
            setErrorMessage('Veuillez sélectionner au moins une image');
            return;
        }
        
        try {
            setIsVerifying(true);
            setErrorMessage('');
            const { data } = await axios.post('/api/v1/captcha/verify', {
                sessionToken: captchaData.sessionToken,
                selectedIndices: selectedImages
            });
            
            if (data.success) {
                const formData = new FormData();
                formData.set('name', userData.name);
                formData.set('email', userData.email);
                formData.set('password', userData.password);
                formData.set('avatar', userData.avatar);
                formData.set('captchaVerified', true);
                
                dispatch(register(formData));
                onSuccess();
            } else {
                const updatedAttempts = captchaData.attempts + 1;
                setCaptchaData(prev => ({
                    ...prev,
                    attempts: updatedAttempts
                }));
                
                if (updatedAttempts >= 3) {
                    alert.error('Nombre maximum de tentatives atteint. Veuillez réessayer.');
                    onClose();
                } else {
                    setErrorMessage(`Sélection incorrecte. Tentatives restantes: ${3 - updatedAttempts}`);
                    await loadNewCaptcha();
                }
            }
        } catch (error) {
            const message = error.response?.data?.message || 'La vérification a échoué';
            if (error.response?.status === 401) {
                setErrorMessage('Session expirée. Nouvelle vérification requise.');
                await loadNewCaptcha();
            } else {
                setErrorMessage(message);
            }
        } finally {
            setIsVerifying(false);
        }
    };
    
    const toggleImageSelection = (index) => {
        setSelectedImages(prev => 
            prev.includes(index) 
                ? prev.filter(i => i !== index) 
                : [...prev, index]
        );
    };
    
    return (
        <Fragment>
            <MetaData title={'Vérification de sécurité'} />
            {isLoading ? <Loader /> : (
                <div className="captcha-verification">
                    <h3>Vérification de sécurité</h3>
                    <p>{captchaData.instruction}</p>
                    
                    {errorMessage && (
                        <div className="captcha-error-message">
                            {errorMessage}
                        </div>
                    )}
                    
                    <div className="captcha-image-grid">
                        {captchaData.images.map((image, index) => (
                            <div 
                                key={image.id}
                                className={`captcha-image ${selectedImages.includes(index) ? 'selected' : ''}`}
                                onClick={() => !isVerifying && toggleImageSelection(index)}
                            >
                                <img 
                                    src={image.url} 
                                    alt={`Image ${index}`}
                                    loading="lazy"
                                />
                                {selectedImages.includes(index) && (
                                    <div className="checkmark"></div>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    <div className="captcha-footer">
                        <div className="captcha-actions">
                            <button
                                type="button"
                                className="captcha-refresh-btn"
                                onClick={loadNewCaptcha}
                                disabled={isVerifying}
                            >
                                <span className="refresh-icon">↻</span> Nouvelles images
                            </button>
                            
                            <button
                                type="button"
                                className="captcha-back-btn"
                                onClick={onClose}
                            >
                                Retour à l'inscription
                            </button>
                        </div>
                        
                        <button
                            type="button"
                            className="signup-submit-btn captcha-submit-btn"
                            onClick={verifyCaptcha}
                            disabled={selectedImages.length === 0 || isVerifying}
                        >
                            {isVerifying ? 'Vérification...' : 'Vérifier'}
                        </button>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default CaptchaVerification;