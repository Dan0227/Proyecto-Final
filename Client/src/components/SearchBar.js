// src/components/SearchBar.js
import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import '../styles/components/SearchBar.css';

const SearchBar = () => {
  return (
    <Form className="d-flex search-bar">
      <FormControl
        type="search"
        placeholder="Buscar"
        className="me-2 form-control"
        aria-label="Buscar"
      />
      <Button variant="outline-light" className="search-button">Buscar</Button>
    </Form>
  );
};

export default SearchBar;
