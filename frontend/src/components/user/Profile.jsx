import React, { Fragment, useState } from 'react'
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import '../../styles/dashboard.css'
import Sidebar from '../sidebar/Sidebar';

const Profile = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { user, loading } = useSelector(state => state.auth)
    
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
                    <MetaData title={'Your Profile'} />
                    
                    <div className={`dashboard-content app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
                        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
                        <h2 className="row justify-content-around user-info mt-5">My Profile</h2>
                        <div className="row justify-content-around mt-5 user-info ml-5">
                            <div className="col-2 col-md-2">
                                <figure className='avatar avatar-profile'>
                                    <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.name} />
                                </figure>
                                <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5 ml-4">
                                    Edit Profile
                                </Link>
                            </div>
                    
                            <div className="col-12 col-md-3">
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                    
                                <h4>Email Address</h4>
                                <p>{user.email}</p>

                                <h4>Joined On</h4>
                                <p>{String(user.createdAt).substring(0, 10)}</p>   

                                <Link to="/password/update" className="btn btn-primary btn-block mt-5">
                                    Change Password
                                </Link>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile
