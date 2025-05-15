import React, {Fragment} from 'react'

const ListReviews = ({ reviews }) => {
  return (
    <Fragment>
      <div className="w-75">
          <h3 style={{color:'black', fontSize:'1.8rem'}}>AVIS CLIENTS :</h3>
          <hr />
          {reviews && reviews.map(review => (
              <div key={review._id} className="review-item">
                  <div className="review-header">
                      <p className="review_user">by {review.name}</p>
                      <div className="rating-outer">
                          <div className="rating-inner" style={{ width: `${(review.rating / 5) * 100}%`}}></div>
                      </div>
                  </div>
                  <p className="review_comment">{review.comment}</p>
                  <hr />
              </div>
          ))}
      </div>
    </Fragment>
  )
}

export default ListReviews