import React, { Fragment } from 'react'
import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <Fragment>
    <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
    <div className="admin-sidebar-wrapper">
                <nav id="admin-sidebar">
                    <ul className="list-unstyled components">
                    <li>
                        <Link to="/"><i className="fa fa-home"></i> Home</Link>
                    </li>
                    
                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
                    </li>
            
                    <li>
                      <a href="#productSubmenu" data-bs-toggle="collapse" aria-expanded="false" aria-controls="productSubmenu" className="dropdown-toggle ">
                          <i className="fa fa-tasks"></i> Projets</a>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                            <Link to="/admin/projects"><i className="fa fa-clipboard"></i> All</Link>
                            </li>
            
                            <li>
                            <Link to="/admin/project/new"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>
                    
                    <li>
                      <a href="#blogSubmenu" data-bs-toggle="collapse" aria-expanded="false" aria-controls="blogSubmenu" className="dropdown-toggle ">
                          <i className="fa fa-book"></i> Blogs</a>
                        <ul className="collapse list-unstyled" id="blogSubmenu">
                            <li>
                            <Link to="/admin/blogs"><i className="fa fa-clipboard"></i> All</Link>
                            </li>
            
                            <li>
                            <Link to="/admin/blog/new"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>
                    
                    <li>
                      <a href="#serviceSubmenu" data-bs-toggle="collapse" aria-expanded="false" aria-controls="serviceSubmenu" className="dropdown-toggle ">
                          <i className="fa fa-newspaper"></i> Actualités</a>
                        <ul className="collapse list-unstyled" id="serviceSubmenu">
                            <li>
                            <Link to="/admin/actualites"><i className="fa fa-clipboard"></i> All</Link>
                            </li>
            
                            <li>
                            <Link to="/admin/actualite/new"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>
                    
                    <li>
                      <a href="#eventSubmenu" data-bs-toggle="collapse" aria-expanded="false" aria-controls="eventSubmenu" className="dropdown-toggle ">
                          <i className="fa fa-users"></i> Team</a>
                        <ul className="collapse list-unstyled" id="eventSubmenu">
                            <li>
                            <Link to="/admin/team"><i className="fa fa-clipboard"></i> All</Link>
                            </li>
            
                            <li>
                            <Link to="/admin/team/new"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="fa fa-user"></i> Utilisateurs</Link>
                    </li>

                    <li>
                        <Link to="/reviews"><i className="fa fa-star"></i> Avis</Link>
                    </li>
                    
                    <li>
                        <Link to="/admin/messages"><i className="fa fa-bell"></i> Notifications</Link>
                    </li>
            
                </ul>
                </nav>
          </div>
          </Fragment>
  )
}

export default Sidebar
