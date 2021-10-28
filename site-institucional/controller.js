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
        alertas
    });

});

router.get('/', (request, response) => {

    let sumTemp = ArduinoDataTemp.List.reduce((total, b) => total + b[1], 0);
    let averageTemp = (sumTemp / ArduinoDataTemp.List.length).toFixed(2);

    let sumMoisture = ArduinoDataTemp.List.reduce((a, b) => a + b[0], 0);
    let averageMoisture = (sumMoisture / ArduinoDataTemp.List.length).toFixed();

    const alertasTemp = []
    const alertasUmidade = []
    // [[80,23],[90,24],[85,22]]
    ArduinoDataTemp.List.forEach(data => {
        if (data[0] < 80) {
            alertasUmidade.push('Alerta de umidade baixa - nivel em '+ data[0] + new Date().toLocaleDateString('pt-BR', { hour: 'numeric', minute: 'numeric', second: 'numeric' }))
        }
        
        if (data[1] < 18) {
            alertasTemp.push('Alerta de temperatura baixa - ' + data[1].toFixed()+'°C '+ new Date().toLocaleDateString('pt-BR', { hour: 'numeric', minute: 'numeric', second: 'numeric' }))
        } else if (data[1] > 22) {
            alertasTemp.push('Alerta de temperatura alta - ' + data[1].toFixed()+'°C '+ new Date().toLocaleDateString('pt-BR', { hour: 'numeric', minute: 'numeric', second: 'numeric' }))
        }
    })
    response.json({
        data: ArduinoDataTemp.List,
        total: ArduinoDataTemp.List.length,
        averageTemp: isNaN(averageTemp) ? 0 : averageTemp,
        averageMoisture: isNaN(averageMoisture) ? 0 : averageMoisture,
        //altitude: (Math.random() * 100 + 800).toFixed()
        altitude: 842,
        alertasTemp: alertasTemp.slice(-5),
        alertasUmidade: alertasUmidade.slice(-5)
    });

});

module.exports = router;