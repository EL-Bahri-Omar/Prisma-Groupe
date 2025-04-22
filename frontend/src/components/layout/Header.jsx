import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../actions/userActions'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    
    const alert = useAlert();
    const dispatch = useDispatch();
    const { user, loading } = useSelector(state => state.auth);

    const logoutHandler = () => {
        dispatch(logout());
        alert.success('Logged out successfully.')
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/">
                            <img src="/images/logo.png" alt="" />
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                        <div className="ml-1 dropdown d-inline" ref={dropdownRef}>
                            <Link to="#!" className="btn dropdown-toggle text-white mr-4"
                                type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false" onClick={() => setIsOpen(!isOpen)} >
                                
                                <figure className="avatar avatar-nav">
                                    <img
                                        src={user.avatar && user.avatar?.url}
                                        alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>

                            {isOpen && (
                                <div className="dropdown-menu show" aria-labelledby="dropdownMenuButton">
                                    {user && user.role === 'admin' && (
                                        <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                    )}
                                    <Link className="dropdown-item" to="/messages/me">Messages</Link>
                                    <Link className="dropdown-item" to="/me">Profil</Link>
                                    <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>Déconnexion</Link>
                                </div>
                            )}
                        </div>

                </div>
            </nav>
        </Fragment>
    );
};

export default Header;
