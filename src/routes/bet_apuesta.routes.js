const {Router} = require('express');
const router = Router();
const { obtenerTodasApuestas, obtenerApuesta, crearApuesta, actualizarApuesta, eliminarApuesta } = require('../controllers/bet_apuesta.controllers');

router.get('/apuesta/:id_anfitrion', obtenerTodasApuestas);

router.get('/apuesta/:id', obtenerApuesta);
router.post('/apuesta', crearApuesta);
router.put('/apuesta/:id', actualizarApuesta);
router.delete('/apuesta/:id', eliminarApuesta);

module.exports = router;