import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import Header from "../layout/Header";
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { newActualite, clearErrors } from '../../actions/actualiteActions';
import { NEW_ACTUALITE_RESET } from '../../constants/actualiteConstants';

const NewActualite = () => {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [paragraph, setParagraph] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [photos, setPhotos] = useState([]);
    const [photosPreview, setPhotosPreview] = useState([]);

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

    const { loading, error, success } = useSelector(state => state.newActualite);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            navigate('/admin/actualites');
            alert.success('News created successfully');
            dispatch({ type: NEW_ACTUALITE_RESET });
        }
    }, [dispatch, alert, error, success, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('title', title);
        formData.set('subtitle', subtitle);
        formData.set('paragraph', paragraph);
        formData.set('date', date);
        formData.set('category', category);
        formData.set('image', image);

        photos.forEach(photo => {
            formData.append('photos', photo);
        });

        dispatch(newActualite(formData));
    };

    const onChangeImage = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagePreview(reader.result);
                setImage(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    const onChangePhotos = (e) => {
        const files = Array.from(e.target.files);

        setPhotos([]);
        setPhotosPreview([]);

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setPhotosPreview(oldArray => [...oldArray, reader.result]);
                    setPhotos(oldArray => [...oldArray, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
            <MetaData title={'Nouvel Actualité'} />
            
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
                                <h1 className="mb-4 text-center">Nouvel Actualité</h1>
                                
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
                                            <option value="">Sélectionner une Catégorie</option>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                
                                {/* Content Field */}
                                <div className="form-group mb-3">
                                    <label htmlFor="paragraph_field">Content</label>
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
                                                name='image'
                                                className='custom-file-input'
                                                id='customFile1'
                                                onChange={onChangeImage}
                                            />
                                            <label className='custom-file-label' htmlFor='customFile1'>
                                                Choisir Image
                                            </label>
                                        </div>
                                        <div className="d-flex mt-2">
                                            {imagePreview && (
                                                <img 
                                                    src={imagePreview} 
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
                                                name='photos'
                                                className='custom-file-input'
                                                id='customFile2'
                                                onChange={onChangePhotos}
                                                multiple
                                            />
                                            <label className='custom-file-label' htmlFor='customFile2'>
                                                Choisir les Photos
                                            </label>
                                        </div>
                                        <div className="d-flex flex-wrap mt-2">
                                            {photosPreview.map((img, index) => (
                                                <img 
                                                    src={img} 
                                                    key={index} 
                                                    alt="Photos Preview"
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
                                        id="submit_button"
                                        type="submit"
                                        className="btn btn-primary py-3"
                                        style={{ width: '400px' }}
                                        disabled={loading ? true : false}
                                    >
                                        {loading ? 'Création...' : 'CRÉER'}
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

export default NewActualite;