const express = require('express');
const { ArduinoData } = require('../serial');
const router = express.Router();
const database = require('../../database/config');
const sensorController = require('../controllers/sensorController')

router.get('/alertas', (req, res) => {
    sensorController.buscarAlertas(req, res)
})

router.get('/temperature', (request, response) => {

    let sum = ArduinoData.ListTemp.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoData.ListTemp.length).toFixed(2);

    response.json({
        data: ArduinoData.ListTemp,
        total: ArduinoData.ListTemp.length,
        average: isNaN(average) ? 0 : average,
    });

});

router.get('/humidity', (request, response) => {

    let sum = ArduinoData.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoData.List.length).toFixed(2);

    response.json({
        data: ArduinoData.List,
        total: ArduinoData.List.length,
        average: isNaN(average) ? 0 : average,
    });

});

router.get('/allData', (req, res) => {
    let sumHumidity = ArduinoData.List.reduce((a, b) => a + b, 0);
    let averageHumidity = (sumHumidity / ArduinoData.List.length).toFixed(2);

    let sumTemp = ArduinoData.ListTemp.reduce((a, b) => a + b, 0);
    let averageTemp = (sumTemp / ArduinoData.ListTemp.length).toFixed(2);

    res.json({
        dataTemp: ArduinoData.ListTemp,
        dataHumidity: ArduinoData.List,
        totalHumidity: ArduinoData.List.length,
        totalTemp: ArduinoData.ListTemp.length,
        averageTemp: isNaN(averageTemp) ? 0 : averageTemp,
        averageHumidity: isNaN(averageHumidity) ? 0 : averageHumidity,
    })
})


setInterval(() => {
    fk_sensor = 50;
    temperatura = ArduinoData.ListTemp[ArduinoData.ListTemp.length - 1];
    umidade = ArduinoData.List[ArduinoData.List.length - 1];

    var sql =   `
    insert into sensorlogs values 
        (null,now(),${umidade},${temperatura},${fk_sensor});
    `;

    if(umidade < 20){
        instrucao1 = 
        `
        INSERT INTO alertas VALUES (null, ${fk_sensor}, now(), ${umidade}, ${temperatura}, 'umidade');
        `;
        database.executar(instrucao1).then(resposta => {
            console.log("Alerta de umidade inserido", umidade)
        }).catch(err => {
            console.log('ERRO NA INSERÇÃO NA INSTRUÇÃO\n' + instrucao1 + '\n' + err)
        })
    }

    if(temperatura < 18 || temperatura > 26){
        instrucao2 = `
        INSERT INTO alertas VALUES (null, ${fk_sensor}, now(), ${umidade}, ${temperatura}, 'temperatura');
        `;

        database.executar(instrucao2).then(resposta => {
            console.log("Alerta de temperatura inserido", temperatura)
        }).catch(err => {
            console.log('ERRO NA INSERÇÃO NA INSTRUÇÃO\n' + instrucao2 + '\n' + err)
        })
    }

    console.log('EXECUTANDO A INSTRUÇÃO:\n' + sql)
    
    database.executar(sql).then(resposta => {
        console.log("Medidas inseridas", resposta.affectedRows)
    }).catch(err => {
        console.log('ERRO NA INSERÇÃO' + err)
    })
}, 2000)



module.exports = router;