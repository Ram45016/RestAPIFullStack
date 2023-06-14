import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';
import DoctorAppointmentForm from './DoctorAppointmentForm';
import PatientTable from './PatientTable';
import HomePage from './HomePage';

const AppRoutes = () => {
  return (

    <Routes>
      <Route exact path="/"element=<LandingPage/> />
      <Route path="/login" element=<Login/> />
      <Route path="/home" element=<HomePage/> />
      <Route path="/register" element=<Register/> />
      <Route path="/doctor-appointment-form" element={<DoctorAppointmentForm/>} />
      <Route path="/patient-table" element={<PatientTable/>} />
    </Routes>
  );
};

export default AppRoutes;
