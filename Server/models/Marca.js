const pool = require('../db');

const Marca = {
  async findAll() {
    console.log('Fetching all brands');
    const [rows] = await pool.query('SELECT * FROM marcas');
    console.log('Fetched brands:', rows);
    return rows;
  },

  async findById(id) {
    console.log('Fetching brand with ID:', id);
    const [rows] = await pool.query('SELECT * FROM marcas WHERE id_marca = ?', [id]);
    if (rows.length === 0) {
      console.log('Brand not found');
      return null;
    }
    console.log('Fetched brand:', rows[0]);
    return rows[0];
  },

  async create({ nombre }) {
    console.log('Creating brand with name:', nombre);
    const result = await pool.query('INSERT INTO marcas (nombre) VALUES (?)', [nombre]);
    console.log('Created brand ID:', result[0].insertId);
    return result[0].insertId;
  },

  async update(id, { nombre }) {
    console.log('Updating brand with ID:', id, 'to name:', nombre);
    const result = await pool.query('UPDATE marcas SET nombre = ? WHERE id_marca = ?', [nombre, id]);
    const updated = result[0].affectedRows > 0;
    if (!updated) {
      console.log('Brand not found');
    }
    console.log('Brand updated');
    return updated;
  },

  async delete(id) {
    console.log('Deleting brand with ID:', id);
    const result = await pool.query('DELETE FROM marcas WHERE id_marca = ?', [id]);
    const deleted = result[0].affectedRows > 0;
    if (!deleted) {
      console.log('Brand not found');
    }
    console.log('Brand deleted');
    return deleted;
  }
};

module.exports = Marca;