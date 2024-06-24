const express = require('express');
const router = express.Router();
const ProductoPedido = require('../models/ProductoPedido');

// Crear un nuevo producto_pedido
router.post('/', async (req, res) => {
    try {
        const id = await ProductoPedido.create(req.body);
        res.status(201).json({ id, ...req.body });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product-order: ' + error.message });
    }
});

// Obtener todos los productos_pedidos
router.get('/', async (req, res) => {
    try {
        const productosPedidos = await ProductoPedido.getAll();
        res.status(200).json(productosPedidos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product-orders: ' + error.message });
    }
});

// Obtener un producto_pedido por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productoPedido = await ProductoPedido.getById(id);
        if (productoPedido) {
            res.status(200).json(productoPedido);
        } else {
            res.status(404).json({ error: 'Product-order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product-order: ' + error.message });
    }
});

// Actualizar un producto_pedido por ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await ProductoPedido.update(id, req.body);
        res.status(200).json({ id, ...req.body });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product-order: ' + error.message });
    }
});

// Eliminar un producto_pedido por ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await ProductoPedido.delete(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product-order: ' + error.message });
    }
});

module.exports = router;