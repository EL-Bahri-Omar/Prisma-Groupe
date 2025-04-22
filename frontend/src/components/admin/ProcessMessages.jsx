import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';
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
            alert.success('Reply sent successfully');
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
            <MetaData title={`Process Message #${id}`} />
            <div className="dashboard-content row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        {loading ? <Loader /> : (
                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-8 message-details">
                                    <h2 className="my-5">Message # {message._id}</h2>

                                    <h4 className="mb-4">From</h4>
                                    <p><b>Name:</b> {message.name || 'N/A'}</p>
                                    <p><b>Company:</b> {message.societe || 'N/A'}</p>
                                    <p><b>Email:</b> {message.email}</p>
                                    <p><b>Phone:</b> {message.phone}</p>
                                    <p className="mb-4"><b>Date:</b> {new Date(message.createdAt).toLocaleString()}</p>

                                    <hr />

                                    <h4 className="my-4">Subject</h4>
                                    <p>{message.subject}</p>

                                    <h4 className="my-4">Message</h4>
                                    <p style={{ whiteSpace: 'pre-line' }}>{message.message}</p>

                                    {message.adminReply && (
                                        <Fragment>
                                            <hr />
                                            <h4 className="my-4 text-success">Previous Reply</h4>
                                            <p style={{ whiteSpace: 'pre-line' }}>{message.adminReply}</p>
                                        </Fragment>
                                    )}
                                </div>
                                
                                <div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">Reply</h4>
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
                                        Send Reply
                                    </button>
                                </div>
                            </div>
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default ProcessMessage;