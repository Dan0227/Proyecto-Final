const express = require('express');
const router = express.Router();
const TipoDoc = require('../models/TipoDoc');

// Crear un nuevo tipo de documento
router.post('/', async (req, res) => {
    try {
        const { nombre } = req.body;
        const id = await TipoDoc.create(nombre);
        res.status(201).json({ id, nombre });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener todos los tipos de documento
router.get('/', async (req, res) => {
    try {
        const tiposDoc = await TipoDoc.getAll();
        res.status(200).json(tiposDoc);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un tipo de documento por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tipoDoc = await TipoDoc.getById(id);
        if (tipoDoc) {
            res.status(200).json(tipoDoc);
        } else {
            res.status(404).json({ error: 'Tipo de documento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un tipo de documento por ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        await TipoDoc.update(id, nombre);
        res.status(200).json({ id, nombre });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un tipo de documento por ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await TipoDoc.delete(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;