const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware

app.use(cors()); // Usar cors
app.use(bodyParser.json());

app.use('/api/categories', require('./routes/categories'));
app.use('/api/marcas', require('./routes/marcas'));
app.use('/api/modelos', require('./routes/modelos'));
app.use('/api/pedidos', require('./routes/pedidos'));
app.use('/api/productos_pedidos', require('./routes/productoPedido'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/proveedores', require('./routes/proveedores'));
app.use('/api/roles', require('./routes/roles'));
app.use('/api/usuarios', require('./routes/usuarios'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});