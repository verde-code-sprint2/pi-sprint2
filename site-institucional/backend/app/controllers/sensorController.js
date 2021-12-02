var sensorModel = require("../models/sensorModel");

function listDataByLote(req,res){
    const idLote = req.params.idLote;
    sensorModel.searchDataByLote(idLote).then(function (resultado) {
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

function listLastDataByLote(req,res){
    const idLote = req.params.idLote;
    sensorModel.searchLastDataByLote(idLote).then(function (resultado) {
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
    buscarAlertas,
    listDataByLote,
    listLastDataByLote
};