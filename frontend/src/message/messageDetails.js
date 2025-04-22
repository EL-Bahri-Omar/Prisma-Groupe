import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { getMessageDetails, clearErrors } from '../../actions/messageActions';

const MessageDetails = () => {
    const { id } = useParams();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, message } = useSelector(state => state.messageDetails);

    useEffect(() => {
        dispatch(getMessageDetails(id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error, id]);

    return (
        <Fragment>
            <MetaData title={'Message Details'} />
            {loading ? <Loader /> : (
                <div className="container container-fluid">
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-lg-8 mt-5 message-details">
                            <h1 className="my-5">Message # {message._id}</h1>

                            <h4 className="mb-4">Details</h4>
                            <p><b>Sent:</b> {new Date(message.createdAt).toLocaleString()}</p>
                            <p><b>Subject:</b> {message.subject}</p>
                            <p><b>Status:</b> {message.isResponded ? (
                                <span className="text-success">Responded</span>
                            ) : (
                                <span className="text-danger">Pending</span>
                            )}</p>

                            <hr />

                            <h4 className="my-4">Your Message</h4>
                            <p style={{ whiteSpace: 'pre-line' }}>{message.message}</p>

                            {message.adminReply && (
                                <Fragment>
                                    <hr />
                                    <h4 className="my-4 text-success">Admin Response</h4>
                                    <p style={{ whiteSpace: 'pre-line' }}>{message.adminReply}</p>
                                </Fragment>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default MessageDetails;