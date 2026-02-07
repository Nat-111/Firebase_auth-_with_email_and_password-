import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
    return (
        <div className="signup-container" style={{ maxWidth: '600px', textAlign: 'center' }}>
            <h1 className="app-heading">Welcome to FireAuth</h1>
            <p className="signup-para">
                A secure, modern authentication system built with Firebase and React.
                Experience the next generation of user management.
            </p>

            <div className="signup-form">
                <Link to="/signin" className="btn-primary" style={{ textDecoration: 'none' }}>
                    Sign In to Account
                </Link>
                <Link to="/signup" className="btn-secondary" style={{ textDecoration: 'none', justifyContent: 'center' }}>
                    Create New Account
                </Link>
            </div>
        </div>
    );
};

export default Home;
