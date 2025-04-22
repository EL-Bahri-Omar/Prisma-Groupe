import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
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
            <MetaData title={'Update News'} />
            <div className="dashboard-content row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Update News</h1>

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
                                            name="featured_image"
                                            className="custom-file-input"
                                            id="customFile1"
                                            onChange={onChangeFeaturedImage}
                                        />
                                        <label className="custom-file-label" htmlFor="customFile1">
                                            Choose Featured Image
                                        </label>
                                    </div>
                                    {oldFeaturedImage && (
                                        <img src={oldFeaturedImage.url} alt="Featured Preview" className="mt-3 mr-2" width="200" />
                                    )}
                                    {featuredImagePreview && (
                                        <img src={featuredImagePreview} alt="Featured Preview" className="mt-3 mr-2" width="200" />
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Gallery Photos</label>
                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            name="blog_images"
                                            className="custom-file-input"
                                            id="customFile2"
                                            onChange={onChangeImages}
                                            multiple
                                        />
                                        <label className="custom-file-label" htmlFor="customFile2">
                                            Choose Gallery Photos
                                        </label>
                                    </div>
                                    {oldImages && oldImages.map(img => (
                                        <img key={img.public_id} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
                                    ))}
                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                                    ))}
                                </div>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    UPDATE
                                </button>
                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateActualite;