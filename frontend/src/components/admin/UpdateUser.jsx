import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import MetaData from "../layout/MetaData"
import Sidebar from './Sidebar'
import Header from "../layout/Header";

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, getUserDetails, clearErrors } from '../../actions/userActions'
import { UPDATE_USER_RESET } from "../../constants/userConstants"


const UpdateUser = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
        
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
            
    const { error, isUpdated } = useSelector(state => state.user);
    const { user } = useSelector(state => state.userDetails);

    const {userId} = useParams();
            
    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
                    
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    
        if (isUpdated) {
            alert.success('User updated successfully.');
            navigate('/admin/users')
            dispatch({ type: UPDATE_USER_RESET })
        }
    }, [dispatch, alert, user, isUpdated, error, userId, navigate])
            
    const submitHandler = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('role', role);
        
        dispatch(updateUser(user._id, formData))
    }

    return (
        <Fragment>
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
            <MetaData title={`Mettre à jour Utilisateur`}/>
            
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
                    <div className="scrollable-content mt-5">
                            <div className="row justify-content-center mt-5">
                                <div className="col-10 col-lg-5">
                                    <form className="shadow-lg p-4" onSubmit={submitHandler}>
                                        <h1 className="mb-4 text-center">Mettre à jour Utilisateur</h1>

                                        <div className="form-group">
                                            <label htmlFor="name_field">Nom</label>
                                            <input 
                                                type="name" 
                                                id="name_field" 
                                                className="form-control"
                                                name='name'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email_field">Email</label>
                                            <input
                                                type="email"
                                                id="email_field"
                                                className="form-control"
                                                name='email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="role_field">Rôle</label>
                                            <select
                                                id="role_field"
                                                className="form-control"
                                                name='role'
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                            >
                                                <option value="user">user</option>
                                                <option value="admin">admin</option>
                                                <option value="super">super</option>
                                            </select>
                                        </div>

                                        <div className="text-center">
                                            <button 
                                                type="submit" 
                                                className="btn btn-primary py-3" 
                                                style={{ width: '100%' }}
                                            >
                                                MISE À JOUR
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateUser