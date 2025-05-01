import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';
import Header from "../layout/Header";
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminTeamMembers, deleteTeamMember, clearErrors } from '../../actions/teamActions';
import { DELETE_TEAM_RESET } from '../../constants/teamConstants';

const TeamList = () => {
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [teamMemberToDelete, setTeamMemberToDelete] = useState(null);
    
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, team } = useSelector(state => state.teamMembers);
    const { error: deleteError, isDeleted } = useSelector(state => state.teamMember);

    useEffect(() => {
        dispatch(getAdminTeamMembers());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Membre de l'équipe supprimé avec succès");
            dispatch({ type: DELETE_TEAM_RESET });
        }
    }, [dispatch, alert, error, deleteError, isDeleted]);

    const deleteTeamHandler = (id) => {
        setTeamMemberToDelete(id);
        setDeleteConfirm(true);
    };

    const confirmDelete = () => {
        dispatch(deleteTeamMember(teamMemberToDelete));
        setDeleteConfirm(false);
    };
    
    const cancelDelete = () => {
        setDeleteConfirm(false);
        setTeamMemberToDelete(null);
    };

    const setTeamMembers = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Nom',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Position',
                    field: 'position',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions'
                }
            ],
            rows: []
        };

        team.forEach(member => {
            data.rows.push({
                id: member._id,
                name: member.name,
                position: member.position,
                actions: (
                    <Fragment>
                        <Link to={`/admin/team/${member._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button 
                            className="btn btn-danger py-1 px-2 ml-2" 
                            onClick={() => deleteTeamHandler(member._id)}
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
            <MetaData title={'All Team Members'} />
            
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
                            <h1 className="my-5">All Team Members</h1>

                            {loading ? <Loader /> : (
                                <MDBDataTable
                                    data={setTeamMembers()}
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
                        <h4>Êtes-vous sûr de supprimer ce membre de l'équipe ?</h4>
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

export default TeamList;