import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PatientTable from './Component/PatientTable';
import DoctorAppointmentForm from './Component/DoctorAppointmentForm';
import Navigation  from './Navigation';
const App = () => {
  return (
    <Router>
      <div>
        <Navigation/>
      <Routes>
        <Route exact path="/" element={<DoctorAppointmentForm/>} />
        <Route path="/" element={<DoctorAppointmentForm/>} />
        <Route path="/PatientTable" element={<PatientTable/>} />


      </Routes>
      </div>
    </Router>
  );
};

export default App;
