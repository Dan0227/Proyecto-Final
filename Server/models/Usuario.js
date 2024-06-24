const pool = require('../db');
const bcrypt = require('bcryptjs');

const Usuario = {
  async create(data) {
    const {
      username,
      nombre_usuario,
      apellido_usuario,
      contraseña,
      correo_electronico,
      id_rol,
      telefono,
      direccion_envio,
      foto_perfil,
    } = data;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    const [result] = await pool.query(
      `INSERT INTO usuarios (username, nombre_usuario, apellido_usuario, contraseña, correo_electronico, id_rol, telefono, direccion_envio, foto_perfil) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [username, nombre_usuario, apellido_usuario, hashedPassword, correo_electronico, id_rol, telefono, direccion_envio, foto_perfil]
    );

    return result.insertId;
  },

  async getAll() {
    const [results] = await pool.query('SELECT * FROM usuarios');
    return results;
  },

  async getById(id) {
    const [results] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
    return results[0];
  },

  async updateById(id, data) {
    const {
      username,
      nombre_usuario,
      apellido_usuario,
      contraseña,
      correo_electronico,
      id_rol,
      telefono,
      direccion_envio,
      foto_perfil,
    } = data;

    let updateQuery = `UPDATE usuarios SET username = ?, nombre_usuario = ?, apellido_usuario = ?, correo_electronico = ?, id_rol = ?, telefono = ?, direccion_envio = ?, foto_perfil = ?`;
    const updateValues = [username, nombre_usuario, apellido_usuario, correo_electronico, id_rol, telefono, direccion_envio, foto_perfil];

    if (contraseña) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(contraseña, salt);
      updateQuery += `, contraseña = ?`;
      updateValues.push(hashedPassword);
    }

    updateQuery += ` WHERE id_usuario = ?`;
    updateValues.push(id);

    const [result] = await pool.query(updateQuery, updateValues);
    return result.affectedRows;
  },

  async deleteById(id) {
    const [result] = await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
    return result.affectedRows;
  },

  async getUserByEmail(email) {
    const [results] = await pool.query('SELECT * FROM usuarios WHERE correo_electronico = ?', [email]);
    return results[0];
  },

  async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
};

module.exports = Usuario;