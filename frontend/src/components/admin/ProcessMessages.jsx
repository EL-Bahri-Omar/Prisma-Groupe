import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';
import Header from "../layout/Header";
import { getMessageDetails, updateMessage, clearErrors } from '../../actions/messageActions';
import { UPDATE_MESSAGE_RESET } from '../../constants/messageConstants';

const ProcessMessage = () => {
    const [reply, setReply] = useState('');
    const { id } = useParams();
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, message } = useSelector(state => state.messageDetails);
    const { error: updateError, isUpdated } = useSelector(state => state.message);

    useEffect(() => {
        if (message && message._id !== id) {
            dispatch(getMessageDetails(id));
        } else {
            if (message && message.adminReply) {
                setReply(message.adminReply);
            }
        }

        if (error || updateError) {
            alert.error(error || updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Réponse envoyée avec succès');
            navigate('/admin/messages');
            dispatch({ type: UPDATE_MESSAGE_RESET });
        }
    }, [dispatch, alert, error, updateError, isUpdated, navigate, message, id]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateMessage(id, reply));
    };

    return (
        <Fragment>
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
            <MetaData title={`Traiter Message #${id}`} />
            
            <div className="dashboard-content">
                {/* Fixed Header at top */}
                <div className="header-container">
                    <Header />
                </div>
                
                {/* Main Content Area (sidebar + scrollable content) */}
                <div className="main-content-container">
                    {/* Fixed Sidebar below header */}
                    <div className="sidebar-column">
                        <Sidebar />
                    </div>
                    
                    {/* Scrollable Content */}
                    <div className="scrollable-content">
                        {loading ? <Loader /> : (
                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-8 message-details">
                                    <h2 className="my-5"><b><u>Traiter Message :</u></b> {message.subject}</h2>

                                    <h4 className="mb-4">Message Envoyé par :</h4>
                                    <p><b>Nom:</b> {message.name || 'N/A'}</p>
                                    <p><b>Société:</b> {message.societe || 'N/A'}</p>
                                    <p><b>Email:</b> {message.email}</p>
                                    <p><b>Téléphone:</b> {message.phone}</p>
                                    <p className="mb-4"><b>Date:</b> {new Date(message.createdAt).toLocaleString()}</p>

                                    <hr />

                                    <h4 className="my-4">Sujet</h4>
                                    <p>{message.subject}</p>

                                    <h4 className="my-4">Message</h4>
                                    <p style={{ whiteSpace: 'pre-line' }}>{message.message}</p>

                                    {message.adminReply && (
                                        <Fragment>
                                            <hr />
                                            <h4 className="my-4 text-success">Dernière Réponse</h4>
                                            <p style={{ whiteSpace: 'pre-line' }}>{message.adminReply}</p>
                                        </Fragment>
                                    )}
                                </div>
                                
                                <div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">Réponse</h4>
                                    <div className="form-group">
                                        <textarea
                                            className="form-control"
                                            rows="8"
                                            value={reply}
                                            onChange={(e) => setReply(e.target.value)}
                                            placeholder="Type your reply here..."
                                            required
                                        ></textarea>
                                    </div>

                                    <button 
                                        className="btn btn-primary btn-block" 
                                        onClick={submitHandler}
                                    >
                                        Répondre
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ProcessMessage;