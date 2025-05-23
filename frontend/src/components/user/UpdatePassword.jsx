import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import MetaData from "../layout/MetaData"

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearErrors } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants.js"
import '../../styles/dashboard.css'
import Sidebar from '../sidebar/Sidebar';

const UpdatePassword = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({ oldpass: false })
        
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
            
    const { user } = useSelector(state => state.auth);
    const { error, isUpdated, loading } = useSelector(state => state.user);
            
    useEffect(() => {
        
    
        
            
    }, [dispatch, alert, error, isUpdated, navigate])
            
    const submitHandler = (e) => {
        e.preventDefault();
        setErrors({ oldpass: false });
        
        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);
        
        dispatch(updatePassword(formData))

        if (isUpdated) {
            alert.success('Mot de passe mis à jour avec succès.');
            setErrors({ oldpass: false });
            dispatch({ type: UPDATE_PASSWORD_RESET });
            navigate('/me');
        }

        else {
            setErrors({ oldpass: true });
            dispatch(clearErrors());
        }
    }
    
    return (
        <Fragment>
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
            <MetaData title={'Changer mot de passe'} />

            <div className={`dashboard-content app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
                <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler}>
                            <h1 className="mt-2 mb-5">Changer Mot de Passe</h1>
                            <div className="form-group">
                                <label htmlFor="old_password_field">Ancien Mot de Passe</label>
                                <input
                                    type="password"
                                    id="old_password_field"
                                    className={`form-control ${errors.oldpass ? 'is-invalid' : ''}`}
                                    value={oldPassword}
                                    onChange={(e) => {
                                        setOldPassword(e.target.value);
                                        if (errors.oldpass) {
                                            setErrors({ oldpass: false });
                                        }
                                    }}
                                    required
                                />
                                {errors.oldpass && (
                                    <div className="invalid-feedback">** ! Ce mot de passe ne correspond pas à l'ancien mot de passe ! **</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="new_password_field">Nouveau Mot de Passe</label>
                                <input
                                    type="password"
                                    id="new_password_field"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit"
                                className="btn btn-primary btn-block mt-4 mb-3"
                                disabled={loading}>
                                {loading ? 'Mise à jour...' : 'Mettre à jour'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdatePassword