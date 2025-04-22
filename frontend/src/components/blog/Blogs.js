import React from 'react';
import { Link } from 'react-router-dom';

const Blogs = ({ blog, col }) => {
  return (
    <div key={blog?._id} className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-3 rounded">
        {/* Display Featured Image if available */}
        {blog?.featuredImage?.url && (
          <img className="card-img-top mx-auto" src={blog.featuredImage.url} alt={blog.title} />
        )}

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
          </h5>

          {/* Display Category & Author */}
          <p className="text-muted">
            <strong>Category:</strong> {blog.category} | <strong>By:</strong> {blog?.author?.name}
          </p>

          {/* Display Blog Content based on availability */}
          <div className="blog-content">
            {blog.pdf?.url ? (
              <a href={blog.pdf.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Download PDF
              </a>
            ) : blog.images?.length > 0 ? (
              <div className="blog-images">
                {blog.images.map((image, index) => (
                  <img key={index} src={image.url} alt={image.public_id} className="img-fluid my-2" />
                ))}
              </div>
            ) : (
              <p>{blog.content.substring(0, 150)}...</p> // Show a short preview of text
            )}
          </div>

          {/* Tags */}
          {blog.tags?.length > 0 && (
            <p className="mt-2">
              <strong>Tags:</strong> {blog.tags.join(', ')}
            </p>
          )}

          {/* Read More Button */}
          <Link to={`/blog/${blog._id}`} className="btn btn-block btn-dark">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
