import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { createUser } from '../services/api';
import '../styles/pages/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    shippingAddress: '',
    profilePicture: '',
    roleId: 2
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { username, email, password, confirmPassword, firstName, lastName, phone, shippingAddress, profilePicture, roleId } = formData;

    if (!username || !email || !password || !confirmPassword || !firstName || !lastName || !phone) {
      setError('Rellene todos los campos');
      setLoading(false);
      setShowError(true);
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      setShowError(true);
      return;
    }

    if (password !== confirmPassword) {
      setError('La contraseña no coincide');
      setLoading(false);
      setShowError(true);
      return;
    }

    try {
      await createUser({
        username,
        correo_electronico: email, 
        contraseña: password,
        nombre_usuario: firstName,
        apellido_usuario: lastName,
        telefono: phone,
        direccion_envio: shippingAddress,
        foto_perfil: profilePicture,
        id_rol: roleId
      });

      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
        shippingAddress: '',
        profilePicture: '',
        roleId: 2
      });

      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
      console.log('Usuario registrado exitosamente');
      // Aquí podrías redirigir al usuario a otra página o mostrar un mensaje de éxito

    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
      setError('Error al registrar usuario. Inténtelo de nuevo más tarde.');
      setLoading(false);
      setShowError(true);
    }
  };

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <Form onSubmit={handleRegister}>
      <h2 className="text-center">Registrar</h2>
      {showError && (
        <Alert variant="danger" onClick={handleCloseError} className="alert">
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="alert alert-success">
          Usuario registrado exitosamente
        </Alert>
      )}
      <Form.Group controlId="formBasicUsername">
        <Form.Control
          type="text"
          placeholder="Usuario"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="form-control"
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Control
          type="email"
          placeholder="Correo electronico"
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
            placeholder="Nombre"
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
            placeholder="Apellido"
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
          placeholder="Telefono"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-control"
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword" className="password-field">
        <Form.Control
          type={showPassword ? 'text' : 'password'}
          placeholder="Contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-control"
        />
        <div className="password-toggle-icon" onClick={togglePasswordVisibility}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </Form.Group>
      <Form.Group controlId="formBasicConfirmPassword" className="password-field">
        <Form.Control
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirmar contraseña"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="form-control"
        />
        <div className="password-toggle-icon" onClick={toggleConfirmPasswordVisibility}>
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        className="register-button"
        disabled={loading}
      >
        {loading ? 'Cargando...' : 'Registrar'}
      </Button>
    </Form>
  );
};

export default Register;