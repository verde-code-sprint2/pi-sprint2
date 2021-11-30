var sensorModel = require("../models/sensorModel");

function buscarAlertas(req, res) {

    sensorModel.buscarAlertas().then(function (resultado) {
        if (resultado) {
            console.log('resultado')
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    buscarAlertas
};