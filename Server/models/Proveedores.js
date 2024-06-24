const pool = require('../db');

const Proveedores = {
  async findAll() {
    console.log('Fetching all providers');
    const [result] = await pool.query('SELECT * FROM proveedores');
    console.log('Result of fetch all query:', result);
    return result;
  },

  async findById(id) {
    console.log(`Fetching provider with ID: ${id}`);
    const [result] = await pool.query('SELECT * FROM proveedores WHERE id_proveedor = ?', [id]);
    console.log(`Result of fetch by ID query:`, result);
    return result[0];
  },

  async create({ nombre, direccion, telefono, correo }) {
    console.log('Creating new provider:', { nombre, direccion, telefono, correo });
    const result = await pool.query(
      'INSERT INTO proveedores (nombre, direccion, telefono, correo) VALUES (?, ?, ?, ?)',
      [nombre, direccion, telefono, correo]
    );
    console.log('Result of create query:', result);
    return result[0].insertId;
  },

  async update(id, { nombre, direccion, telefono, correo }) {
    console.log(`Updating provider with ID: ${id}`, { nombre, direccion, telefono, correo });
    const result = await pool.query(
      'UPDATE proveedores SET nombre = ?, direccion = ?, telefono = ?, correo = ? WHERE id_proveedor = ?',
      [nombre, direccion, telefono, correo, id]
    );
    console.log('Result of update query:', result);
    return result[0].affectedRows;
  },

  async delete(id) {
    console.log(`Deleting provider with ID: ${id}`);
    const result = await pool.query('DELETE FROM proveedores WHERE id_proveedor = ?', [id]);
    console.log('Result of delete query:', result);
    return result[0].affectedRows;
  }
};

module.exports = Proveedores;