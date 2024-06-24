const pool = require('../db');

const Modelos = {
  async findAll() {
    console.log('Fetching all models');
    const [result] = await pool.query('SELECT * FROM modelos');
    console.log('Result of fetch all query:', result);
    return result;
  },

  async findById(id) {
    console.log(`Fetching model with ID: ${id}`);
    const [result] = await pool.query('SELECT * FROM modelos WHERE id_modelo = ?', [id]);
    console.log(`Result of fetch by ID query:`, result);
    return result[0];
  },

  async create({ id_marca, nombre, año }) {
    console.log('Creating new model:', { id_marca, nombre, año });
    const result = await pool.query(
      'INSERT INTO modelos (id_marca, nombre, año) VALUES (?, ?, ?)',
      [id_marca, nombre, año]
    );
    console.log('Result of create query:', result);
    return result[0].insertId;
  },

  async update(id, { id_marca, nombre, año }) {
    console.log(`Updating model with ID: ${id}`, { id_marca, nombre, año });
    const result = await pool.query(
      'UPDATE modelos SET id_marca = ?, nombre = ?, año = ? WHERE id_modelo = ?',
      [id_marca, nombre, año, id]
    );
    console.log('Result of update query:', result);
    return result[0].affectedRows;
  },

  async delete(id) {
    console.log(`Deleting model with ID: ${id}`);
    const result = await pool.query('DELETE FROM modelos WHERE id_modelo = ?', [id]);
    console.log('Result of delete query:', result);
    return result[0].affectedRows;
  }
};

module.exports = Modelos;