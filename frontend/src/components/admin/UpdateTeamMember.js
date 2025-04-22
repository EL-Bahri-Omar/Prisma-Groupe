import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
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
            alert.success('Team member updated successfully');
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
            <MetaData title={'Update Team Member'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Update Team Member</h1>

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
                                    {oldImage && (
                                        <img src={oldImage} alt="Old Profile Preview" className="mt-3 mr-2" width="100" />
                                    )}
                                    {imagePreview && (
                                        <img src={imagePreview} alt="Profile Preview" className="mt-3 mr-2" width="100" />
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
    );
};

export default UpdateTeamMember;