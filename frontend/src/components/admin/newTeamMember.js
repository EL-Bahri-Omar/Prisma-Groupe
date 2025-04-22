import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { newTeamMember, clearErrors } from '../../actions/teamActions';
import { NEW_TEAM_RESET } from '../../constants/teamConstants';

const NewTeamMember = () => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.newTeamMember);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            navigate('/admin/team');
            alert.success('Team member created successfully');
            dispatch({ type: NEW_TEAM_RESET });
        }
    }, [dispatch, alert, error, success, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('position', position);
        formData.set('description', description);
        formData.set('image', image);

        dispatch(newTeamMember(formData));
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

    return (
        <Fragment>
            <MetaData title={'New Team Member'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <div className="wrapper my-5">
                        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                            <h1 className="mb-4">New Team Member</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label>Profile Image</label>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        name="image"
                                        className="custom-file-input"
                                        id="customFile"
                                        onChange={onChangeImage}
                                    />
                                    <label className="custom-file-label" htmlFor="customFile">
                                        Choose Profile Image
                                    </label>
                                </div>
                                {imagePreview && (
                                    <img src={imagePreview} alt="Profile Preview" className="mt-3 mr-2" width="100" />
                                )}
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

export default NewTeamMember;