var database = require("../../database/config");

function searchLastDataByLote(idLote){
    const query = 
    `
    SELECT *,
    (SELECT ROUND(AVG(temperatura),2) from sensorlogs)  as avgTemp,
     (SELECT ROUND(AVG(umidade),2)  from sensorlogs) as avgUmidade
     from sensorlogs 
     join sensores on sensores.id_sensores = sensorlogs.fk_sensores 
     join lote on sensores.fk_lote = lote.id_lote
     where lote.id_lote = ${idLote} order by data_sensor desc LIMIT 1; 
    `

    return database.executar(query);
}

function searchDataByLote(idLote){
    const query = 
    `
    select *, 
        (SELECT ROUND(AVG(temperatura),2) from sensorlogs)  as 'avgTemp',
        (SELECT ROUND(AVG(umidade),2)  from sensorlogs) as 'avgUmidade'
        from sensorlogs 
        join sensores on sensores.id_sensores = sensorlogs.fk_sensores 
        join lote on sensores.fk_lote = lote.id_lote
        where lote.id_lote = ${idLote} order by data_sensor desc LIMIT 5;  
    `

    return database.executar(query);
}

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
    searchDataByLote,
    searchLastDataByLote
    // buscarMedidasEmTempoReal
}