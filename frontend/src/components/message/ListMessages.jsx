import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { MDBDataTable } from 'mdbreact';
import MetaData from "../layout/MetaData";
import Loader from '../layout/Loader';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getMyMessages, clearErrors } from "../../actions/messageActions";
import Sidebar from '../sidebar/Sidebar';
import '../../styles/dashboard.css';

const ListMessages = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, messages } = useSelector(state => state.myMessages);

  useEffect(() => {
    dispatch(getMyMessages());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const setMessages = () => {
    const data = {
      columns: [
        {
          label: 'Date',
          field: 'date',
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
          label: 'Actions',
          field: 'actions',
          sort: 'asc'
        }
      ],
      rows: []
    };

    messages.forEach(message => {
      data.rows.push({
        date: new Date(message.createdAt).toLocaleDateString(),
        subject: message.subject,
        status: message.isResponded 
          ? <span style={{ color: 'green' }}>Répondu</span>
          : <span style={{ color: 'orange' }}>En attente</span>,
        actions:
          <Link to={`/message/${message._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i> Voir
          </Link>
      });
    });

    return data;
  };

  return (
    <Fragment>
      <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
      <MetaData title={'Mes Messages'} />
      
      <div className={`dashboard-content app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <div>
          <div className="row mt-5">
            <div className="col-12 col-md-2">
              <Sidebar />
            </div>

            <div className="col- col-md-8">
              <h1 className="my-4">Mes Messages</h1>
              
              {loading ? <Loader /> : (
                <div className="px-3">
                  <MDBDataTable
                    data={setMessages()}
                    className="px-3"
                    bordered
                    striped
                    hover
                    responsive
                    entriesOptions={[5, 10, 15]}
                    entries={5}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ListMessages;