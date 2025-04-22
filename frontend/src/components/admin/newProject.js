import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import MetaData from "../layout/MetaData"
import Sidebar from "./Sidebar"
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newProject, clearErrors } from "../../actions/projectActions"
import { NEW_PROJECT_RESET } from "../../constants/projectConstants"

const NewProject = () => {
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [category, setCategory] = useState('')
    const [place, setPlace] = useState('')
    const [image, setImage] = useState('')
    const [photos, setPhotos] = useState([])
    const [imagePreview, setImagePreview] = useState('')
    const [photosPreview, setPhotosPreview] = useState([])

    const categories = [
        'Architecture',
        'Interior Design',
        'Construction',
        'Renovation',
        'Landscaping',
        'Commercial',
        'Residential',
        'Hospitality',
        'Urban Planning'
    ]

    const navigate = useNavigate()
    const alert = useAlert()
    const dispatch = useDispatch()
    
    const { loading, error, success } = useSelector(state => state.newProject)
    
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (success) {
            navigate('/admin/projects')
            alert.success('Project created successfully')
            dispatch({ type: NEW_PROJECT_RESET})
        }
    }, [dispatch, alert, error, success, navigate])

    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('title', title)
        formData.set('subtitle', subtitle)
        formData.set('description', description)
        formData.set('date', date)
        formData.set('category', category)
        formData.set('place', place)
        formData.set('image', image)
        
        photos.forEach(photo => {
            formData.append('photos', photo)
        })

        dispatch(newProject(formData))
    }

    const onImageChange = (e) => {   
        const reader = new FileReader()

        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagePreview(reader.result)
                setImage(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }

    const onPhotosChange = (e) => {   
        const files = Array.from(e.target.files)

        setPhotosPreview([])
        setPhotos([])

        files.forEach(file => {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setPhotosPreview(oldArray => [...oldArray, reader.result])
                    setPhotos(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }

    return (
        <Fragment>
            <MetaData title={'New Project'}/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5"> 
                        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                            <h1 className="mb-4">New Project</h1>

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
                                <label htmlFor="description_field">Description</label>
                                <textarea 
                                    className="form-control" 
                                    id="description_field" 
                                    rows="8" 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)}>
                                </textarea>
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
                                    onChange={(e) => setCategory(e.target.value)}>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}                                  
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="place_field">Location</label>
                                <input
                                    type="text"
                                    id="place_field"
                                    className="form-control"
                                    value={place}
                                    onChange={(e) => setPlace(e.target.value)}
                                />
                            </div>
                            
                            <div className='form-group'>
                                <label>Featured Image</label>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='image'
                                        className='custom-file-input'
                                        id='customFile'
                                        onChange={onImageChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Featured Image
                                    </label>
                                </div>

                                {imagePreview && (
                                    <img 
                                        src={imagePreview} 
                                        alt="Featured Preview"
                                        className="mt-3 mr-2" 
                                        width="200" 
                                        height="200"
                                    />
                                )}
                            </div>

                            <div className='form-group mt-4'>
                                <label>Gallery Photos</label>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='photos'
                                        className='custom-file-input'
                                        id='customFile'
                                        onChange={onPhotosChange}
                                        multiple
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Gallery Photos
                                    </label>
                                </div>

                                <div className="mt-3">
                                    {photosPreview.map((photo, index) => (
                                        <img 
                                            src={photo} 
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
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled={loading ? true : false}
                            >
                                CREATE
                            </button>
                        </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default NewProject