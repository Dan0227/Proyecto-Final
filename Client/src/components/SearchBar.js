// src/components/SearchBar.js
import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import '../styles/components/SearchBar.css'; // Importar estilos CSS

const SearchBar = () => {
  return (
    <Form className="d-flex search-bar">
      <FormControl
        type="search"
        placeholder="Buscar"
        className="me-2 form-control"
        aria-label="Buscar"
      />
      <Button variant="light" className="search-button">Buscar</Button> {/* Variant light para botón blanco */}
    </Form>
  );
};

export default SearchBar;
