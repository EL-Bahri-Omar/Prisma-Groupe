import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import MetaData from "../layout/MetaData"
import Sidebar from "./Sidebar"
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateProject, getProjectDetails, clearErrors } from "../../actions/projectActions"
import { UPDATE_PROJECT_RESET } from "../../constants/projectConstants"

const UpdateProject = () => {
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [category, setCategory] = useState('')
    const [place, setPlace] = useState('')
    const [image, setImage] = useState('')
    const [photos, setPhotos] = useState([])
    const [oldImage, setOldImage] = useState('')
    const [oldPhotos, setOldPhotos] = useState([])
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
        
    const { error, project } = useSelector(state => state.projectDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.project)

    const { projectId } = useParams()

    useEffect(() => {
        if (project && project._id !== projectId) {
            dispatch(getProjectDetails(projectId))
        } else {
            setTitle(project.title)
            setSubtitle(project.subtitle)
            setDescription(project.description)
            setDate(project.date)
            setCategory(project.category)
            setPlace(project.place)
            setOldImage(project.image?.url)
            setOldPhotos(project.photos)
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
            navigate('/admin/projects')
            alert.success('Project updated successfully')
            dispatch({ type: UPDATE_PROJECT_RESET})
        }
    }, [dispatch, alert, error, isUpdated, navigate, updateError, project, projectId])

    const submitHandler = (e) => {
        e.preventDefault()
    
        const formData = new FormData()
        formData.set('title', title)
        formData.set('subtitle', subtitle)
        formData.set('description', description)
        formData.set('date', date)
        formData.set('category', category)
        formData.set('place', place)
        
        if (image) {
            formData.set('image', image)
        }
        
        photos.forEach(photo => {
            formData.append('photos', photo)
        })
    
        dispatch(updateProject(project._id, formData))
    }

    const onImageChange = (e) => {   
        const reader = new FileReader()

        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagePreview(reader.result)
                setImage(reader.result)
                setOldImage('')
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }

    const onPhotosChange = (e) => {   
        const files = Array.from(e.target.files)

        setPhotosPreview([])
        setPhotos([])
        setOldPhotos([])

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
            <MetaData title={'Update Project'}/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
        
                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5"> 
                        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                            <h1 className="mb-4">Update Project</h1>
        
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

                                {oldImage && (
                                    <img 
                                        src={oldImage} 
                                        alt="Old Featured Preview"
                                        className="mt-3 mr-2" 
                                        width="200" 
                                        height="200"
                                    />
                                )}

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
                                    {oldPhotos && oldPhotos.map((photo, index) => (
                                        <img 
                                            src={photo.url} 
                                            key={index} 
                                            alt="Old Photos Preview"
                                            className="mr-2"
                                            width="100" 
                                            height="100"
                                        />
                                    ))}

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

export default UpdateProject