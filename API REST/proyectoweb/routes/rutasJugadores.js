var express = require('express');
var router = express.Router();
var ctrlJugadores = require('../Controllers/jugadoresControllers');

router.get('/', ctrlJugadores.devolverTodosLosJugadores); //Devuelve id, nombre, pais, bandera del pais y año de retiro o entrenador de todos los jugadores
router.get('/datosjugador/:id', ctrlJugadores.devolverDatosCompletosJugador); //Devuelve los datos completos de un jugador a partir de su id

router.delete('/eliminarjugadores', ctrlJugadores.eliminarJugadores); //Elimina un conjunto jugadores, cada uno a partir de su respectivo id

router.post('/insertarjugador', ctrlJugadores.insertarJugador); //Inserta un jugador a partir de un JSON

router.put('/actualizarjugador/:id', ctrlJugadores.actualizarJugador); //Realiza actualizaciones en un jugador a partir de su id y de un archivo JSON

module.exports = router;