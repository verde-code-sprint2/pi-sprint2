const express = require('express');
const { ArduinoData } = require('../serial')
const router = express.Router();
const { executar } = require('../../database/config')
const db = require('../../database/connection');

router.get('/temperature', (request, response, next) => {

    let sum = ArduinoData.ListTemp.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoData.ListTemp.length).toFixed(2);

    response.json({
        data: ArduinoData.ListTemp,
        total: ArduinoData.ListTemp.length,
        average: isNaN(average) ? 0 : average,
    });

});

router.get('/humidity', (request, response, next) => {

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

router.post('/sendData', (request, response) => {
    temperatura = ArduinoData.ListTemp[ArduinoData.ListTemp.length - 1];
    umidade = ArduinoData.List[ArduinoData.List.length - 1];

    let data_agora = new Date()

    var sql = "INSERT INTO medida(temperatura, umidade, momento, fk_aquario) VALUES(?)";
    values = [temperatura, umidade, data_agora, 1];
    db.query(sql, [values], function(err, result){
        if(err) throw err;
        console.log("Medidas inseridas: " + result.affectedRows)
    });
    response.sendStatus(200);
})

module.exports = router;