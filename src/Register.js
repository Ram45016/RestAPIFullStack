import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
      confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: (values) => {
      // You can perform your registration logic here
      // For now, let's just display the form data in the console
      console.log(values);
    },
  });

  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="register-title">Register</h1>
        <form className="register-form" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            className="register-input"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="error-message">{formik.errors.firstName}</p>
          )}
          <input
            type="text"
            placeholder="Last Name"
            className="register-input"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="error-message">{formik.errors.lastName}</p>
          )}
          <input
            type="email"
            placeholder="Email"
            className="register-input"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="error-message">{formik.errors.email}</p>
          )}
          <input
            type="password"
            placeholder="Password"
            className="register-input"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="error-message">{formik.errors.password}</p>
          )}
          <input
            type="password"
            placeholder="Confirm Password"
            className="register-input"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="error-message">{formik.errors.confirmPassword}</p>
          )}
          <button type="submit" className="register-button">
            Register
          </button>
          <p className="login-link">Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
