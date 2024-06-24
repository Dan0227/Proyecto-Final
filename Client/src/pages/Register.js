import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/pages/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validación de campos
    const { username, email, password, confirmPassword, firstName, lastName } = formData;
    if (!username || !email || !password || !confirmPassword || !firstName || !lastName) {
      setError('Rellene todos los campos obligatorios');
      setLoading(false);
      setShowError(true);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      setShowError(true);
      return;
    }

    // Simulación de la autenticación
    setTimeout(() => {
      setLoading(false);
      // Aquí iría la lógica para registrar al usuario
      console.log('Register successful');
    }, 2000);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <Form onSubmit={handleRegister}>
      <h2 className="text-center">Register</h2>
      {showError && (
        <Alert variant="danger" onClick={handleCloseError} className="alert">
          {error}
        </Alert>
      )}
      <Form.Group controlId="formBasicUsername">
        <Form.Control
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="form-control"
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
        />
      </Form.Group>
      <div className="d-flex">
        <Form.Group controlId="formBasicFirstName" className="mr-2">
          <Form.Control
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-control"
            style={{ borderRadius: '15px' }}
          />
        </Form.Group>
        <Form.Group controlId="formBasicLastName">
          <Form.Control
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="form-control"
            style={{ borderRadius: '15px' }}
          />
        </Form.Group>
      </div>
      <Form.Group controlId="formBasicPhone">
        <Form.Control
          type="text"
          placeholder="Phone (optional)"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-control"
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-control"
        />
      </Form.Group>
      <Form.Group controlId="formBasicConfirmPassword">
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="form-control"
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        className="register-button"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Register'}
      </Button>
      <div className="text-center mt-3">
        <Link to="/login" className="text-decoration-none">Already have an account? Login</Link>
      </div>
    </Form>
  );
};

export default Register;
