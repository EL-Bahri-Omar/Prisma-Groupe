import React, { Fragment, useState, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import MetaData from "../layout/MetaData"
import Loader from '../layout/Loader'
import Sidebar from "./Sidebar"
import Header from "../layout/Header";

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProjectReviews, deleteReview, clearErrors } from "../../actions/projectActions"
import { DELETE_REVIEW_RESET } from "../../constants/projectConstants"

const ProjectReviews = () => {
    const [projectId, setProjectId] = useState('')
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [reviewToDelete, setReviewToDelete] = useState(null)

    const alert = useAlert()
    const dispatch = useDispatch()
        
    const { loading, error, reviews } = useSelector(state => state.projectReviews)
    const { isDeleted } = useSelector(state => state.review)
        
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        
        if (projectId !== '') {
            dispatch(getProjectReviews(projectId))
        }
    
        if (isDeleted) {
            alert.success('Avis supprimé avec succès')
            dispatch({ type: DELETE_REVIEW_RESET })
            // Refresh reviews after deletion
            if (projectId !== '') {
                dispatch(getProjectReviews(projectId))
            }
        }
    
    }, [dispatch, alert, error, projectId, isDeleted])
    
    const deleteReviewHandler = (id) => {
        setReviewToDelete(id)
        setDeleteConfirm(true)
    }

    const confirmDelete = () => {
        dispatch(deleteReview(reviewToDelete, projectId))
        setDeleteConfirm(false)
    }

    const cancelDelete = () => {
        setDeleteConfirm(false)
        setReviewToDelete(null)
    }

    const submitHandler = (e) => { 
        e.preventDefault()
        dispatch(getProjectReviews(projectId))
    }
        
    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Note',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Commentaire',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'Utilisateur',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions'
                }
            ],
            rows: []
        }
        
        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,
                actions:
                    <button 
                        className="btn btn-danger py-1 px-2 ml-2" 
                        onClick={() => deleteReviewHandler(review._id)}
                    >
                        <i className="fa fa-trash"></i>
                    </button>
            })
        })
        
        return data
    }

    return (
        <Fragment>
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
            <MetaData title={'Project Reviews'}/>
            
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
                            <div className="row justify-content-center mt-5">
                                <div className="col-5">
                                    <form onSubmit={submitHandler}>
                                        <div className="form-group">
                                            <label htmlFor="projectId_field">Enter Project ID</label>
                                            <input
                                                type="text"
                                                id="projectId_field"
                                                className="form-control"
                                                value={projectId}
                                                onChange={(e) => setProjectId(e.target.value)}
                                            />
                                        </div>

                                        <button
                                            id="search_button"
                                            type="submit"
                                            className="btn btn-primary btn-block py-2"
                                        >
                                            SEARCH
                                        </button>
                                    </form>
                                </div>                            
                            </div>

                            {loading ? <Loader /> : (
                                reviews && reviews.length > 0 ? (
                                    <MDBDataTable
                                        data={setReviews()}
                                        className="px-3"
                                        bordered
                                        striped
                                        hover
                                    />
                                ) : (
                                    <p className="mt-5 text-center">No Reviews</p>
                                )
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
                        <h4>Êtes-vous sûr de supprimer cet avis ?</h4>
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
    )
}

export default ProjectReviews