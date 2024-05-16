var mongoose = require( 'mongoose');
var Schema = mongoose.Schema;
var jugadorSchema = new Schema({
nombre: String,
nacimiento: {d: Number, m: Number, a: Number},
pais: String,
bandera_pais: String,
titulos_individuales: Number,
entrenador: String,
retiro: Number,
titulos_gs_individuales: {ao: [Number], rg: [Number], wi: [Number], uo: [Number]},
mejor_ranking_individual: Number,
imagen_jugador: String
});

module.exports = jugadorSchema;
