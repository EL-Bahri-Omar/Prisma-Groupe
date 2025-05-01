import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from '../layout/Loader';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getMessageDetails, clearErrors } from "../../actions/messageActions";
import Sidebar from '../sidebar/Sidebar';
import '../../styles/dashboard.css';

const MessageDetails = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, error, message } = useSelector(state => state.messageDetails);

  useEffect(() => {
    dispatch(getMessageDetails(id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <Fragment>
      <MetaData title={'Détails du Message'} />
      <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
      
      <div className={`dashboard-content app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <div >
          <div className="row">
            <div className="col-12 col-md-2">
              <Sidebar />
            </div>

            <div className="col-8 col-md-8">
              {loading ? <Loader /> : (
                <div className="px-3">
                  <h1 className="my-4">Message : {message?.subject}</h1>

                  <div className="card mb-4">
                    <div className="card-body">
                      <h4 className="mb-4">Informations</h4>
                      <p><b>Date: </b>{message?.createdAt && formatDate(message.createdAt)}</p>
                      {message?.name && <p><b>Nom: </b>{message.name}</p>}
                      {message?.societe && <p><b>Société: </b>{message.societe}</p>}
                      <p><b>Email: </b>{message?.email}</p>
                      <p><b>Téléphone: </b>{message?.phone}</p>
                    </div>
                  </div>

                  <div className="card mb-4">
                    <div className="card-body">
                      <h4 className="mb-4">Sujet</h4>
                      <p>{message?.subject}</p>

                      <h4 className="my-4">Message</h4>
                      <p>{message?.message}</p>
                    </div>
                  </div>

                  {message?.isResponded ? (
                    <div className="card mb-4">
                      <div className="card-body">
                        <h4 className="mb-4">Réponse de l'administrateur</h4>
                        <p>{message?.adminReply}</p>
                        <p className="text-muted small">
                          Répondu le: {message?.updatedAt && formatDate(message.updatedAt)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="alert alert-info">
                      Votre message n'a pas encore reçu de réponse.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MessageDetails;