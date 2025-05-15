import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { MDBDataTable } from 'mdbreact'
import MetaData from "../layout/MetaData"
import Loader from '../layout/Loader'
import Sidebar from "./Sidebar"
import Header from "../layout/Header"
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminBlogs, deleteBlog, clearErrors } from "../../actions/blogActions"
import { DELETE_BLOG_RESET } from "../../constants/blogConstants"

const BlogList = () => {
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);
    
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, blogs } = useSelector(state => state.blogs);
    const { error: deleteError, isDeleted } = useSelector(state => state.blog);

    useEffect(() => {
        dispatch(getAdminBlogs());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success('Blog supprimé avec succès');
            navigate('/admin/blogs');
            dispatch({ type: DELETE_BLOG_RESET });
        }

    }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

    const deleteBlogHandler = (id) => {
        setBlogToDelete(id);
        setDeleteConfirm(true);
    };

    const confirmDelete = () => {
        dispatch(deleteBlog(blogToDelete));
        setDeleteConfirm(false);
    };
    
    const cancelDelete = () => {
        setDeleteConfirm(false);
        setBlogToDelete(null);
    };

    const setBlogs = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Titre',
                    field: 'titre',
                    sort: 'asc'
                },
                {
                    label: 'Catégorie',
                    field: 'categorie',
                    sort: 'asc'
                },
                {
                    label: 'Date de Publication',
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

        blogs.forEach(blog => {
            data.rows.push({
                id: blog._id,
                titre: blog.title,
                categorie: blog.category,
                date: new Date(blog.publicationDate).toLocaleDateString(),
                actions: (
                    <Fragment>
                        <Link to={`/admin/blog/${blog._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button 
                            className="btn btn-danger py-1 px-2 ml-2" 
                            onClick={() => deleteBlogHandler(blog._id)}
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
            <MetaData title={'Tous Les Articles du Blog'} />
            
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
                            <h1 className="my-5">Tous Les Articles du Blog</h1>

                            {loading ? <Loader /> : (
                                <MDBDataTable
                                    data={setBlogs()}
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
                        <h4>Êtes-vous sûr de supprimer ce blog ?</h4>
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

export default BlogList;