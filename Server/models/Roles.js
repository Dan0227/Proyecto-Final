const pool = require('../db');

const Roles = {
  async findAll() {
    console.log('Fetching all roles');
    const [result] = await pool.query('SELECT * FROM roles');
    console.log('Result of fetch all query:', result);
    return result;
  },

  async findById(id) {
    console.log(`Fetching role with ID: ${id}`);
    const [result] = await pool.query('SELECT * FROM roles WHERE id_rol = ?', [id]);
    console.log(`Result of fetch by ID query:`, result);
    return result[0];
  },

  async create(nombre) {
    console.log('Creating new role:', { nombre });
    const result = await pool.query('INSERT INTO roles (nombre) VALUES (?)', [nombre]);
    console.log('Result of create query:', result);
    return result[0].insertId;
  },

  async update(id, nombre) {
    console.log(`Updating role with ID: ${id}`, { nombre });
    const result = await pool.query('UPDATE roles SET nombre = ? WHERE id_rol = ?', [nombre, id]);
    console.log('Result of update query:', result);
    return result[0].affectedRows;
  },

  async delete(id) {
    console.log(`Deleting role with ID: ${id}`);
    const result = await pool.query('DELETE FROM roles WHERE id_rol = ?', [id]);
    console.log('Result of delete query:', result);
    return result[0].affectedRows;
  }
};

module.exports = Roles;