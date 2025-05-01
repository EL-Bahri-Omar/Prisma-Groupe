import React, { Fragment, useEffect } from 'react'
import { Link } from "react-router-dom"
import MetaData from "../layout/MetaData"
import Header from "../layout/Header"
import Sidebar from "./Sidebar"
import { useDispatch, useSelector } from 'react-redux'
import { allUsers } from "../../actions/userActions"
import { getAdminBlogs } from "../../actions/blogActions"
import { getAdminActualites } from "../../actions/actualiteActions"
import { getAdminProjects } from "../../actions/projectActions"
import { getAllMessages } from "../../actions/messageActions"
import { getAdminTeamMembers } from "../../actions/teamActions"
import '../../styles/dashboard.css'

const Dashboard = () => {
    const dispatch = useDispatch();
    const { users } = useSelector(state => state.allUsers)
    const { blogs } = useSelector(state => state.blogs)
    const { actualites } = useSelector(state => state.actualites)
    const { projects } = useSelector(state => state.projects)
    const { messages } = useSelector(state => state.allMessages)
    
    useEffect(() => {
        dispatch(allUsers())
        dispatch(getAdminBlogs())
        dispatch(getAdminActualites())
        dispatch(getAdminProjects())
        dispatch(getAllMessages())
        dispatch(getAdminTeamMembers())
    }, [dispatch])

    return (
        <Fragment>
            <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
            <div className="dashboard-content">
                <Header/>
                <div className="row">
                    <div className="col-12 col-md-2">
                        <Sidebar/>
                    </div>

                    <div className="col-12 col-md-10 dashboard-content">
                        <h1 className="my-4">Dashboard</h1>

                        <Fragment>
                            <MetaData title={'Admin Dashboard'} />
                            
                            <div className="row px-3">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Notifications<br /> <b>{messages && messages.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/messages">
                                            <span className="float-left">Afficher les détails</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="row px-3">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Projets<br /> <b>{projects && projects.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/projects">
                                            <span className="float-left">Afficher les détails</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Actualités<br /> <b>{actualites && actualites.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/actualites">
                                            <span className="float-left">Afficher les détails</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Blogs<br /> <b>{blogs && blogs.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/blogs">
                                            <span className="float-left">Afficher les détails</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Users<br /> <b>{users && users.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                            <span className="float-left">Afficher les détails</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Dashboard