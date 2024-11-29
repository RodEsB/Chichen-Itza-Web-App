const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todas las zonas
router.get('/', async (req, res) => {
  try {
    const [zonas] = await db.query('SELECT * FROM Zonas');
    res.status(200).json(zonas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las zonas' });
  }
});

// Agregar una nueva zona
router.post('/', async (req, res) => {
  const { nombre, descripcion, nivel } = req.body; // Datos recibidos del cliente
  try {
      if (!nombre || !descripcion || !nivel) {
          return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
      }

      const result = await db.query('INSERT INTO Zonas (nombre, descripcion, nivel) VALUES (?, ?, ?)', [nombre, descripcion, nivel]);
      res.status(201).json({ message: 'Zona agregada con éxito', id: result[0].insertId });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar la zona' });
  }
});

router.delete('/', async (req, res) => {
  const { ids } = req.body; // Lista de IDs recibidos del cliente
  try {
      if (!ids || ids.length === 0) {
          return res.status(400).json({ error: 'No se proporcionaron IDs para eliminar.' });
      }

      await db.query('DELETE FROM Zonas WHERE id IN (?)', [ids]);
      res.status(200).json({ message: 'Zonas eliminadas con éxito.' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar las zonas.' });
  }
});

module.exports = router;
