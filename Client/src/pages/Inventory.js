import React, { useState, useEffect } from 'react';
import { getProducts, createProduct } from '../services/api';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styles/pages/Inventory.css';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createProduct(newProduct);
      setProducts([...products, response.data]);
      setNewProduct({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: ''
      });
    } catch (error) {
      console.error('Error adding product', error);
    }
  };

  return (
    <Container className="mt-5 text-center">
      <Row>
        <Col>
          <h1>Inventory Management</h1>
        </Col>
      </Row>
      <Row className="mt-4 justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit} className="form p-4">
            <Form.Group controlId="nombre">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newProduct.nombre}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </Form.Group>
            <Form.Group controlId="descripcion">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={newProduct.descripcion}
                onChange={handleInputChange}
                placeholder="Enter product description"
                required
              />
            </Form.Group>
            <Form.Group controlId="precio">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={newProduct.precio}
                onChange={handleInputChange}
                placeholder="Enter product price"
                required
              />
            </Form.Group>
            <Form.Group controlId="stock">
              <Form.Label>Product Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleInputChange}
                placeholder="Enter product stock"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Add Product
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={10} className="mx-auto">
          <div className="table-container">
            <h2 className="text-center">Product Inventory</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.nombre}</td>
                    <td>{product.descripcion}</td>
                    <td>${product.precio}</td>
                    <td>{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Inventory;
