var funcionariosModel = require("../models/funcionariosModel");

function listBySafra(req, res) {
    const fk_safra = req.params.fk_safra;
    funcionariosModel.listBySafra(fk_safra)
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
  

function list(req, res) {
  funcionariosModel.list()
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
  const n_lote = req.body.n_lote;
  const hectares = req.body.hectares;
  const altitude = req.body.altitude; 
  const fk_propriedade = req.body.fk_propriedade; 
  const fk_planta = req.body.fk_planta; 
  const fk_insumo = req.body.fk_insumo; 


  if (nome == undefined) {
      res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
      res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
      res.status(400).send("Sua senha está undefined!");
  } else {
      
    funcionariosModel.cadastrar()
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
 
    list,
    listBySafra
 
}