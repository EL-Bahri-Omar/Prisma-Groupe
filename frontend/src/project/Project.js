import React from 'react'
import { Link } from 'react-router-dom'

const Project = ({ project }) => {
    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={project.image.url}
                    alt={project.title}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/project/${project._id}`}>{project.title}</Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div 
                                className="rating-inner" 
                                style={{ width: `${(project.ratings / 5) * 100}%` }}
                            ></div>
                        </div>
                        <span id="no_of_reviews">({project.numOfReviews} Reviews)</span>
                    </div>
                    <p className="card-text">{project.subtitle}</p>
                    <p className="card-text"><b>Location:</b> {project.place}</p>
                    <Link 
                        to={`/project/${project._id}`} 
                        id="view_btn" 
                        className="btn btn-block"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Project