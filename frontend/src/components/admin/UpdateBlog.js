import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import MetaData from "../layout/MetaData"
import Sidebar from "./Sidebar"
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, getBlogDetails, clearErrors } from "../../actions/blogActions"
import { UPDATE_BLOG_RESET } from "../../constants/blogConstants"

const UpdateBlog = () => {
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [slug, setSlug] = useState('')
    const [paragraph, setParagraph] = useState('')
    const [category, setCategory] = useState('')
    const [tags, setTags] = useState('')
    const [readTime, setReadTime] = useState('')
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])
    const [oldImages, setOldImages] = useState([])
    const [featuredImage, setFeaturedImage] = useState('')
    const [featuredImagePreview, setFeaturedImagePreview] = useState('')
    const [oldFeaturedImage, setOldFeaturedImage] = useState('')
    const [pdfFile, setPdfFile] = useState('')
    const [pdfFilePreview, setPdfFilePreview] = useState('')
    const [oldPdfFile, setOldPdfFile] = useState('')

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

    const navigate = useNavigate()
    const alert = useAlert()
    const dispatch = useDispatch()
    const params = useParams()

    const { error, blog } = useSelector(state => state.blogDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.blog)

    const blogId = params.id

    useEffect(() => {
        if (blog && blog._id !== blogId) {
            dispatch(getBlogDetails(blogId))
        } else {
            setTitle(blog.title)
            setSubtitle(blog.subtitle)
            setSlug(blog.slug)
            setParagraph(blog.paragraph)
            setCategory(blog.category)
            setTags(blog.tags.join(', '))
            setReadTime(blog.readTime)
            setOldImages(blog.photos)
            setOldFeaturedImage(blog.image)
            setOldPdfFile(blog.pdf)
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            navigate('/admin/blogs')
            alert.success('Blog updated successfully')
            dispatch({ type: UPDATE_BLOG_RESET })
        }
    }, [dispatch, alert, error, isUpdated, navigate, updateError, blog, blogId])

    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('title', title)
        formData.set('subtitle', subtitle)
        formData.set('slug', slug)
        formData.set('paragraph', paragraph)
        formData.set('category', category)
        formData.set('tags', tags.split(',').map(tag => tag.trim()));
        formData.set('readTime', readTime)

        images.forEach(image => {
            formData.append('images', image)
        })

        if (featuredImage) {
            formData.set('image', featuredImage)
        }

        if (pdfFile) {
            formData.set('pdf', pdfFile)
        }

        dispatch(updateBlog(blog._id, formData))
    }

    const onChangeImages = e => {
        const files = Array.from(e.target.files)

        setImagesPreview([])
        setImages([])
        setOldImages([])

        files.forEach(file => {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }

    const onChangeFeaturedImage = e => {
        const reader = new FileReader()

        reader.onload = () => {
            if (reader.readyState === 2) {
                setFeaturedImagePreview(reader.result)
                setFeaturedImage(reader.result)
                setOldFeaturedImage('')
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }

    const onChangePdf = e => {
        const reader = new FileReader()

        reader.onload = () => {
            if (reader.readyState === 2) {
                setPdfFilePreview(reader.result)
                setPdfFile(reader.result)
                setOldPdfFile('')
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }

    return (
        <Fragment>
            <MetaData title={'Update Blog'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Update Blog Post</h1>

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
                                    <label htmlFor="slug_field">Slug</label>
                                    <input
                                        type="text"
                                        id="slug_field"
                                        className="form-control"
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
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
                                    <label htmlFor="category_field">Category</label>
                                    <select
                                        className="form-control"
                                        id="category_field"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="tags_field">Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        id="tags_field"
                                        className="form-control"
                                        value={tags}
                                        onChange={(e) => setTags(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="readTime_field">Estimated Read Time</label>
                                    <input
                                        type="text"
                                        id="readTime_field"
                                        className="form-control"
                                        value={readTime}
                                        onChange={(e) => setReadTime(e.target.value)}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>Featured Image</label>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='featured_image'
                                            className='custom-file-input'
                                            id='customFile1'
                                            onChange={onChangeFeaturedImage}
                                        />
                                        <label className='custom-file-label' htmlFor='customFile1'>
                                            Choose Featured Image
                                        </label>
                                    </div>
                                    {oldFeaturedImage && (
                                        <img src={oldFeaturedImage.url} alt="Featured Preview"
                                            className="mt-3 mr-2" width="200" />
                                    )}
                                    {featuredImagePreview && (
                                        <img src={featuredImagePreview} alt="Featured Preview"
                                            className="mt-3 mr-2" width="200" />
                                    )}
                                </div>

                                <div className='form-group'>
                                    <label>Blog Images</label>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='blog_images'
                                            className='custom-file-input'
                                            id='customFile2'
                                            onChange={onChangeImages}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile2'>
                                            Choose Blog Images
                                        </label>
                                    </div>
                                    {oldImages && oldImages.map(img => (
                                        <img key={img.public_id} src={img.url} alt={img.url}
                                            className="mt-3 mr-2" width="55" height="52" />
                                    ))}
                                    {imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview"
                                            className="mt-3 mr-2" width="55" height="52" />
                                    ))}
                                </div>

                                <div className='form-group'>
                                    <label>PDF Attachment (Optional)</label>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='pdf_file'
                                            className='custom-file-input'
                                            id='customFile3'
                                            onChange={onChangePdf}
                                            accept=".pdf"
                                        />
                                        <label className='custom-file-label' htmlFor='customFile3'>
                                            Choose PDF File
                                        </label>
                                    </div>
                                    {oldPdfFile && (
                                        <div className="mt-3">
                                            <span>Current PDF: {oldPdfFile.url}</span>
                                        </div>
                                    )}
                                    {pdfFilePreview && (
                                        <div className="mt-3">
                                            <span>New PDF selected</span>
                                        </div>
                                    )}
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
    )
}

export default UpdateBlog