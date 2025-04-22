import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import MetaData from "../layout/MetaData"
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProjectDetails, clearErrors } from "../../actions/projectActions"
import { NEW_REVIEW_RESET } from "../../constants/projectConstants"
import ListReviews from '../review/ListReviews'
import { Carousel } from 'react-bootstrap'

const ProjectDetails = () => {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()
    const { id } = useParams()

    const { project, error } = useSelector(state => state.projectDetails)
    const { user } = useSelector(state => state.auth)
    const { error: reviewError, success } = useSelector(state => state.newReview)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (reviewError) {
            alert.error(reviewError)
            dispatch(clearErrors())
        }

        if (success) {
            alert.success('Review posted successfully')
            dispatch({ type: NEW_REVIEW_RESET })
        }

        dispatch(getProjectDetails(id))
    }, [dispatch, alert, error, reviewError, success, id])

    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('rating', rating)
        formData.set('comment', comment)
        formData.set('projectId', id)

        dispatch(createProjectReview(formData))
    }

    return (
        <Fragment>
            <MetaData title={project.title} />
            
            <div className="row f-flex justify-content-around">
                <div className="col-12 col-lg-5 img-fluid" id="project_image">
                    <Carousel pause='hover'>
                        <Carousel.Item key={project.image.public_id}>
                            <img 
                                className="d-block w-100" 
                                src={project.image.url} 
                                alt={project.title} 
                            />
                        </Carousel.Item>
                        
                        {project.photos && project.photos.map(photo => (
                            <Carousel.Item key={photo.public_id}>
                                <img 
                                    className="d-block w-100" 
                                    src={photo.url} 
                                    alt={project.title} 
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>

                <div className="col-12 col-lg-5 mt-5">
                    <h3>{project.title}</h3>
                    <p className="text-muted">{project.subtitle}</p>
                    <p id="project_id">Project # {project._id}</p>

                    <hr />

                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${(project.ratings / 5) * 100}%` }}></div>
                    </div>
                    <span id="no_of_reviews">({project.numOfReviews} Reviews)</span>

                    <hr />

                    <p><b>Category:</b> {project.category}</p>
                    <p><b>Location:</b> {project.place}</p>
                    <p><b>Date:</b> {new Date(project.date).toLocaleDateString()}</p>

                    <hr />

                    <h4 className="mt-2">Description:</h4>
                    <p>{project.description}</p>
                    <hr />

                    {user ? (
                        <div className="row mt-2 mb-5">
                            <div className="rating w-50">
                                <div className="star-wrapper">
                                    <input 
                                        type="radio" 
                                        name="rating" 
                                        id="star-1" 
                                        value="1" 
                                        onChange={(e) => setRating(e.target.value)} 
                                    />
                                    <label htmlFor="star-1"></label>
                                    <input 
                                        type="radio" 
                                        name="rating" 
                                        id="star-2" 
                                        value="2" 
                                        onChange={(e) => setRating(e.target.value)} 
                                    />
                                    <label htmlFor="star-2"></label>
                                    <input 
                                        type="radio" 
                                        name="rating" 
                                        id="star-3" 
                                        value="3" 
                                        onChange={(e) => setRating(e.target.value)} 
                                    />
                                    <label htmlFor="star-3"></label>
                                    <input 
                                        type="radio" 
                                        name="rating" 
                                        id="star-4" 
                                        value="4" 
                                        onChange={(e) => setRating(e.target.value)} 
                                    />
                                    <label htmlFor="star-4"></label>
                                    <input 
                                        type="radio" 
                                        name="rating" 
                                        id="star-5" 
                                        value="5" 
                                        onChange={(e) => setRating(e.target.value)} 
                                    />
                                    <label htmlFor="star-5"></label>
                                </div>
                            </div>

                            <div className="mt-3">
                                <textarea 
                                    className="form-control" 
                                    id="review_field" 
                                    rows="3" 
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Enter your review..."
                                ></textarea>
                            </div>

                            <button 
                                className="btn btn-primary mt-3" 
                                onClick={submitHandler}
                            >
                                Submit Review
                            </button>
                        </div>
                    ) : (
                        <div className="alert alert-danger mt-5">Login to post your review</div>
                    )}
                </div>
            </div>

            {project.reviews && project.reviews.length > 0 && (
                <ListReviews reviews={project.reviews} />
            )}
        </Fragment>
    )
}

export default ProjectDetails