import React, { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';
import { getAllMessages, deleteMessage, clearErrors } from '../../actions/messageActions';
import { DELETE_MESSAGE_RESET } from '../../constants/messageConstants';

const MessagesList = () => {
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
            alert.success('Message deleted successfully');
            navigate('/admin/messages');
            dispatch({ type: DELETE_MESSAGE_RESET });
        }
    }, [dispatch, alert, error, isDeleted, navigate]);

    const deleteMessageHandler = (id) => {
        dispatch(deleteMessage(id));
    };
    
    const setMessages = () => {
        const data = {
            columns: [
                {
                    label: 'Message ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'From',
                    field: 'from',
                    sort: 'asc'
                },
                {
                    label: 'Subject',
                    field: 'subject',
                    sort: 'asc'
                },
                {
                    label: 'Status',
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
                    ? <p style={{ color: 'green' }}>Responded</p>
                    : <p style={{ color: 'red' }}>Pending</p>,
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
            <MetaData title={'All Messages'} />
            <div className="dashboard-content row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Messages</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setMessages()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default MessagesList;