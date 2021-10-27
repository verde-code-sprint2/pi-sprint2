const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/weather', async (req,res) => {
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
  
app.get('/altitude', async (req,res) => {
  const { lat, lng } = req.query;
  const response = await axios.get(`https://maps.googleapis.com/maps/api/elevation/json?locations=${lat}%2C${lng}&key=AIzaSyCms5xrwnXKB-6oygcvu7gRBxo_oF4HBl0`)
  res.json(response.data)
})

app.use('/api', require('./app/controller'));

app.use(express.static('./public'))

const server = app.listen(3000);
console.log("Express started at port", server.address().port);