import React, { useState } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import '../styles/pages/ForgotPassword.css';  // Asegúrate de que la ruta es correcta

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = (e) => {
    e.preventDefault();
    // Lógica de recuperación de contraseña
  };

  return (
    <Container className="forgot-password-container">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Reset Password</h2>
          <Form onSubmit={handlePasswordReset}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
              Send Reset Link
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
