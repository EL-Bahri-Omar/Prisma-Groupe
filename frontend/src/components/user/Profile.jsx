import React, { Fragment, useState } from 'react'
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import '../../styles/dashboard.css'
import '../../styles/profile.css'
import Sidebar from '../sidebar/Sidebar'

const Profile = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { user, loading } = useSelector(state => state.auth)
    
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }
    
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <div className={`profile-wrapper ${sidebarOpen ? 'sidebar-open' : ''}`}>
                    <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
                    <MetaData title={'Your Profile'} />
                    
                    <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
                    
                    <div className="profile-content">
                        <h2 className="profile-header">My Profile</h2>
                        <div className="profile-container">
                            <div className="profile-avatar-container">
                                <figure className="avatar-profile">
                                    <img src={user.avatar.url} alt={user.name} />
                                </figure>
                                <Link to="/me/update" className="btn-edit-profile">
                                    Modifier Profil
                                </Link>
                            </div>
                
                            <div className="profile-info">
                                <h4>Nom</h4>
                                <p>{user.name}</p>
                
                                <h4>Address Mail</h4>
                                <p>{user.email}</p>

                                <h4>Rejoint Le</h4>
                                <p>{String(user.createdAt).substring(0, 10)}</p>   

                                <Link to="/password/update" className="btn-change-password">
                                    Changer Mot de Passe
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default Profile
