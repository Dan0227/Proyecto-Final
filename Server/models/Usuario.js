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
      foto_perfil
    } = data;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = contraseña ? await bcrypt.hash(contraseña, salt) : null;

    let query = `
      INSERT INTO usuarios (username, nombre_usuario, apellido_usuario, contraseña, correo_electronico, id_rol, telefono`;

    let values = [username, nombre_usuario, apellido_usuario, hashedPassword, correo_electronico, id_rol, telefono];

    if (direccion_envio !== undefined) {
      query += ', direccion_envio';
      values.push(direccion_envio);
    }

    if (foto_perfil !== undefined) {
      query += ', foto_perfil';
      values.push(foto_perfil);
    }

    query += ') VALUES (?, ?, ?, ?, ?, ?, ?';
    if (direccion_envio !== undefined) {
      query += ', ?';
    }
    if (foto_perfil !== undefined) {
      query += ', ?';
    }
    query += ')';

    const [result] = await pool.query(query, values);

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
      foto_perfil
    } = data;

    let updateQuery = `
      UPDATE usuarios SET
      username = ?, nombre_usuario = ?, apellido_usuario = ?, correo_electronico = ?, id_rol = ?, telefono = ?
    `;

    const updateValues = [username, nombre_usuario, apellido_usuario, correo_electronico, id_rol, telefono];

    if (direccion_envio !== undefined) {
      updateQuery += ', direccion_envio = ?';
      updateValues.push(direccion_envio);
    }

    if (foto_perfil !== undefined) {
      updateQuery += ', foto_perfil = ?';
      updateValues.push(foto_perfil);
    }

    if (contraseña) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(contraseña, salt);
      updateQuery += ', contraseña = ?';
      updateValues.push(hashedPassword);
    }

    updateQuery += ' WHERE id_usuario = ?';
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