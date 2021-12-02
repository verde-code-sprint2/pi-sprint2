var database = require("../../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM lote
        JOIN planta ON lote.fk_planta = planta.id_planta
        JOIN insumo ON insumo.id_insumo = lote.fk_insumo
        JOIN propriedade ON propriedade.id_propriedade = lote.fk_propriedade
        JOIN usuario ON propriedade.fk_usuario = usuario.id_usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
};