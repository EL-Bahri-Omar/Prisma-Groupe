import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import Header from "../layout/Header";
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { updateTeamMember, getTeamMemberDetails, clearErrors } from '../../actions/teamActions';
import { UPDATE_TEAM_RESET } from '../../constants/teamConstants';

const UpdateTeamMember = () => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [oldImage, setOldImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const params = useParams();

    const { error, member } = useSelector(state => state.teamMemberDetails);
    const { loading, error: updateError, isUpdated } = useSelector(state => state.teamMember);

    const memberId = params.id;

    useEffect(() => {
        if (member && member._id !== memberId) {
            dispatch(getTeamMemberDetails(memberId));
        } else {
            setName(member.name);
            setPosition(member.position);
            setDescription(member.description);
            setOldImage(member.image.url);
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
            navigate('/admin/team');
            alert.success('Membre mis à jour avec succès');
            dispatch({ type: UPDATE_TEAM_RESET });
        }
    }, [dispatch, alert, error, isUpdated, navigate, updateError, member, memberId]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('position', position);
        formData.set('description', description);

        if (image) {
            formData.set('image', image);
        }

        dispatch(updateTeamMember(member._id, formData));
    };

    const onChangeImage = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagePreview(reader.result);
                setImage(reader.result);
                setOldImage('');
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    return (
        <Fragment>
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
            <MetaData title={'Mettre à jour le Membre de Team'} />
            
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
                                <h1 className="mb-4 text-center">Mettre à jour le Membre de Team</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Nom</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="position_field">Position</label>
                                    <input
                                        type="text"
                                        id="position_field"
                                        className="form-control"
                                        value={position}
                                        onChange={(e) => setPosition(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description_field"
                                        rows="8"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label>Photo de Profil</label>
                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            name="image"
                                            className="custom-file-input"
                                            id="customFile"
                                            onChange={onChangeImage}
                                        />
                                        <label className="custom-file-label" htmlFor="customFile">
                                            Choisir Photo
                                        </label>
                                    </div>
                                    <div className="d-flex mt-2">
                                        {oldImage && (
                                            <img 
                                                src={oldImage} 
                                                alt="Old Profile Preview" 
                                                className="mr-2"
                                                width="80" 
                                                height="80"
                                            />
                                        )}
                                        {imagePreview && (
                                            <img 
                                                src={imagePreview} 
                                                alt="Profile Preview" 
                                                className="mr-2"
                                                width="80" 
                                                height="80"
                                            />
                                        )}
                                    </div>
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

export default UpdateTeamMember;