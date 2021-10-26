const express = require('express');
const { ArduinoDataTemp } = require('./newserial')
const router = express.Router();


router.get('/lm35', (request, response, next) => {

    let sum = ArduinoDataTemp.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoDataTemp.List.length).toFixed(2);

    response.json({
        data: ArduinoDataTemp.List,
        total: ArduinoDataTemp.List.length,
        average: isNaN(average) ? 0 : average,
    });

});

router.get('/', (request, response) => {

    let sumTemp = ArduinoDataTemp.List.reduce((a, b) => a + b[1], 0);
    let averageTemp = (sumTemp / ArduinoDataTemp.List.length).toFixed(2);

    let sumMoisture = ArduinoDataTemp.List.reduce((a, b) => a + b[0], 0);
    let averageMoisture = (sumMoisture / ArduinoDataTemp.List.length).toFixed();

    response.json({
        data: ArduinoDataTemp.List,
        total: ArduinoDataTemp.List.length,
        averageTemp: isNaN(averageTemp) ? 0 : averageTemp,
        averageMoisture: isNaN(averageMoisture) ? 0 : averageMoisture,
        //altitude: (Math.random() * 100 + 800).toFixed()
        altitude: 842
    });

});

module.exports = router;