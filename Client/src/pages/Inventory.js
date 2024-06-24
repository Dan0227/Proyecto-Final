import React, { useState, useEffect } from 'react';
import { getProducts, createProduct } from '../services/api';
import { Container, Row, Col, Form, Button, Table, Alert } from 'react-bootstrap';
import '../styles/pages/Inventory.css';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    id_categoria: '',
    id_modelo: '',
    id_proveedor: '',
    descuento: '',
    foto_producto: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products', error);
        setError('Error fetching products. Please try again later.');
        setLoading(false);
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
        stock: '',
        id_categoria: '',
        id_modelo: '',
        id_proveedor: '',
        descuento: '',
        foto_producto: ''
      });
    } catch (error) {
      console.error('Error adding product', error);
      setError('Error adding product. Please try again.');
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
            <Form.Group controlId="id_categoria">
              <Form.Label>Category ID</Form.Label>
              <Form.Control
                type="text"
                name="id_categoria"
                value={newProduct.id_categoria}
                onChange={handleInputChange}
                placeholder="Enter category ID"
              />
            </Form.Group>
            <Form.Group controlId="id_modelo">
              <Form.Label>Model ID</Form.Label>
              <Form.Control
                type="text"
                name="id_modelo"
                value={newProduct.id_modelo}
                onChange={handleInputChange}
                placeholder="Enter model ID"
              />
            </Form.Group>
            <Form.Group controlId="id_proveedor">
              <Form.Label>Supplier ID</Form.Label>
              <Form.Control
                type="text"
                name="id_proveedor"
                value={newProduct.id_proveedor}
                onChange={handleInputChange}
                placeholder="Enter supplier ID"
              />
            </Form.Group>
            <Form.Group controlId="descuento">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="text"
                name="descuento"
                value={newProduct.descuento}
                onChange={handleInputChange}
                placeholder="Enter discount"
              />
            </Form.Group>
            <Form.Group controlId="foto_producto">
              <Form.Label>Product Photo URL</Form.Label>
              <Form.Control
                type="text"
                name="foto_producto"
                value={newProduct.foto_producto}
                onChange={handleInputChange}
                placeholder="Enter product photo URL"
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
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category ID</th>
                    <th>Model ID</th>
                    <th>Supplier ID</th>
                    <th>Discount</th>
                    <th>Photo</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.nombre}</td>
                      <td>{product.descripcion}</td>
                      <td>${product.precio}</td>
                      <td>{product.stock}</td>
                      <td>{product.id_categoria}</td>
                      <td>{product.id_modelo}</td>
                      <td>{product.id_proveedor}</td>
                      <td>{product.descuento}</td>
                      <td>
                        {product.foto_producto && (
                          <img src={product.foto_producto} alt={product.nombre} style={{ maxWidth: '100px' }} />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Inventory;