import React, { Fragment, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogDetails, clearErrors } from '../../actions/blogActions';

const BlogDetails = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();

    const { loading, error, blog } = useSelector(state => state.blogDetails);

    useEffect(() => {
        dispatch(getBlogDetails(id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error, id]);

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={blog?.title} />
                    <div className="row d-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid">
                            {/* Display Blog Images in Carousel */}
                            {blog?.images?.length > 0 && (
                                <Carousel pause="hover">
                                    {blog.images.map(image => (
                                        <Carousel.Item key={image.public_id}>
                                            <img className="d-block w-100" src={image.url} alt="Blog" />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            )}
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{blog?.title}</h3>
                            <p><strong>Category:</strong> {blog?.category}</p>
                            <p><strong>By:</strong> {blog?.author}</p>
                            <hr />

                            {/* Display PDF Download Button */}
                            {blog?.pdf?.url && (
                                <a href={blog.pdf.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                    Download PDF
                                </a>
                            )}

                            {/* Display Blog Content */}
                            {blog?.content && (
                                <div className="mt-3">
                                    <h4>Blog Content:</h4>
                                    <p>{blog.content}</p>
                                </div>
                            )}

                            <hr />

                            {/* Display Tags */}
                            {blog?.tags?.length > 0 && (
                                <p><strong>Tags:</strong> {blog.tags.join(', ')}</p>
                            )}
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default BlogDetails;
