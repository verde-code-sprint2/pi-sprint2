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

router.get('/weather', async (req,res) => {
    // const { data: weatherData } = await axios.get('https://api.weather.com/v3/wx/conditions/historical/dailysummary/30day?geocode=-23.55%2C-46.63&language=pt-BR&format=json&units=m&apiKey=21d8a80b3d6b444998a80b3d6b1449d3')
    //https://weather.com/pt-BR/clima/mensalmente/l/S%C3%A3o+Paulo+S%C3%A3o+Paulo?canonicalCityId=d7593e91d7e1447404d3a75fc1f7e0513bfcc5bdd74b81f6b4299f68b5689392
    const randomData = Array(365).fill().map((el, i) => {
      return {
        min: (Math.random() * (12 - 8) + 8).toFixed(2), 
        max: (Math.random() * (34 - 15) + 15).toFixed(2),
        preciptation: (Math.random() * 200 + 50).toFixed(2),
      }
    })
    
    // const newData = weatherData.validTimeLocal.map((el, i )=> {
    
    //   return { 
    //     day: new Date(el).toLocaleDateString('pt-BR', { day: 'numeric' }), 
    //     month: new Date(el).toLocaleDateString('pt-BR', {  month: 'long'}), 
    //     year: new Date(el).toLocaleDateString('pt-BR', { year: 'numeric' }), 
    //     min: weatherData.temperatureMin[i] , 
    //     max: weatherData.temperatureMax[i],
    //     preciptation: weatherData.precip24Hour[i]+'mm',
    //     rainHour: weatherData.rain24Hour[i],
    //     // snowHour: weatherData.snow24Hour[i]
    //   }
    // });
  
    // console.table(randomData)
    res.json(randomData)
  })
    
  router.get('/altitude', async (req,res) => {
    
    const { lat, lng } = req.query;
    const response = await axios.get(`https://maps.googleapis.com/maps/api/elevation/json?locations=${lat}%2C${lng}&key=AIzaSyCms5xrwnXKB-6oygcvu7gRBxo_oF4HBl0`)
    res.json(response.data)
  })

module.exports = router;