import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import Header from "../layout/Header";
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlog, getBlogDetails, clearErrors } from "../../actions/blogActions";
import { UPDATE_BLOG_RESET } from "../../constants/blogConstants";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const UpdateBlog = () => {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [slug, setSlug] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [readTime, setReadTime] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    const [featuredImagePreview, setFeaturedImagePreview] = useState('');
    const [oldFeaturedImage, setOldFeaturedImage] = useState('');
    
    // Content blocks state
    const [contentBlocks, setContentBlocks] = useState([]);
    const [currentBlockType, setCurrentBlockType] = useState('paragraph');
    const [currentBlockContent, setCurrentBlockContent] = useState('');
    const [currentBlockPhotos, setCurrentBlockPhotos] = useState([]);
    const [currentBlockPhotosPreview, setCurrentBlockPhotosPreview] = useState([]);
    const [editingBlockIndex, setEditingBlockIndex] = useState(null);
    const [editingBlockContent, setEditingBlockContent] = useState('');
    const [editingBlockPhotos, setEditingBlockPhotos] = useState([]);
    const [editingBlockPhotosPreview, setEditingBlockPhotosPreview] = useState([]);

    const categories = [
        'Technology', 'Programming', 'Web Development', 'Mobile Development',
        'Artificial Intelligence', 'Data Science', 'Cybersecurity', 'Blockchain',
        'Cloud Computing', 'DevOps', 'UI/UX Design', 'Business', 'Startups',
        'Marketing', 'Finance', 'Productivity', 'Health & Fitness', 'Travel',
        'Food & Cooking', 'Lifestyle', 'Personal Development', 'Education',
        'Entertainment', 'Gaming', 'News & Trends'
    ];

    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const params = useParams();

    const { error, blog } = useSelector(state => state.blogDetails);
    const { loading, error: updateError, isUpdated } = useSelector(state => state.blog);

    const blogId = params.id;

    useEffect(() => {
        if (blog && blog._id !== blogId) {
            dispatch(getBlogDetails(blogId));
        } else if (blog) {
            setTitle(blog.title);
            setSubtitle(blog.subtitle);
            setSlug(blog.slug);
            setCategory(blog.category);
            setTags(blog.tags.join(', '));
            setReadTime(blog.readTime);
            setOldFeaturedImage(blog.image);
            
            if (blog.contentBlocks) {
                const blocks = typeof blog.contentBlocks === 'string' 
                    ? JSON.parse(blog.contentBlocks)
                    : blog.contentBlocks;
                setContentBlocks(blocks);
            }
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
            navigate('/admin/blogs');
            alert.success('Blog mis à jour avec succès');
            dispatch({ type: UPDATE_BLOG_RESET });
        }
    }, [dispatch, alert, error, isUpdated, navigate, updateError, blog, blogId]);

    // Handle photos change for content block
    const onBlockPhotosChange = (e) => {
        const files = Array.from(e.target.files);
        const newPhotos = [];
        const newPhotosPreview = [];

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    newPhotosPreview.push(reader.result);
                    if (newPhotosPreview.length === files.length) {
                        setCurrentBlockPhotosPreview([...currentBlockPhotosPreview, ...newPhotosPreview]);
                    }
                }
            };
            reader.readAsDataURL(file);
            newPhotos.push(file);
        });

        setCurrentBlockPhotos([...currentBlockPhotos, ...newPhotos]);
    };

    // Handle photos change for editing content block
    const onEditBlockPhotosChange = (e) => {
        const files = Array.from(e.target.files);
        const newPhotos = [];
        const newPhotosPreview = [];

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    newPhotosPreview.push(reader.result);
                    if (newPhotosPreview.length === files.length) {
                        setEditingBlockPhotosPreview([...editingBlockPhotosPreview, ...newPhotosPreview]);
                    }
                }
            };
            reader.readAsDataURL(file);
            newPhotos.push(file);
        });

        setEditingBlockPhotos([...editingBlockPhotos, ...newPhotos]);
    };

    // Remove photo from current block
    const removeCurrentBlockPhoto = (index) => {
        const updatedPhotos = [...currentBlockPhotos];
        const updatedPreviews = [...currentBlockPhotosPreview];
        
        updatedPhotos.splice(index, 1);
        updatedPreviews.splice(index, 1);
        
        setCurrentBlockPhotos(updatedPhotos);
        setCurrentBlockPhotosPreview(updatedPreviews);
    };

    // Remove photo from editing block
    const removeEditingBlockPhoto = (index) => {
        const updatedPhotos = [...editingBlockPhotos];
        const updatedPreviews = [...editingBlockPhotosPreview];
        
        updatedPhotos.splice(index, 1);
        updatedPreviews.splice(index, 1);
        
        setEditingBlockPhotos(updatedPhotos);
        setEditingBlockPhotosPreview(updatedPreviews);
    };

    const addContentBlock = () => {
        if ((!currentBlockContent.trim() && currentBlockType !== 'gallery') && currentBlockPhotos.length === 0) return;
        
        const newBlock = {
            type: currentBlockType,
            content: currentBlockType === 'gallery' ? '' : currentBlockContent,
            photos: currentBlockType === 'gallery' ? currentBlockPhotosPreview : [],
            order: contentBlocks.length
        };
        
        setContentBlocks([...contentBlocks, newBlock]);
        setCurrentBlockContent('');
        setCurrentBlockPhotos([]);
        setCurrentBlockPhotosPreview([]);
    };

    const removeContentBlock = (index) => {
        const updatedBlocks = contentBlocks.filter((_, i) => i !== index);
        setContentBlocks(updatedBlocks);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        
        const items = Array.from(contentBlocks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        
        const updatedBlocks = items.map((block, index) => ({
            ...block,
            order: index
        }));
        
        setContentBlocks(updatedBlocks);
    };

    const startEditingBlock = (index) => {
        const block = contentBlocks[index];
        setEditingBlockIndex(index);
        setEditingBlockContent(block.content || '');
        setEditingBlockPhotos(block.photos || []);
        setEditingBlockPhotosPreview(block.photos || []);
    };

    const saveEditedBlock = () => {
        if (editingBlockIndex === null) return;
        
        const updatedBlocks = [...contentBlocks];
        updatedBlocks[editingBlockIndex] = {
            ...updatedBlocks[editingBlockIndex],
            content: updatedBlocks[editingBlockIndex].type === 'gallery' ? '' : editingBlockContent,
            photos: updatedBlocks[editingBlockIndex].type === 'gallery' ? editingBlockPhotosPreview : []
        };
        
        setContentBlocks(updatedBlocks);
        setEditingBlockIndex(null);
        setEditingBlockContent('');
        setEditingBlockPhotos([]);
        setEditingBlockPhotosPreview([]);
    };

    const cancelEditing = () => {
        setEditingBlockIndex(null);
        setEditingBlockContent('');
        setEditingBlockPhotos([]);
        setEditingBlockPhotosPreview([]);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('title', title);
        formData.set('subtitle', subtitle);
        formData.set('slug', slug);
        formData.set('category', category);
        formData.set('tags', tags.split(',').map(tag => tag.trim()));
        formData.set('readTime', readTime);
        formData.set('contentBlocks', JSON.stringify(contentBlocks));

        if (featuredImage) {
            formData.set('image', featuredImage);
        }

        dispatch(updateBlog(blog._id, formData));
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

    const renderContentBlocks = () => (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="contentBlocks">
                {(provided) => (
                    <div 
                        {...provided.droppableProps} 
                        ref={provided.innerRef}
                        className="content-blocks-container"
                    >
                        {contentBlocks.map((block, index) => (
                            <Draggable 
                                key={`block-${index}`} 
                                draggableId={`block-${index}`} 
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        className={`content-block mb-3 p-3 border rounded ${editingBlockIndex === index ? 'editing' : ''}`}
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <span className="badge badge-primary mr-2">
                                                    {block.type}
                                                </span>
                                                <span 
                                                    {...provided.dragHandleProps}
                                                    className="drag-handle"
                                                >
                                                    ☰
                                                </span>
                                            </div>
                                            <div>
                                                <button 
                                                    type="button"
                                                    className="btn btn-sm btn-info mr-2"
                                                    onClick={() => startEditingBlock(index)}
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    type="button"
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => removeContentBlock(index)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {editingBlockIndex === index ? (
                                            <div className="mt-2">
                                                {block.type === 'gallery' ? (
                                                    <div>
                                                        <div className="form-group">
                                                            <label>Gallery Images</label>
                                                            <input
                                                                type="file"
                                                                className="form-control-file"
                                                                onChange={onEditBlockPhotosChange}
                                                                multiple
                                                            />
                                                        </div>
                                                        <div className="d-flex flex-wrap mt-2">
                                                            {editingBlockPhotosPreview.map((photo, idx) => (
                                                                <div key={idx} className="position-relative mr-2 mb-2">
                                                                    <img 
                                                                        src={photo.url || photo} 
                                                                        alt="Preview" 
                                                                        className="img-thumbnail"
                                                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-danger position-absolute"
                                                                        style={{ top: '5px', right: '5px' }}
                                                                        onClick={() => removeEditingBlockPhoto(idx)}
                                                                    >
                                                                        ×
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <textarea
                                                        className="form-control mb-2"
                                                        value={editingBlockContent}
                                                        onChange={(e) => setEditingBlockContent(e.target.value)}
                                                        rows={3}
                                                    />
                                                )}
                                                <div className="d-flex">
                                                    <button 
                                                        className="btn btn-success btn-sm mr-2"
                                                        onClick={saveEditedBlock}
                                                    >
                                                        Save
                                                    </button>
                                                    <button 
                                                        className="btn btn-secondary btn-sm"
                                                        onClick={cancelEditing}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="mt-2">
                                                {block.type === 'paragraph' ? (
                                                    <p>{block.content}</p>
                                                ) : block.type === 'gallery' ? (
                                                    <div className="d-flex flex-wrap">
                                                        {block.photos.map((photo, idx) => (
                                                            <img 
                                                                key={idx}
                                                                src={photo.url || photo} 
                                                                alt="Gallery" 
                                                                className="img-thumbnail mr-2 mb-2"
                                                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                            />
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <h5>{block.content}</h5>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );

    return (
        <Fragment>
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
            <MetaData title={'Mettre à jour Blog'} />
            
            <div className="dashboard-content">
                <div className="header-container">
                    <Header />
                </div>
                
                <div className="main-content-container">
                    <div className="sidebar-column">
                        <Sidebar />
                    </div>
                    
                    <div className="scrollable-content">
                        <div className="wrapper my-5"> 
                            <form className="shadow-lg p-4" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-5 text-center">Mettre à jour Blog</h1>
                                
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="form-group" style={{ width: '48%' }}>
                                        <label htmlFor="title_field">Titre</label>
                                        <input
                                            type="text"
                                            id="title_field"
                                            className="form-control"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
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
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between mb-3">
                                    <div className="form-group" style={{ width: '48%' }}>
                                        <label htmlFor="slug_field">Slug</label>
                                        <input
                                            type="text"
                                            id="slug_field"
                                            className="form-control"
                                            value={slug}
                                            onChange={(e) => setSlug(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group" style={{ width: '48%' }}>
                                        <label htmlFor="category_field">Catégorie</label>
                                        <select
                                            className="form-control" 
                                            id="category_field" 
                                            value={category} 
                                            onChange={(e) => setCategory(e.target.value)}
                                            required>
                                            <option value="">Selectionner une Catégorie</option>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between mb-3">
                                    <div className="form-group" style={{ width: '48%' }}>
                                        <label htmlFor="tags_field">Tags (séparés avec virgules)</label>
                                        <input
                                            type="text"
                                            id="tags_field"
                                            className="form-control"
                                            value={tags}
                                            onChange={(e) => setTags(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group" style={{ width: '48%' }}>
                                        <label htmlFor="readTime_field">Temps de Lecture</label>
                                        <input
                                            type="text"
                                            id="readTime_field"
                                            className="form-control"
                                            value={readTime}
                                            onChange={(e) => setReadTime(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="form-group mb-3">
                                    <label>Image Principale</label>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='image'
                                            className='custom-file-input'
                                            id='customFile1'
                                            onChange={onChangeFeaturedImage}
                                            required
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
                                
                                <div className="form-group mb-3">
                                    <label>Contenu Dynamique</label>
                                    
                                    <div className="mb-3">
                                        <select 
                                            className="form-control mb-2"
                                            value={currentBlockType}
                                            onChange={(e) => setCurrentBlockType(e.target.value)}
                                            required
                                        >
                                            <option value="paragraph">Paragraphe</option>
                                            <option value="title">Titre</option>
                                            <option value="subtitle">Sous-titre</option>
                                            <option value="headline">Titre de section</option>
                                            <option value="gallery">Galerie</option>
                                        </select>
                                        
                                        {currentBlockType === 'gallery' ? (
                                            <div>
                                                <div className="form-group">
                                                    <label>Images</label>
                                                    <input
                                                        type="file"
                                                        className="form-control-file"
                                                        onChange={onBlockPhotosChange}
                                                        multiple
                                                    />
                                                </div>
                                                <div className="d-flex flex-wrap mt-2">
                                                    {currentBlockPhotosPreview.map((photo, idx) => (
                                                        <div key={idx} className="position-relative mr-2 mb-2">
                                                            <img 
                                                                src={photo} 
                                                                alt="Preview" 
                                                                className="img-thumbnail"
                                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                            />
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-danger position-absolute"
                                                                style={{ top: '5px', right: '5px' }}
                                                                onClick={() => removeCurrentBlockPhoto(idx)}
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <textarea
                                                className="form-control mb-2"
                                                rows="3"
                                                value={currentBlockContent}
                                                onChange={(e) => setCurrentBlockContent(e.target.value)}
                                                placeholder={`Entrez le contenu ${currentBlockType}`}
                                            />
                                        )}
                                        
                                        <button 
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={addContentBlock}
                                        >
                                            + Ajouter ce bloc
                                        </button>
                                    </div>
                                    
                                    {renderContentBlocks()}
                                </div>
                                
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

export default UpdateBlog;