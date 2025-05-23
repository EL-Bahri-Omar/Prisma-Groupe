import React, { Fragment, useState, useEffect, useRef } from 'react'
import { MDBDataTable } from 'mdbreact'
import MetaData from "../layout/MetaData"
import Loader from '../layout/Loader'
import Sidebar from "./Sidebar"
import Header from "../layout/Header";
import moment from 'moment';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProjectReviews, deleteReview, clearErrors, getProjects } from "../../actions/projectActions"
import { DELETE_REVIEW_RESET } from "../../constants/projectConstants"

const ProjectReviews = () => {
    const [searchInput, setSearchInput] = useState('')
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [reviewToDelete, setReviewToDelete] = useState(null)
    const [projects, setProjects] = useState([])
    const [filteredProjects, setFilteredProjects] = useState([])
    const [selectedProject, setSelectedProject] = useState(null)
    const [showDropdown, setShowDropdown] = useState(false)
    const searchRef = useRef(null)

    const alert = useAlert()
    const dispatch = useDispatch()
        
    const { loading, error, reviews } = useSelector(state => state.projectReviews)
    const { isDeleted } = useSelector(state => state.review)
    const { projects: allProjects, loading: projectsLoading } = useSelector(state => state.projects)

    // Handle clicks outside the search dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])
        
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    
        if (isDeleted) {
            alert.success('Avis supprimé avec succès')
            dispatch({ type: DELETE_REVIEW_RESET })
            if (selectedProject) {
                dispatch(getProjectReviews(selectedProject._id))
            }
        }

        dispatch(getProjects())
    }, [dispatch, alert, error, isDeleted, selectedProject])

    useEffect(() => {
        if (allProjects) {
            setProjects(allProjects)
            setFilteredProjects(allProjects)
        }
    }, [allProjects])

    useEffect(() => {
        if (searchInput) {
            const filtered = projects.filter(project => 
                project.title.toLowerCase().includes(searchInput.toLowerCase()) ||
                project._id.toLowerCase().includes(searchInput.toLowerCase())
            )
            setFilteredProjects(filtered)
            setShowDropdown(true)
        } else {
            setFilteredProjects(projects)
            setShowDropdown(false)
        }
    }, [searchInput, projects])
    
    const deleteReviewHandler = (id) => {
        setReviewToDelete(id)
        setDeleteConfirm(true)
    }

    const confirmDelete = () => {
        if (selectedProject) {
            dispatch(deleteReview(reviewToDelete, selectedProject._id))
        }
        setDeleteConfirm(false)
    }

    const cancelDelete = () => {
        setDeleteConfirm(false)
        setReviewToDelete(null)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (selectedProject) {
            dispatch(getProjectReviews(selectedProject._id))
        } else if (searchInput) {
            // Try to find exact match by ID first
            const projectById = projects.find(p => p._id === searchInput)
            if (projectById) {
                handleProjectSelect(projectById)
            } else {
                // Try to find exact match by name
                const projectByName = projects.find(p => 
                    p.title.toLowerCase() === searchInput.toLowerCase()
                )
                if (projectByName) {
                    handleProjectSelect(projectByName)
                } else {
                    alert.error('Aucun projet trouvé avec cet ID ou nom')
                }
            }
        }
    }

    const handleProjectSelect = (project) => {
        setSelectedProject(project)
        setSearchInput(project.title)
        setShowDropdown(false)
        dispatch(getProjectReviews(project._id))
    }

    const clearSearch = () => {
        setSearchInput('')
        setSelectedProject(null)
        setShowDropdown(false)
    }

    const handleInputFocus = () => {
        if (searchInput && filteredProjects.length > 0) {
            setShowDropdown(true)
        }
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
        }
        
        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,
                date: moment(review.createdAt).format('DD/MM/YYYY'),
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
            <MetaData title={'Avis des Projets'}/>
            
            <div className="dashboard-content">
                <div className="header-container">
                    <Header />
                </div>
                
                <div className="main-content-container">
                    <div className="sidebar-column">
                        <Sidebar />
                    </div>
                    
                    <div className="scrollable-content">
                        <div className="container-fluid">
                            <div className="row justify-content-center mt-5">
                                <div className="col-md-8">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title mb-4">Rechercher des avis</h4>
                                            
                                            <form onSubmit={handleSearchSubmit}>
                                                <div className="position-relative" ref={searchRef}>
                                                    <label className="form-label">Rechercher par ID ou nom de projet</label>
                                                    <div className="input-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={searchInput}
                                                            onChange={(e) => setSearchInput(e.target.value)}
                                                            onFocus={handleInputFocus}
                                                            placeholder="Entrez l'ID ou le nom du projet"
                                                        />
                                                        <button
                                                            className="btn btn-secondary ml-2"
                                                            type="button"
                                                            onClick={clearSearch}
                                                        >
                                                            Effacer
                                                        </button>
                                                    </div>
                                                    
                                                    {projectsLoading && (
                                                        <div className="position-absolute w-100 mt-1 p-2 bg-white border">
                                                            Chargement des projets...
                                                        </div>
                                                    )}
                                                    
                                                    {showDropdown && searchInput && !projectsLoading && (
                                                        <div className="list-group position-absolute w-100 mt-1" style={{zIndex: 1000}}>
                                                            {filteredProjects.map(project => (
                                                                <button
                                                                    key={project._id}
                                                                    type="button"
                                                                    className="list-group-item list-group-item-action text-left"
                                                                    onClick={() => handleProjectSelect(project)}
                                                                >
                                                                    <div>
                                                                        <strong>{project.title}</strong>
                                                                        <div className="text-muted small">ID: {project._id}</div>
                                                                    </div>
                                                                </button>
                                                            ))}
                                                            {filteredProjects.length === 0 && searchInput && !projectsLoading && (
                                                                <div className="list-group-item">
                                                                    Aucun projet trouvé
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>                            
                            </div>

                            {selectedProject && (
                                <div className="row mt-4">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    Avis du projet: {selectedProject.title}
                                                </h5>
                                                {loading ? <Loader /> : (
                                                    reviews && reviews.length > 0 ? (
                                                        <MDBDataTable
                                                            data={setReviews()}
                                                            className="px-3"
                                                            bordered
                                                            striped
                                                            hover
                                                            responsive
                                                            noBottomColumns
                                                        />
                                                    ) : (
                                                        <p className="text-center">Aucun avis trouvé pour ce projet</p>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

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