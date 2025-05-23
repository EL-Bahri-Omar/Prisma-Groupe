import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import MetaData from "../layout/MetaData"
import Sidebar from "./Sidebar"
import Header from "../layout/Header";
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
    const [video, setVideo] = useState('')
    const [image, setImage] = useState('')
    const [photos, setPhotos] = useState([])
    const [oldImage, setOldImage] = useState('')
    const [oldPhotos, setOldPhotos] = useState([])
    const [imagePreview, setImagePreview] = useState('')
    const [photosPreview, setPhotosPreview] = useState([])

    const categories = [
        "Education",
        "Web",
        "Finance",
        "Commerce",
        "Tourism",
        "Hotels",
        "IT",
        "Immobilier",
        "Culture",
        "Organizations",
        "Events",
        "Restauration",
        "Magazine",
        "Automobile",
        "BTP",
        "Assurance"
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
            setVideo(project.video?.url)
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
            alert.success('Projet mis à jour avec succès')
            dispatch({ type: UPDATE_PROJECT_RESET})
        }
    }, [dispatch, alert, error, isUpdated, navigate, updateError, project, projectId])

    const submitHandler = (e) => {
        e.preventDefault()
    
        const formattedDate = new Date(date).toISOString();

        const formData = new FormData()
        formData.set('title', title)
        formData.set('subtitle', subtitle)
        formData.set('description', description)
        formData.set('date', formattedDate)
        formData.set('category', category)
        formData.set('place', place)
        
        if (image) {
            formData.set('image', image)
        }
        
        photos.forEach(photo => {
            formData.append('photos', photo)
        })

        if (video) {
            formData.set('video', video)
        } 
    
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
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
            <MetaData title={'Update Project'}/>
            
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
                                <h1 className="mb-4 text-center">Mettre À Jour Projet</h1>
                                
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

                                {/* Second Row - Date, Category, Location */}
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="form-group" style={{ width: '30%' }}>
                                        <label htmlFor="date_field">Date</label>
                                        <input
                                            type="date"
                                            id="date_field"
                                            className="form-control"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group" style={{ width: '30%' }}>
                                        <label htmlFor="category_field">Catégorie</label>
                                        <select 
                                            className="form-control" 
                                            id="category_field" 
                                            value={category} 
                                            onChange={(e) => setCategory(e.target.value)}
                                            required>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}                                  
                                        </select>
                                    </div>
                                    <div className="form-group" style={{ width: '30%' }}>
                                        <label htmlFor="place_field">Lieu</label>
                                        <input
                                            type="text"
                                            id="place_field"
                                            className="form-control"
                                            value={place}
                                            onChange={(e) => setPlace(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                {/* Description Field (full width) */}
                                <div className="form-group mb-3">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea 
                                        className="form-control" 
                                        id="description_field" 
                                        rows="4" 
                                        value={description} 
                                        onChange={(e) => setDescription(e.target.value)}
                                        required>
                                    </textarea>
                                </div>
                                
                                {/* Third Row - Images */}
                                <div className="d-flex justify-content-between">
                                    <div className="form-group" style={{ width: '48%' }}>
                                        <label>Image Principale</label>
                                        <div className='custom-file'>
                                            <input
                                                type='file'
                                                name='image'
                                                className='custom-file-input'
                                                id='customFile'
                                                onChange={onImageChange}
                                                required
                                            />
                                            <label className='custom-file-label' htmlFor='customFile'>
                                                Choisir Image
                                            </label>
                                        </div>
                                        <div className="d-flex mt-2">
                                            {oldImage && (
                                                <img 
                                                    src={oldImage} 
                                                    alt="Old Featured Preview"
                                                    className="mr-2" 
                                                    width="80" 
                                                    height="80"
                                                />
                                            )}
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
                                        <label>Galerie des Photos</label>
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
                                                Chosir des Photos
                                            </label>
                                        </div>
                                        <div className="d-flex flex-wrap mt-2">
                                            {oldPhotos && oldPhotos.map((photo, index) => (
                                                <img 
                                                    src={photo.url} 
                                                    key={index} 
                                                    alt="Old Photos Preview"
                                                    className="mr-2"
                                                    width="80" 
                                                    height="80"
                                                />
                                            ))}
                                            {photosPreview.map((photo, index) => (
                                                <img 
                                                    src={photo} 
                                                    key={index} 
                                                    alt="Photos Preview"
                                                    className="mr-2"
                                                    width="80" 
                                                    height="80"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group mb-4">
                                    <label htmlFor="video_field">Lien du Video (Depuis Cloudinary)</label>
                                    <input
                                        type="text"
                                        id="video_field"
                                        className="form-control"
                                        value={video}
                                        onChange={(e) => setVideo(e.target.value)}
                                        placeholder="Paste Cloudinary video URL here"
                                    />
                                </div>
                                
                                {/* Submit Button - Centered */}
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
    )
}

export default UpdateProject