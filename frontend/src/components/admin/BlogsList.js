import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { MDBDataTable } from 'mdbreact'

import MetaData from "../layout/MetaData"
import Loader from '../layout/Loader'
import Sidebar from "./Sidebar"

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminBlogs, deleteBlog, clearErrors } from "../../actions/blogActions"
import { DELETE_BLOG_RESET } from "../../constants/blogConstants"

const BlogList = () => {
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
            alert.success('Blog deleted successfully');
            navigate('/admin/blogs');
            dispatch({ type: DELETE_BLOG_RESET });
        }

    }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

    const setBlogs = () => {
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
                    label: 'Publication Date',
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
                title: blog.title,
                category: blog.category,
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

    const deleteBlogHandler = (id) => {
        dispatch(deleteBlog(id));
    };

    return (
        <Fragment>
            <MetaData title={'All Blogs'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Blog Posts</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setBlogs()}
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

export default BlogList;