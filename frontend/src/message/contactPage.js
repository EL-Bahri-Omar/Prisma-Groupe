import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { createMessage } from '../../actions/messageActions';
import Sidebar from '../Sidebar';
import GoBack from '../GoBack';
import './contact.css';

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

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        
        if (!formData.email || !formData.subject || !formData.message) {
            alert.error('Please fill all required fields');
            return;
        }
        
        dispatch(createMessage(formData));
        
        // Reset form
        setFormData({
            name: '',
            societe: '',
            phone: '',
            email: '',
            subject: '',
            message: ''
        });
        
        // Close modal
        setShowModal(false);
        
        // Redirect to messages
        navigate('/messages/me');
    };

    return (
        <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
            {/* ... (rest of your existing layout) ... */}
            
            {/* Updated Modal */}
            {showModal && (
                <div className="full-screen-modal">
                    <div className="modal-content">
                        <button 
                            onClick={() => setShowModal(false)}
                            className="modal-close"
                        >
                            ×
                        </button>
                        
                        <h2>CONTACT US</h2>
                        <hr className="modal-separator" />
                        
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <input 
                                    type="text" 
                                    name="name"
                                    placeholder="Name" 
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                                <input 
                                    type="text" 
                                    name="societe"
                                    placeholder="Company" 
                                    value={formData.societe}
                                    onChange={handleInputChange}
                                />
                            </div>
                            
                            <div className="form-row">
                                <input 
                                    type="tel" 
                                    name="phone"
                                    placeholder="Phone" 
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="Email*" 
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            
                            <input 
                                type="text" 
                                name="subject"
                                placeholder="Subject*" 
                                value={formData.subject}
                                onChange={handleInputChange}
                                required
                            />
                            
                            <textarea 
                                name="message"
                                placeholder="Message*"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                            
                            <button 
                                type="submit" 
                                className="submit-button"
                            >
                                SEND
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