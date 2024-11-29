const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los participantes
router.get('/', async (req, res) => {
  try {
    const [participantes] = await db.query('SELECT * FROM Participantes');
    res.status(200).json(participantes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los participantes' });
  }
});

// Agregar un nuevo participante
router.post('/', async (req, res) => {
  const { nombre, rol } = req.body; // Datos recibidos del cliente
  try {
    if (!nombre || !rol) {
      return res.status(400).json({ error: 'El nombre y el rol son obligatorios.' });
    }

    const result = await db.query('INSERT INTO Participantes (nombre, rol) VALUES (?, ?)', [nombre, rol]);
    res.status(201).json({ message: 'Participante agregado con éxito', id: result[0].insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el participante' });
  }
});

// Eliminar participantes seleccionados
router.delete('/', async (req, res) => {
  const { ids } = req.body; // Lista de IDs recibidos del cliente
  try {
    if (!ids || ids.length === 0) {
      return res.status(400).json({ error: 'No se proporcionaron IDs para eliminar.' });
    }

    await db.query('DELETE FROM Participantes WHERE id IN (?)', [ids]);
    res.status(200).json({ message: 'Participantes eliminados con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar los participantes.' });
  }
});

module.exports = router;
