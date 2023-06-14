import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <header>
        <h1>Medigo</h1>
        <p>Your Appointments at Your Door Step</p>
      </header>
      <main>
        <div className="features">
          <div className="feature">
            <Link to="/doctor-appointment-form">
              <i className="fas fa-pencil-alt"></i>
              <h3>Book Appointments</h3>
            </Link>
            <p>Health is Wealth!!!</p>
          </div>
          <div className="feature">
            <Link to="/patient-table">
            <i className="fas fa-book-open"></i>
            <h3>Patient Details</h3>
            </Link>
            <p>Make your schedule </p>
          </div>
          </div>
      </main>
      <footer>
        <p>&copy; 2023 Medigo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;