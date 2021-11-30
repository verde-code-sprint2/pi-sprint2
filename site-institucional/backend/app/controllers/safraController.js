const safraModel = require("../models/safraModel");

function listar(req, res) {
  safraModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function cadastrar(req, res) {
    const qtd_plantio = req.body.qtd_plantio;
    const dataPlantio = req.body.dataPlantio;
    const dataColheita = req.body.dataColheita;
    const fk_lote = req.params.fk_lote;

    if (qtd_plantio == undefined) {
        res.status(400).send("Sua qtd de plantio está undefined!");
    } else if (dataPlantio == undefined) {
        res.status(400).send("Sua data de plantio está undefined!");
    } else if (dataColheita == undefined) {
        res.status(400).send("Sua data da colheita está undefined!");
    } else if (fk_lote == undefined) {
      res.status(400).send("Seu lote está undefined!");
    } else {
        
      safraModel.cadastrar(qtd_plantio,dataPlantio,dataColheita,fk_lote)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
 
    cadastrar,
    listar,
   
}