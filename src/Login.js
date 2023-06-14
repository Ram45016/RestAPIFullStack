import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      // Check if the login credentials are valid
      if (values.email === 'admin@gmail.com' && values.password === '12345678') {
        // Successful login
        toast.success('Login successful!', {
          position: toast.POSITION.TOP_CENTER,
        });
        // Redirect to the desired page
        // Replace '/dashboard' with the actual path of your DoctorAppointmentForm component
        window.location.href = '/home';
      } else {
        // Invalid login
        toast.error('Invalid email or password', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    },
  });

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className={`login-input ${formik.touched.email && formik.errors.email ? 'error' : ''}`}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && <p className="error-message">{formik.errors.email}</p>}
          <input
            type="password"
            placeholder="Password"
            className={`login-input ${formik.touched.password && formik.errors.password ? 'error' : ''}`}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && <p className="error-message">{formik.errors.password}</p>}
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="register-link">Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
