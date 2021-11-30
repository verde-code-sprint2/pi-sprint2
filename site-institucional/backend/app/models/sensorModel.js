var database = require("../../database/config");

async function buscarAlertas(fk_sensor = 50) {
    instrucaoSql = `
    SELECT * FROM alertas where typeAlert = 'umidade' ORDER BY dataAlerta desc LIMIT 5;
    `;
    instrucaoSql2 = `
    SELECT * FROM alertas where typeAlert = 'temperatura' ORDER BY dataAlerta desc LIMIT 5;
    `
    console.log("Executando as instruções SQL: \n" + instrucaoSql, instrucaoSql2);
    var alertasUmidade = await database.executar(instrucaoSql);
    var alertasTemperatura = await database.executar(instrucaoSql2);

    return { alertasUmidade, alertasTemperatura }
}

// function buscarMedidasEmTempoReal(idAquario) {
//     instrucaoSql = `select 
//                         temperatura, 
//                         umidade, DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
//                         fk_aquario 
//                         from medida where fk_aquario = ${idAquario} 
//                     order by id desc limit 1`;

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }


module.exports = {
    buscarAlertas,
    // buscarMedidasEmTempoReal
}