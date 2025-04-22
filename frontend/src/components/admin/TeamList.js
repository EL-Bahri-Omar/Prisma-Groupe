import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminTeamMembers, deleteTeamMember, clearErrors } from '../../actions/teamActions';
import { DELETE_TEAM_RESET } from '../../constants/teamConstants';

const TeamList = () => {
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
            alert.success('Team member deleted successfully');
            dispatch({ type: DELETE_TEAM_RESET });
        }
    }, [dispatch, alert, error, deleteError, isDeleted]);

    const setTeamMembers = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
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

    const deleteTeamHandler = (id) => {
        dispatch(deleteTeamMember(id));
    };

    return (
        <Fragment>
            <MetaData title={'All Team Members'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
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
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default TeamList;