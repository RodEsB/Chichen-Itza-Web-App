const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const zonasRouter = require('./routes/zonas.router');
const participantesRouter = require('./routes/participantes.router');

//const recorridosRoutes = require('./routes/recorridos');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Configurar la carpeta estática
app.use(express.static(path.join(__dirname, '../public')));

// Redirigir '/' a 'HOME.html'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/HTML/HOME.html'));
});

// Rutas de la API
//app.use('/api/recorridos', recorridosRoutes);

// Routes
app.use('/api/zonas', zonasRouter);
app.use('/api/participantes', participantesRouter);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
