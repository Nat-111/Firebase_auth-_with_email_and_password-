import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="hero-section">
                <span className="hero-badge">New: Dashboard 2.0 is Live</span>
                <div className="hero-content">
                    <h1>Secure Auth <br /> <span>Made Simple</span></h1>
                    <p>Implement Firebase Auth in your React apps with ease. Industry standard security, lightning fast performance, and a completely new modern dashboard.</p>
                    <div className="hero-btns">
                        <Link to="/signup" className="btn-mobile">
                            <button className="btn-primary">
                                Get Started Free <span>→</span>
                            </button>
                        </Link>
                        <a href="#features" className="btn-mobile">
                            <button className="btn-secondary">View Documentation</button>
                        </a>
                    </div>
                </div>
            </div>

            <div className="features-section" id="features">
                <div className="features-header">
                    <h2>Everything you need</h2>
                </div>
                <div className="features-container">
                    <div className="feature-card">
                        <div className="feature-icon" style={{ color: '#6366f1' }}>🔒</div>
                        <h3>Bank-Grade Security</h3>
                        <p>We use industry standard encryption to ensure your users' data is always safe and secure.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon" style={{ color: '#ec4899' }}>⚡</div>
                        <h3>Lightning Fast</h3>
                        <p>Optimized for speed. Our lightweight library ensures your app loads instantly.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon" style={{ color: '#a855f7' }}>📱</div>
                        <h3>Mobile Ready</h3>
                        <p>Fully responsive components that look great on any device, right out of the box.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
