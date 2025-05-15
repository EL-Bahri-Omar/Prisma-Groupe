import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import Header from "../layout/Header";
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { updateActualite, getActualiteDetails, clearErrors } from '../../actions/actualiteActions';
import { UPDATE_ACTUALITE_RESET } from '../../constants/actualiteConstants';

const UpdateActualite = () => {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [paragraph, setParagraph] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [featuredImage, setFeaturedImage] = useState('');
    const [oldFeaturedImage, setOldFeaturedImage] = useState('');
    const [featuredImagePreview, setFeaturedImagePreview] = useState('');

    const categories = [
        'Company News',
        'Industry Updates',
        'Product Launches',
        'Events',
        'Partnerships',
        'Awards',
        'Team Updates',
        'Community'
    ];

    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const params = useParams();

    const { error, actualite } = useSelector(state => state.actualiteDetails);
    const { loading, error: updateError, isUpdated } = useSelector(state => state.actualite);

    const actualiteId = params.id;

    useEffect(() => {
        if (actualite && actualite._id !== actualiteId) {
            dispatch(getActualiteDetails(actualiteId));
        } else {
            setTitle(actualite.title);
            setSubtitle(actualite.subtitle);
            setParagraph(actualite.paragraph);
            setDate(actualite.date);
            setCategory(actualite.category);
            setOldImages(actualite.photos);
            setOldFeaturedImage(actualite.image);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            navigate('/admin/actualites');
            alert.success('News updated successfully');
            dispatch({ type: UPDATE_ACTUALITE_RESET });
        }
    }, [dispatch, alert, error, isUpdated, navigate, updateError, actualite, actualiteId]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('title', title);
        formData.set('subtitle', subtitle);
        formData.set('paragraph', paragraph);
        formData.set('date', date);
        formData.set('category', category);

        images.forEach(image => {
            formData.append('photos', image);
        });

        if (featuredImage) {
            formData.set('image', featuredImage);
        }

        dispatch(updateActualite(actualite._id, formData));
    };

    const onChangeImages = (e) => {
        const files = Array.from(e.target.files);

        setImagesPreview([]);
        setImages([]);
        setOldImages([]);

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result]);
                    setImages(oldArray => [...oldArray, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    const onChangeFeaturedImage = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setFeaturedImagePreview(reader.result);
                setFeaturedImage(reader.result);
                setOldFeaturedImage('');
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    return (
        <Fragment>
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
            <MetaData title={'Mettre à jour Actualité'} />
            
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
                        <div className="wrapper my-5"> 
                            <form className="shadow-lg p-4" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4 text-center">Mettre à jour Actualité</h1>
                                
                                {/* First Row - Title and Subtitle */}
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="form-group" style={{ width: '48%' }}>
                                        <label htmlFor="title_field">Titre</label>
                                        <input
                                            type="text"
                                            id="title_field"
                                            className="form-control"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group" style={{ width: '48%' }}>
                                        <label htmlFor="subtitle_field">Sous-titre</label>
                                        <input
                                            type="text"
                                            id="subtitle_field"
                                            className="form-control"
                                            value={subtitle}
                                            onChange={(e) => setSubtitle(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Second Row - Date and Category */}
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="form-group" style={{ width: '48%' }}>
                                        <label htmlFor="date_field">Date</label>
                                        <input
                                            type="date"
                                            id="date_field"
                                            className="form-control"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group" style={{ width: '48%' }}>
                                        <label htmlFor="category_field">Catégorie</label>
                                        <select
                                            className="form-control" 
                                            id="category_field" 
                                            value={category} 
                                            onChange={(e) => setCategory(e.target.value)}>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                
                                {/* Description Field */}
                                <div className="form-group mb-3">
                                    <label htmlFor="paragraph_field">Contenue</label>
                                    <textarea
                                        className="form-control" 
                                        id="paragraph_field" 
                                        rows="4" 
                                        value={paragraph} 
                                        onChange={(e) => setParagraph(e.target.value)}>
                                    </textarea>
                                </div>
                                
                                {/* Images Row */}
                                <div className="d-flex justify-content-between mb-4">
                                    <div className="form-group" style={{ width: '48%' }}>
                                        <label>Image Principale</label>
                                        <div className='custom-file'>
                                            <input
                                                type='file'
                                                name='featured_image'
                                                className='custom-file-input'
                                                id='customFile1'
                                                onChange={onChangeFeaturedImage}
                                            />
                                            <label className='custom-file-label' htmlFor='customFile1'>
                                                Choisir Image
                                            </label>
                                        </div>
                                        <div className="d-flex mt-2">
                                            {oldFeaturedImage && (
                                                <img 
                                                    src={oldFeaturedImage.url} 
                                                    alt="Old Featured Preview"
                                                    className="mr-2" 
                                                    width="80" 
                                                    height="80"
                                                />
                                            )}
                                            {featuredImagePreview && (
                                                <img 
                                                    src={featuredImagePreview} 
                                                    alt="Featured Preview"
                                                    className="mr-2" 
                                                    width="80" 
                                                    height="80"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ width: '48%' }}>
                                        <label>Galerie de Photos</label>
                                        <div className='custom-file'>
                                            <input
                                                type='file'
                                                name='actualite_images'
                                                className='custom-file-input'
                                                id='customFile2'
                                                onChange={onChangeImages}
                                                multiple
                                            />
                                            <label className='custom-file-label' htmlFor='customFile2'>
                                                Choisir les Photos
                                            </label>
                                        </div>
                                        <div className="d-flex flex-wrap mt-2">
                                            {oldImages && oldImages.map(img => (
                                                <img 
                                                    key={img.public_id} 
                                                    src={img.url} 
                                                    alt={img.url}
                                                    className="mr-2 mb-2"
                                                    width="80" 
                                                    height="80"
                                                />
                                            ))}
                                            {imagesPreview.map((img, index) => (
                                                <img 
                                                    src={img} 
                                                    key={index} 
                                                    alt="Images Preview"
                                                    className="mr-2 mb-2"
                                                    width="80" 
                                                    height="80"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Submit Button */}
                                <div className="text-center">
                                    <button
                                        id="login_button"
                                        type="submit"
                                        className="btn btn-primary py-3"
                                        style={{ width: '400px' }}
                                        disabled={loading ? true : false}
                                    >
                                        MISE À JOUR
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateActualite;