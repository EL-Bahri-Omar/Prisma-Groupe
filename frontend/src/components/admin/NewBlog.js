import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import MetaData from "../layout/MetaData"
import Sidebar from "./Sidebar"
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newBlog, clearErrors } from "../../actions/blogActions"
import { NEW_BLOG_RESET } from "../../constants/blogConstants"

const NewBlog = () => {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [slug, setSlug] = useState('');
    const [paragraph, setParagraph] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [readTime, setReadTime] = useState('');
    
    // File states
    const [image, setImage] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [pdf, setPdf] = useState(null);
    
    // Preview states
    const [imagePreview, setImagePreview] = useState('');
    const [photosPreview, setPhotosPreview] = useState([]);
    const [pdfPreview, setpdfPreview] = useState('');

    const categories = [
        'Technology',
        'Programming',
        'Web Development',
        'Mobile Development',
        'Artificial Intelligence',
        'Data Science',
        'Cybersecurity',
        'Blockchain',
        'Cloud Computing',
        'DevOps',
        'UI/UX Design',
        'Business',
        'Startups',
        'Marketing',
        'Finance',
        'Productivity',
        'Health & Fitness',
        'Travel',
        'Food & Cooking',
        'Lifestyle',
        'Personal Development',
        'Education',
        'Entertainment',
        'Gaming',
        'News & Trends'
    ]

    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    
    const { loading, error, success } = useSelector(state => state.newBlog);
    
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            navigate('/admin/blogs');
            alert.success('Blog created successfully');
            dispatch({ type: NEW_BLOG_RESET });
        }
    }, [dispatch, alert, error, success, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        const blogData = {
        title,
        subtitle,
        slug,
        paragraph,
        category,
        tags: tags.split(',').map(tag => tag.trim()).join(','),
        readTime,
        image: imagePreview, // Send base64 string
        photos: photosPreview, // Send array of base64 strings
        pdf: pdf ? pdfPreview : undefined // Send base64 string if exists
    };

        dispatch(newBlog(blogData));
    };

    const onImageChange = (e) => {
        const reader = new FileReader();
        setImage(e.target.files[0]);
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagePreview(reader.result);
                
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }
    const onPhotosChange = (e) => {
        const files = Array.from(e.target.files);

        setPhotos(files);
        setPhotosPreview([]);

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setPhotosPreview(oldArray => [...oldArray, reader.result]);
                    
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const onPdfChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            setPdf(file);
            setpdfPreview(file.name);
        }
    };

    return (
        <Fragment>
            <MetaData title={'New Blog Post'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <div className="wrapper my-5">
                        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                            <h1 className="mb-4">New Blog Post</h1>

                            {/* Title */}
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

                            {/* Subtitle */}
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

                            {/* Slug */}
                            <div className="form-group">
                                <label htmlFor="slug_field">Slug</label>
                                <input
                                    type="text"
                                    id="slug_field"
                                    className="form-control"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                />
                            </div>

                            {/* Content */}
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

                            {/* Category */}
                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>
                                <select
                                    className="form-control"
                                    id="category_field"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Tags */}
                            <div className="form-group">
                                <label htmlFor="tags_field">Tags (comma-separated)</label>
                                <input
                                    type="text"
                                    id="tags_field"
                                    className="form-control"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    placeholder="e.g., react, javascript, webdev"
                                />
                            </div>

                            {/* Read Time */}
                            <div className="form-group">
                                <label htmlFor="readTime_field">Estimated Read Time</label>
                                <input
                                    type="text"
                                    id="readTime_field"
                                    className="form-control"
                                    value={readTime}
                                    onChange={(e) => setReadTime(e.target.value)}
                                    placeholder="e.g., 5 min read"
                                />
                            </div>

                            {/* Featured Image */}
                            <div className="form-group">
                                <label>Featured Image</label>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        name="image"
                                        className="custom-file-input"
                                        id="customFile"
                                        onChange={onImageChange}
                                    />
                                    <label className="custom-file-label" htmlFor="customFile">
                                        {image ? image.name : 'Choose Featured Image'}
                                    </label>
                                </div>
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Featured Preview"
                                        className="mt-3 mr-2"
                                        width="100"
                                    />
                                )}
                            </div>

                            {/* Gallery Photos */}
                            <div className="form-group">
                                <label>Gallery Photos</label>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        name="photos"
                                        className="custom-file-input"
                                        id="customFile"
                                        onChange={onPhotosChange}
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

                            {/* PDF Attachment */}
                            <div className="form-group">
                                <label>PDF Attachment</label>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        name="pdf"
                                        className="custom-file-input"
                                        id="customFile"
                                        onChange={onPdfChange}
                                        accept=".pdf"
                                    />
                                    <label className="custom-file-label" htmlFor="customFile">
                                        {pdfPreview || 'Choose PDF File'}
                                    </label>
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

export default NewBlog;