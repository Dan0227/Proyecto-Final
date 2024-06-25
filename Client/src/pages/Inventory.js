import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api'; // Asegúrate de tener estas funciones en tu api.js
import { Container, Row, Col, Form, Button, Alert, Card, Modal } from 'react-bootstrap';
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
    foto_producto: null
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response);
      } catch (error) {
        console.error('Error al buscar productos:', error);
        setError('Error al buscar productos');
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

  const handleFileChange = (e) => {
    setNewProduct({
      ...newProduct,
      foto_producto: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const formData = new FormData();
    for (const key in newProduct) {
      formData.append(key, newProduct[key]);
    }

    try {
      const response = await createProduct(formData);
      setProducts([...products, response]);
      setNewProduct({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        id_categoria: '',
        id_modelo: '',
        id_proveedor: '',
        descuento: '',
        foto_producto: null
      });
      setSuccess('Producto agregado correctamente!');
    } catch (error) {
      console.error('Error al agregar producto:', error);
      setError('Error al agregar producto');
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({
      ...selectedProduct,
      [name]: value
    });
  };

  const handleModalFileChange = (e) => {
    setSelectedProduct({
      ...selectedProduct,
      foto_producto: e.target.files[0]
    });
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      for (const key in selectedProduct) {
        formData.append(key, selectedProduct[key]);
      }
      await updateProduct(selectedProduct.id_producto, formData);
      setProducts(products.map(p => p.id_producto === selectedProduct.id_producto ? selectedProduct : p));
      setShowModal(false);
      setSuccess('Producto actualizado correctamente!');
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      setError('Error al actualizar producto');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(selectedProduct.id_producto);
      setProducts(products.filter(p => p.id_producto !== selectedProduct.id_producto));
      setShowModal(false);
      setSuccess('Producto eliminado correctamente!');
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      setError('Error al eliminar producto');
    }
  };

  return (
    <Container className="mt-5 text-center">
      <Row>
        <Col>
          <h1>Administrar Inventario</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
        </Col>
      </Row>
      <Row className="mt-4 justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit} className="form p-4">
            <Form.Group controlId="nombre">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newProduct.nombre}
                onChange={handleInputChange}
                placeholder="Agregar el nombre del producto"
                required
              />
            </Form.Group>
            <Form.Group controlId="descripcion">
              <Form.Label>Descripción del Producto</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={newProduct.descripcion}
                onChange={handleInputChange}
                placeholder="Agregar descripción del producto"
              />
            </Form.Group>
            <Form.Group controlId="precio">
              <Form.Label>Precio del Producto</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={newProduct.precio}
                onChange={handleInputChange}
                placeholder="Agregar precio del producto"
                required
              />
            </Form.Group>
            <Form.Group controlId="stock">
              <Form.Label>Stock del Producto</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleInputChange}
                placeholder="Agregar stock del producto"
                required
              />
            </Form.Group>
            <Form.Group controlId="id_categoria">
              <Form.Label>ID de Categoría</Form.Label>
              <Form.Control
                type="number"
                name="id_categoria"
                value={newProduct.id_categoria}
                onChange={handleInputChange}
                placeholder="Agregar ID de categoría"
              />
            </Form.Group>
            <Form.Group controlId="id_modelo">
              <Form.Label>ID del Modelo</Form.Label>
              <Form.Control
                type="number"
                name="id_modelo"
                value={newProduct.id_modelo}
                onChange={handleInputChange}
                placeholder="Agregar ID del modelo"
              />
            </Form.Group>
            <Form.Group controlId="id_proveedor">
              <Form.Label>ID del Proveedor</Form.Label>
              <Form.Control
                type="number"
                name="id_proveedor"
                value={newProduct.id_proveedor}
                onChange={handleInputChange}
                placeholder="Agregar ID del proveedor"
              />
            </Form.Group>
            <Form.Group controlId="descuento">
              <Form.Label>Descuento</Form.Label>
              <Form.Control
                type="number"
                name="descuento"
                value={newProduct.descuento}
                onChange={handleInputChange}
                placeholder="Agregar porcentaje de descuento"
              />
            </Form.Group>
            <Form.Group controlId="foto_producto">
              <Form.Label>Foto del Producto</Form.Label>
              <Form.Control
                type="file"
                name="foto_producto"
                onChange={handleFileChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Agregar Producto
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-5">
        {products.map((product) => (
          <Col md={4} key={product.id_producto} className="mb-4">
            <Card>
              {product.foto_producto && (
                <Card.Img
                  variant="top"
                  src={`data:image/jpeg;base64,${product.foto_producto}`}
                  alt="Product"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <Card.Body>
                <Card.Title>{product.nombre}</Card.Title>
                <Card.Text>
                  <strong>Precio:</strong> ${product.precio}
                </Card.Text>
                <Button variant="primary" onClick={() => handleEditClick(product)}>
                  Editar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {selectedProduct && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="modal_nombre">
                <Form.Label>Nombre del Producto</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={selectedProduct.nombre}
                  onChange={handleModalInputChange}
                />
              </Form.Group>
              <Form.Group controlId="modal_descripcion">
                <Form.Label>Descripción del Producto</Form.Label>
                <Form.Control
                  as="textarea"
                  name="descripcion"
                  value={selectedProduct.descripcion}
                  onChange={handleModalInputChange}
                />
              </Form.Group>
              <Form.Group controlId="modal_precio">
                <Form.Label>Precio del Producto</Form.Label>
                <Form.Control
                  type="number"
                  name="precio"
                  value={selectedProduct.precio}
                  onChange={handleModalInputChange}
                />
              </Form.Group>
              <Form.Group controlId="modal_stock">
                <Form.Label>Stock del Producto</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={selectedProduct.stock}
                  onChange={handleModalInputChange}
                />
              </Form.Group>
              <Form.Group controlId="modal_id_categoria">
                <Form.Label>ID de Categoría</Form.Label>
                <Form.Control
                  type="number"
                  name="id_categoria"
                  value={selectedProduct.id_categoria}
                  onChange={handleModalInputChange}
                />
              </Form.Group>
              <Form.Group controlId="modal_id_modelo">
                <Form.Label>ID del Modelo</Form.Label>
                <Form.Control
                  type="number"
                  name="id_modelo"
                  value={selectedProduct.id_modelo}
                  onChange={handleModalInputChange}
                />
              </Form.Group>
              <Form.Group controlId="modal_id_proveedor">
                <Form.Label>ID del Proveedor</Form.Label>
                <Form.Control
                  type="number"
                  name="id_proveedor"
                  value={selectedProduct.id_proveedor}
                  onChange={handleModalInputChange}
                />
              </Form.Group>
              <Form.Group controlId="modal_descuento">
                <Form.Label>Descuento</Form.Label>
                <Form.Control
                  type="number"
                  name="descuento"
                  value={selectedProduct.descuento}
                  onChange={handleModalInputChange}
                />
              </Form.Group>
              <Form.Group controlId="modal_foto_producto">
                <Form.Label>Foto del Producto</Form.Label>
                <Form.Control
                  type="file"
                  name="foto_producto"
                  onChange={handleModalFileChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cerrar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Eliminar
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default Inventory;