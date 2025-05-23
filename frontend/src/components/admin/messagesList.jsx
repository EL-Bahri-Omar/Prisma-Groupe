import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';
import Header from "../layout/Header"

import { getAllMessages, deleteMessage, clearErrors } from '../../actions/messageActions';
import { DELETE_MESSAGE_RESET } from '../../constants/messageConstants';

const MessagesList = () => {
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [messageToDelete, setMessageToDelete] = useState(null);
    
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    
    const { loading, error, messages } = useSelector(state => state.allMessages);
    const { isDeleted } = useSelector(state => state.message);
    
    useEffect(() => {
        dispatch(getAllMessages());
    
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success('Message supprimé avec succès');
            navigate('/admin/messages');
            dispatch({ type: DELETE_MESSAGE_RESET });
        }
    }, [dispatch, alert, error, isDeleted, navigate]);

    const deleteMessageHandler = (id) => {
        setMessageToDelete(id);
        setDeleteConfirm(true);
    };
    
    const confirmDelete = () => {
        dispatch(deleteMessage(messageToDelete));
        setDeleteConfirm(false);
    };
    
    const cancelDelete = () => {
        setDeleteConfirm(false);
        setMessageToDelete(null);
    };
    
    const setMessages = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'De',
                    field: 'from',
                    sort: 'asc'
                },
                {
                    label: 'Sujet',
                    field: 'subject',
                    sort: 'asc'
                },
                {
                    label: 'Statut',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Date',
                    field: 'date',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions'
                }
            ],
            rows: []
        };
    
        messages.forEach(message => {
            data.rows.push({
                id: message._id,
                from: message.name || message.societe || message.email,
                subject: message.subject,
                status: message.isResponded
                    ? <p style={{ color: 'green' }}>Répondu</p>
                    : <p style={{ color: 'red' }}>En attente</p>,
                date: new Date(message.createdAt).toLocaleDateString(),
                actions: (
                    <Fragment>
                        <Link to={`/admin/message/${message._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-eye"></i>
                        </Link>
                        <button
                            className="btn btn-danger py-1 px-2 ml-2"
                            onClick={() => deleteMessageHandler(message._id)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                )
            });
        });
        
        return data;
    };
    
    return (
        <Fragment>
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
            <MetaData title={'Tout Les Messages'} />
            
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
                            <h1 className="my-5">Tout Les Messages</h1>

                            {loading ? <Loader /> : (
                                <MDBDataTable
                                    data={setMessages()}
                                    className="px-3"
                                    bordered
                                    striped
                                    hover
                                />
                            )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="modal-backdrop" style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1050
                }}>
                    <div className="modal-content" style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '5px',
                        maxWidth: '500px',
                        width: '90%'
                    }}>
                        <h4>Êtes-vous sûr de supprimer ce message ?</h4>
                        <div className="modal-footer" style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: '20px'
                        }}>
                            <button 
                                onClick={cancelDelete} 
                                className="btn btn-secondary mr-2"
                                style={{marginRight: '10px'}}
                            >
                                Annuler
                            </button>
                            <button 
                                onClick={confirmDelete} 
                                className="btn btn-danger"
                            >
                                Oui, supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default MessagesList;