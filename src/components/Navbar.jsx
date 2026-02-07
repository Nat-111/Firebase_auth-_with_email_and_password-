import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/authContext';
import '../App.css';

const Navbar = () => {
    const { user, logout } = UserAuth();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    FireAuth
                </Link>

                <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
                    <Link to="/" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                    {!user ? (
                        <>
                            <Link to="/signin" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                            <Link to="/signup" className="nav-item nav-btn" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/accountpage" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
                            <button onClick={handleLogout} className="nav-item nav-btn-outline">Logout</button>
                        </>
                    )}
                </div>

                <div className="menu-icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    <span className={`bar ${mobileMenuOpen ? 'active' : ''}`}></span>
                    <span className={`bar ${mobileMenuOpen ? 'active' : ''}`}></span>
                    <span className={`bar ${mobileMenuOpen ? 'active' : ''}`}></span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
