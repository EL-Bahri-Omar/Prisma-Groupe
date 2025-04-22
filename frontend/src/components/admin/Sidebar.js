import React from 'react'
import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
                <nav id="sidebar">
                    <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
                    </li>
            
                    <li>
                      <a href="#productSubmenu" data-bs-toggle="collapse" aria-expanded="false" aria-controls="productSubmenu" className="dropdown-toggle ">
                          <i className="fa fa-product-hunt"></i> Projets</a>
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
                          <i className="fa fa-product-hunt"></i> Blogs</a>
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
                          <i className="fa fa-product-hunt"></i> Actualités</a>
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
                          <i className="fa fa-product-hunt"></i> Team</a>
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
                        <Link to="/admin/users"><i className="fa fa-users"></i> Utilisateurs</Link>
                    </li>

                    <li>
                        <Link to="/reviews"><i className="fa fa-star"></i> Avis</Link>
                    </li>
                    
                    <li>
                        <Link to="/admin/messages"><i className="fa fa-shopping-basket"></i> Notifications</Link>
                    </li>
            
                </ul>
                </nav>
            </div>
  )
}

export default Sidebar
