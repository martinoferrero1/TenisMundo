const dbName = 'test';
const uri = 'mongodb://Martino:facultadcl321@127.0.0.1:27017/' + dbName;

var mongoose = require('mongoose');
var jugadorSchema = require('../esquema');

const Jugador = mongoose.model('Jugador', jugadorSchema);

//----------------FUNCION PARA EL PUT----------------

async function actualizarJugador(req, res) {
    await mongoose.connect(uri);
    try {
        const id = req.params.id;
        await Jugador.replaceOne({_id : id}, req.body);
        res.json('Se ha actualizado 1 jugador');
    }
    catch (err) {
        res.json(err.message);
    }
    await mongoose.connection.close();
}

//----------------FUNCION PARA EL POST----------------

async function insertarJugador(req, res) {
    await mongoose.connect(uri);
    try {
        nuevo_jugador = new Jugador(req.body);
        await nuevo_jugador.save();
        res.json('Se han insertado los jugadores');
    }
    catch (err) {
        res.json(err.message);
    }
    await mongoose.connection.close();
}

//----------------FUNCION PARA EL DELETE----------------

async function eliminarJugadores(req, res) {
    await mongoose.connect(uri);
    try {
        const id_jugadores = req.body;
        const resultado = await Jugador.deleteMany({_id: {$in: id_jugadores}});
        const cantidad_eliminados = resultado.deletedCount;
        if (cantidad_eliminados > 1) {
            res.json('Se han eliminado ' + cantidad_eliminados + ' jugadores');
        }
        else if (cantidad_eliminados == 1) {
            res.json('Se ha eliminado 1 jugador');
        }
        else {
            res.json('No se ha encontrado ningun jugador con alguno de los id indicados');
        }
    }
    catch (err) {
        res.json(err.message);
    }
    await mongoose.connection.close();
}

//----------------FUNCIONES PARA LOS GET----------------

async function devolverTodosLosJugadores(req, res) {
    await mongoose.connect(uri);
    try {
        const resultado = await Jugador.find({}, 'nombre pais bandera_pais retiro entrenador');
        res.json(resultado);
    }
    catch (err) {
        res.json(err.message);
    }
    await mongoose.connection.close();
}
async function devolverDatosCompletosJugador(req, res) {
    await mongoose.connect(uri);
    try {
        const id = req.params.id;
        const query = {_id: id};
        const resultado = await Jugador.findOne(query);
        res.json(resultado);
    }
    catch (err) {
        res.json(err.message);
    }
    await mongoose.connection.close();
}

module.exports = {
    devolverTodosLosJugadores,
    devolverDatosCompletosJugador,
    eliminarJugadores,
    insertarJugador,
    actualizarJugador
}

