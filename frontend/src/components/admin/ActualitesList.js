import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminActualites, deleteActualite, clearErrors } from '../../actions/actualiteActions';
import { DELETE_ACTUALITE_RESET } from '../../constants/actualiteConstants';

const ActualiteList = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, actualites } = useSelector(state => state.actualites);
    const { error: deleteError, isDeleted } = useSelector(state => state.actualite);

    useEffect(() => {
        dispatch(getAdminActualites());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success('News deleted successfully');
            dispatch({ type: DELETE_ACTUALITE_RESET });
        }
    }, [dispatch, alert, error, deleteError, isDeleted]);

    const setActualites = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Title',
                    field: 'title',
                    sort: 'asc'
                },
                {
                    label: 'Category',
                    field: 'category',
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

        actualites.forEach(actualite => {
            data.rows.push({
                id: actualite._id,
                title: actualite.title,
                category: actualite.category,
                date: new Date(actualite.date).toLocaleDateString(),
                actions: (
                    <Fragment>
                        <Link to={`/admin/actualite/${actualite._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button 
                            className="btn btn-danger py-1 px-2 ml-2" 
                            onClick={() => deleteActualiteHandler(actualite._id)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                )
            });
        });

        return data;
    };

    const deleteActualiteHandler = (id) => {
        dispatch(deleteActualite(id));
    };

    return (
        <Fragment>
            <MetaData title={'All News'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All News</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setActualites()}
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

export default ActualiteList;