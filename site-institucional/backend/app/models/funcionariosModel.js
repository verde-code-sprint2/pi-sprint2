var database = require("../../database/config")

function listar(fk_safra) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
      select * from safra_funcionario 
      join safra on fk_safra = id_safra
      join usuario on id_usuario = fk_usuario
      WHERE fk_safra = ${fk_safra};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(fk_safra, fk_usuario) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
  var instrucao = `
    select * from safra_funcionario 
    join safra on fk_safra = id_safra
    join usuario on id_usuario = fk_usuario
    WHERE fk_safra = ${fk_safra};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}


module.exports = {
    listar,
};