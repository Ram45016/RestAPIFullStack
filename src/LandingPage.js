import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
      <Link to="/login"><button className="login-button">Login</button></Link>
      </header>
      <div className="content">
        <h1 className="title">Book Your Doctor Appointments Online</h1>
        <p className="subtitle">Find the right doctor and schedule your appointments conveniently.</p>
        <Link to="/register"> <button className="get-started-button">Get Started</button></Link>
        <p className="login-link">Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default LandingPage;
