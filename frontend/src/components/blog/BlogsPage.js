import React, { Fragment, useState, useEffect } from 'react';
import Pagination from 'react-js-pagination'
import 'rc-slider/assets/index.css'

import MetaData from '../layout/MetaData';
import Blog from '../blog/Blogs';
import Loader from '../layout/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs} from '../../actions/blogActions';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';

const BlogsPage = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [category, setCategory] = useState('')

    const categories = [
        'Technology',
        'Lifestyle',
        'Health',
        'Education',
        'Travel',
        'Business',
        'Entertainment',
        'Sports',
        'Food',
        'Finance',
        'Politics',
        'Culture'
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    // Fetch state from Redux
    const { loading, blogs, error, blogsCount, resPerPage, filteredBlogsCount } = useSelector(state => state.blogs);

    const { keyword } = useParams();

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getBlogs(keyword, currentPage, category));


    }, [dispatch, alert, error, keyword, currentPage, category])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = blogsCount;
    if (keyword) { 
        count = filteredBlogsCount
    }

    return (
        <Fragment>
            {loading ? <Loader/>  : (
                <Fragment>
                    <MetaData title={'Buy Best Products Online'} />
                        <h1 className="text-center mt-5">Latest Blogs</h1>
                        
                        <section id="products" className="container mt-5">
                            <div className="row">
                                
                            {keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                        <div className="px-5">                                  
                                          
                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    categories
                                                </h4>

                                                <ul className="pl-0">
                                                    {categories.map(category => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyle: 'none'
                                                            }}
                                                            key={category}
                                                            onClick={() => { setCategory(category); setCurrentPage(1); }}
                                                        >
                                                            {category}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            { blogs && blogs.map(blog => (
                                              <Blog key={blog?.id} blog={blog} col={4}/>
                                            ))}
                                        </div>
                                    </div>
                                </Fragment>
                            ): (
                                    blogs && blogs.map(blog => (
                                        <Blog key={blog?.id} blog={blog} col={3} />
                                    )) 
                                )}
              
                            </div>
                        </section>
                        
                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={count}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}                        
                </Fragment>
            )}       
        </Fragment>
    );
};

export default BlogsPage;
