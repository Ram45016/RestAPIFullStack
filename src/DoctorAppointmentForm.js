import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './DoctorAppointmentForm.css';

const DoctorAppointmentForm = () => {
  const history = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    address: '',
    date: '',
    time: '',
    phone: '',
    reason: '',
    pastMedicalHistory: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post('http://localhost:8080/api/patient', formData)
        .then(() => {
          toast.success('Appointment booked successfully!');
          history('/patient-table');
          console.log("Appointment booked Successfully");
          console.log(formData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (formData.name.trim() === '') {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (formData.age.trim() === '') {
      errors.age = 'Age is required';
      isValid = false;
    }

    if (formData.gender.trim() === '') {
      errors.gender = 'Gender is required';
      isValid = false;
    }

    if (formData.address.trim() === '') {
      errors.address = 'Address is required';
      isValid = false;
    }

    if (formData.date.trim() === '') {
      errors.date = 'Appointment Date is required';
      isValid = false;
    }

    if (formData.time.trim() === '') {
      errors.time = 'Appointment Time is required';
      isValid = false;
    }

    if (formData.phone.trim() === '') {
      errors.phone = 'Phone is required';
      isValid = false;
    }

    if (formData.reason.trim() === '') {
      errors.reason = 'Reason is required';
      isValid = false;
    }

    if (formData.pastMedicalHistory.trim() === '') {
      errors.pastMedicalHistory = 'Past Medical History is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <div className='formPage'>
      
    <div className="container-form">
      <h1>Doctor Appointment Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={errors.age ? 'error' : ''}
            />
          {errors.age && <span className="error-message">{errors.age}</span>}
        </div>
        <div className="dropdown">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={errors.gender ? 'error' : ''}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <span className="error-message">{errors.gender}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? 'error' : ''}
            />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="date">Appointment Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={errors.date ? 'error' : ''}
            />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="time">Appointment Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={errors.time ? 'error' : ''}
          />
          {errors.time && <span className="error-message">{errors.time}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            value={formData.phone}
            type="tel"
            id="phone"
            name="phone"
            pattern="[0-9]{10}"
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
            />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <textarea
            id="reason"
            name="reason"
            rows="4"
            value={formData.reason}
            onChange={handleChange}
            className={errors.reason ? 'error' : ''}
            ></textarea>
          {errors.reason && <span className="error-message">{errors.reason}</span>}
        </div>
        <div className="dropdown">
        <label htmlFor="pastMedicalHistory">Past Medical History</label>
          <select
            id="pastMedicalHistory"
            name="pastMedicalHistory"
            value={formData.pastMedicalHistory}
            onChange={handleChange}
            className={errors.pastMedicalHistory ? 'error' : ''}
          >
            <option value="">Select Past Medical History</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.pastMedicalHistory && <span className="error-message">{errors.pastMedicalHistory}</span>}
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
      <ToastContainer position="top-center" />
    </div>
            </div>
  );
};

export default DoctorAppointmentForm;
