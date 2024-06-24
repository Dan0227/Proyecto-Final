const express = require('express');
const Productos = require('../models/Productos');

const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Productos.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Obtener producto por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Productos.findById(id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Error fetching product' });
  }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  const { nombre, descripcion, precio, stock, id_categoria, id_modelo, id_proveedor, descuento, foto_producto } = req.body;
  try {
    const id = await Productos.create({ nombre, descripcion, precio, stock, id_categoria, id_modelo, id_proveedor, descuento, foto_producto });
    res.status(201).json({ id });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error creating product' });
  }
});

// Actualizar un producto por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock, id_categoria, id_modelo, id_proveedor, descuento, foto_producto } = req.body;
  try {
    const affectedRows = await Productos.update(id, { nombre, descripcion, precio, stock, id_categoria, id_modelo, id_proveedor, descuento, foto_producto });
    if (affectedRows === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json({ message: 'Product updated successfully' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error updating product' });
  }
});

// Eliminar un producto por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await Productos.delete(id);
    if (affectedRows === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json({ message: 'Product deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
});

module.exports = router;