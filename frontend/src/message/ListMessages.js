import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { myMessages, clearErrors } from '../../actions/messageActions';

const UserMessages = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, messages } = useSelector(state => state.myMessages);

    useEffect(() => {
        dispatch(myMessages());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error]);

    const setMessages = () => {
        const data = {
            columns: [
                {
                    label: 'Message ID',
                    field: 'id',
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
                subject: message.subject,
                status: message.isResponded 
                    ? <p style={{ color: 'green' }}>Responded</p>
                    : <p style={{ color: 'red' }}>Pending</p>,
                date: new Date(message.createdAt).toLocaleDateString(),
                actions: (
                    <Link to={`/message/${message._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-eye"></i>
                    </Link>
                )
            });
        });

        return data;
    };

    return (
        <Fragment>
            <MetaData title={'My Messages'} />
            <h1 className="my-5">My Messages</h1>
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
    );
};

export default UserMessages;