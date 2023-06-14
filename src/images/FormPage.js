import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const FormPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [data, setData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/patient/get');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (formData) => {
    try {
      if (isEditMode) {
        await axios.put(`http://localhost:8080/api/patient/${editId}`, formData);
      } else {
        await axios.post('http://localhost:8080/api/patient', formData);
      }
      fetchData();
      reset();
      setIsEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async (patientId) => {
    try {
      await axios.delete(`http://localhost:8080/api/patient/${patientId}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const enterEditMode = (patientId) => {
    const editedData = data.find(item => item.patientId === patientId);
    if (editedData) {
      setIsEditMode(true);
      setEditId(patientId);
      reset(editedData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="mt-4">Data Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="patientId" className="form-label">Patient ID:</label>
          <input type="text" className={`form-control ${errors.patientId ? 'is-invalid' : ''}`} {...register('patientId', { required: true })} />
          {errors.patientId && <div className="invalid-feedback">Patient ID is required.</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} {...register('name', { required: true })} />
          {errors.name && <div className="invalid-feedback">Name is required.</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age:</label>
          <input type="number" className={`form-control ${errors.age ? 'is-invalid' : ''}`} {...register('age', { required: true, min: 0 })} />
          {errors.age && <div className="invalid-feedback">Age is required and must be a positive number.</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address:</label>
          <input type="text" className={`form-control ${errors.address ? 'is-invalid' : ''}`} {...register('address', { required: true })} />
          {errors.address && <div className="invalid-feedback">Address is required.</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date:</label>
          <input type="text" className={`form-control ${errors.date ? 'is-invalid' : ''}`} {...register('date', { required: true })} />
          {errors.date && <div className="invalid-feedback">Date is required.</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="time" className="form-label">Time:</label>
          <input type="text" className={`form-control ${errors.time ? 'is-invalid' : ''}`} {...register('time', { required: true })} />
          {errors.time && <div className="invalid-feedback">Time is required.</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone:</label>
          <input type="text" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} {...register('phone', { required: true })} />
          {errors.phone && <div className="invalid-feedback">Phone is required.</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="reason" className="form-label">Reason:</label>
          <input type="text" className={`form-control ${errors.reason ? 'is-invalid' : ''}`} {...register('reason', { required: true })} />
          {errors.reason && <div className="invalid-feedback">Reason is required.</div>}
        </div>

        <button type="submit" className="btn btn-primary">
          {isEditMode ? 'Update' : 'Submit'}
        </button>
      </form>

      <h2 className="mt-4">Data List</h2>
      <ul className="list-group">
        {data.map((item) => (
          <li key={item.patientId} className="list-group-item d-flex justify-content-between align-items-center">
            {item.name}, {item.age}, {item.address}, {item.date}, {item.time}, {item.phone}, {item.reason}
            <div>
              <button className="btn btn-warning me-2" onClick={() => enterEditMode(item.patientId)}>Edit</button>
              <button className="btn btn-danger" onClick={() => onDelete(item.patientId)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormPage;
