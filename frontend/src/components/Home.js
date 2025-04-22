import React, { Fragment, useState, useEffect } from 'react';
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import MetaData from './layout/MetaData';
import Loader from './layout/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';

const { Range } = Slider;

const Home = () => {

    const [currentPage, setCurrentPage] = useState(1)

    const alert = useAlert();
    const dispatch = useDispatch();

   

    useEffect(() => {


    }, [dispatch, alert, currentPage])

   
    

    return (
        <Fragment>
                <Fragment>
                    <MetaData title={'Buy Best Products Online'} />
                        <h1 id="products_heading">Latest Products</h1>
                        
                                        
                </Fragment>
        </Fragment>
    );
};

export default Home;
