import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PatientTable.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PatientTable = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [updatedPatient, setUpdatedPatient] = useState({
    patientId: '',
    name: '',
    age: '',
    address: '',
    date: '',
    time: '',
    phone: '',
    reason: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/patient/get');
      setPatients(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch patients');
    }
  };

  const deletePatient = async (patientId) => {
    try {
      await axios.delete(`http://localhost:8080/api/patient/${patientId}`);
      fetchPatients();
      setSelectedPatient(null);
      toast.success('Patient deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete patient');
    }
  };

  const openUpdatePopup = (patient) => {
    setSelectedPatient(patient);
    setUpdatedPatient(patient);
  };

  const updatePatient = async () => {
    try {
      if (!validatePatientData(updatedPatient)) {
        toast.error('Invalid patient data');
        return;
      }

      await axios.put(`http://localhost:8080/api/patient/${selectedPatient.patientId}`, updatedPatient);
      fetchPatients();
      setSelectedPatient(null);
      toast.success('Patient updated successfully');
      console.log("Upadted Details");
      console.log(updatedPatient);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update patient');
    }
  };

  const validatePatientData = (patient) => {
    const { name, age, address, date, time, phone, reason } = patient;
    if (!name || !age || !address || !date || !time || !phone || !reason) {
      return false;
    }
    return true;
  };

  const renderPopup = () => {
    if (!selectedPatient) return null;

    return (
      <div className="popup">
        <div className="popup-content">
          <h2>Update Patient</h2>
          <input
            type="text"
            value={updatedPatient.patientId}
            readOnly
            placeholder="Patient ID"
          />
          <input
            type="text"
            value={updatedPatient.name}
            onChange={(e) =>
              setUpdatedPatient({ ...updatedPatient, name: e.target.value })
            }
            placeholder="Name"
          />
          <input
            type="text"
            value={updatedPatient.age}
            onChange={(e) =>
              setUpdatedPatient({ ...updatedPatient, age: e.target.value })
            }
            placeholder="Age"
          />
          <input
            type="text"
            value={updatedPatient.address}
            onChange={(e) =>
              setUpdatedPatient({ ...updatedPatient, address: e.target.value })
            }
            placeholder="Address"
          />
          <input
            type="text"
            value={updatedPatient.date}
            onChange={(e) =>
              setUpdatedPatient({ ...updatedPatient, date: e.target.value })
            }
            placeholder="Date"
          />
          <input
            type="text"
            value={updatedPatient.time}
            onChange={(e) =>
              setUpdatedPatient({ ...updatedPatient, time: e.target.value })
            }
            placeholder="Time"
          />
          <input
            type="text"
            value={updatedPatient.phone}
            onChange={(e) =>
              setUpdatedPatient({ ...updatedPatient, phone: e.target.value })
            }
            placeholder="Phone"
          />
          <input
            type="text"
            value={updatedPatient.reason}
            onChange={(e) =>
              setUpdatedPatient({ ...updatedPatient, reason: e.target.value })
            }
            placeholder="Reason"
          />
          <div className="button-group">
            <button className="btn btn-success" onClick={updatePatient}>
              Update
            </button>
            <button
              className="btn btn-danger"
              onClick={() => deletePatient(selectedPatient.patientId)}
            >
              Delete
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setSelectedPatient(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPatients = patients.filter((patient) => {
    const { patientId, name, age, address, date, time, phone, reason } = patient;
    const searchQuery = searchTerm.toLowerCase();
    return (
      String(patientId).toLowerCase().includes(searchQuery) ||
      name.toLowerCase().includes(searchQuery) ||
      String(age).toLowerCase().includes(searchQuery) ||
      address.toLowerCase().includes(searchQuery) ||
      date.toLowerCase().includes(searchQuery) ||
      time.toLowerCase().includes(searchQuery) ||
      String(phone).toLowerCase().includes(searchQuery) ||
      reason.toLowerCase().includes(searchQuery)
    );
  });
  
  return (
    <div className='patientTablePage'>

    <div className="container">
      <h1>Patients</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Date</th>
            <th>Time</th>
            <th>Phone</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.patientId}>
              <td>{patient.patientId}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.address}</td>
              <td>{patient.date}</td>
              <td>{patient.time}</td>
              <td>{patient.phone}</td>
              <td>{patient.reason}</td>
              <td>
                {selectedPatient && selectedPatient.patientId === patient.patientId ? (
                  null
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => openUpdatePopup(patient)}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {renderPopup()}
      <ToastContainer />
    </div>
          </ div>
  );
};

export default PatientTable;
