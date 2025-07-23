const {Router} = require('express');
const router = Router();
const { obtenerPartidosPorFecha } = require('../controllers/bet_partido.controllers');

router.get('/partidos/:fecha', obtenerPartidosPorFecha);


module.exports = router;