import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
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
            <MetaData title={'New News'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <div className="wrapper my-5">
                        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                            <h1 className="mb-4">New News</h1>

                            <div className="form-group">
                                <label htmlFor="title_field">Title</label>
                                <input
                                    type="text"
                                    id="title_field"
                                    className="form-control"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subtitle_field">Subtitle</label>
                                <input
                                    type="text"
                                    id="subtitle_field"
                                    className="form-control"
                                    value={subtitle}
                                    onChange={(e) => setSubtitle(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="paragraph_field">Content</label>
                                <textarea
                                    className="form-control"
                                    id="paragraph_field"
                                    rows="8"
                                    value={paragraph}
                                    onChange={(e) => setParagraph(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="date_field">Date</label>
                                <input
                                    type="date"
                                    id="date_field"
                                    className="form-control"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>
                                <select
                                    className="form-control"
                                    id="category_field"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Featured Image</label>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        name="image"
                                        className="custom-file-input"
                                        id="customFile"
                                        onChange={onChangeImage}
                                    />
                                    <label className="custom-file-label" htmlFor="customFile">
                                        Choose Featured Image
                                    </label>
                                </div>
                                {imagePreview && (
                                    <img src={imagePreview} alt="Featured Preview" className="mt-3 mr-2" width="100" />
                                )}
                            </div>

                            <div className="form-group">
                                <label>Gallery Photos</label>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        name="photos"
                                        className="custom-file-input"
                                        id="customFile"
                                        onChange={onChangePhotos}
                                        multiple
                                    />
                                    <label className="custom-file-label" htmlFor="customFile">
                                        Choose Gallery Photos
                                    </label>
                                </div>
                                <div className="mt-3">
                                    {photosPreview.map((img, index) => (
                                        <img
                                            src={img}
                                            key={index}
                                            alt="Photos Preview"
                                            className="mr-2"
                                            width="100"
                                            height="100"
                                        />
                                    ))}
                                </div>
                            </div>

                            <button
                                id="submit_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled={loading ? true : false}
                            >
                                {loading ? 'Creating...' : 'CREATE'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default NewActualite;