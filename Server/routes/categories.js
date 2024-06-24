const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Create a new category
router.post('/', async (req, res) => {
  const { nombre } = req.body;
  console.log('POST /api/categories - Request body:', req.body);
  try {
    const categoryId = await Category.create({ nombre });
    console.log('POST /api/categories - Created category ID:', categoryId);
    res.json({ msg: 'Categoría creada exitosamente', categoryId });
  } catch (err) {
    console.error('POST /api/categories - Error:', err.message);
    res.status(500).send('Error en el servidor');
  }
});

// Get all categories
router.get('/', async (req, res) => {
  console.log('GET /api/categories - Fetching all categories');
  try {
    const categories = await Category.findAll();
    console.log('GET /api/categories - Fetched categories:', categories);
    res.json(categories);
  } catch (err) {
    console.error('GET /api/categories - Error:', err.message);
    res.status(500).send('Error en el servidor');
  }
});

// Get a category by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('GET /api/categories/:id - Fetching category with ID:', id);
  try {
    const category = await Category.findById(id);
    if (!category) {
      console.log('GET /api/categories/:id - Category not found');
      return res.status(404).json({ msg: 'Categoría no encontrada' });
    }
    console.log('GET /api/categories/:id - Fetched category:', category);
    res.json(category);
  } catch (err) {
    console.error('GET /api/categories/:id - Error:', err.message);
    res.status(500).send('Error en el servidor');
  }
});

// Update a category by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  console.log('PUT /api/categories/:id - Updating category with ID:', id, 'to name:', nombre);
  try {
    const updated = await Category.update(id, { nombre });
    if (!updated) {
      console.log('PUT /api/categories/:id - Category not found');
      return res.status(404).json({ msg: 'Categoría no encontrada' });
    }
    console.log('PUT /api/categories/:id - Category updated');
    res.json({ msg: 'Categoría actualizada exitosamente' });
  } catch (err) {
    console.error('PUT /api/categories/:id - Error:', err.message);
    res.status(500).send('Error en el servidor');
  }
});

// Delete a category by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('DELETE /api/categories/:id - Deleting category with ID:', id);
  try {
    const deleted = await Category.delete(id);
    if (!deleted) {
      console.log('DELETE /api/categories/:id - Category not found');
      return res.status(404).json({ msg: 'Categoría no encontrada' });
    }
    console.log('DELETE /api/categories/:id - Category deleted');
    res.json({ msg: 'Categoría eliminada exitosamente' });
  } catch (err) {
    console.error('DELETE /api/categories/:id - Error:', err.message);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;