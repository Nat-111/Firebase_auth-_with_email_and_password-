import React from 'react';
import '../App.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-links">
                    <div className="footer-link-wrapper">
                        <div className="footer-link-items">
                            <h2>About Us</h2>
                            <a href="#">How it works</a>
                            <a href="#">Testimonials</a>
                            <a href="#">Careers</a>
                            <a href="#">Terms of Service</a>
                        </div>
                    </div>
                    <div className="footer-link-wrapper">
                        <div className="footer-link-items">
                            <h2>Contact Us</h2>
                            <a href="#">Contact</a>
                            <a href="#">Support</a>
                            <a href="#">Destinations</a>
                            <a href="#">Sponsorships</a>
                        </div>
                    </div>
                </div>
                <section className="social-media">
                    <div className="social-media-wrap">
                        <div className="footer-logo">
                            <span className="social-logo">FireAuth</span>
                        </div>
                        <small className="website-rights">FireAuth © {new Date().getFullYear()}</small>
                        <div className="social-icons">
                            <a className="social-icon-link" href="#" target="_blank" aria-label="Facebook">
                                <i className="fab fa-facebook-f" />
                            </a>
                            <a className="social-icon-link" href="#" target="_blank" aria-label="Instagram">
                                <i className="fab fa-instagram" />
                            </a>
                            <a className="social-icon-link" href="#" target="_blank" aria-label="Twitter">
                                <i className="fab fa-twitter" />
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </footer>
    );
};

export default Footer;
