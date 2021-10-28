const sensors = require('./sensors')
const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;

class ArduinoRead {

    constructor() {
        this.listData = [];
        this.__listDataTemp = [];
    }

    get List() {
        return this.listData;
    }


    fake_data() {
        setInterval(() => {
        
            //let data_float = sensors.lm35(-2, 3); <= Retorna os dados do sensor lm35
            let data_float = sensors.dht11({minHum:50, maxHum:100, minTemp: 12, maxTemp: 30})//<= Retorna os dados do sensor  dht11

            if (this.listData.length === 59) {
                // let sum = this.listData.reduce((a, b) => a + b, 0);
                // this.listDataHour.push((sum / this.listData.length).toFixed(2));
                while (this.listData.length > 0) {
                    this.listData.pop();
                } 
            }
            // console.log('Data', data_float);
            this.listData.push(data_float);
        }, 1000);
    }


    SetConnection() {

        SerialPort.list().then(listSerialDevices => {

            let listArduinoSerial = listSerialDevices.filter(serialDevice => {
                return serialDevice.vendorId == 2341 && serialDevice.productId == 43;
            });

            if (listArduinoSerial.length != 1) {
                this.fake_data();
                console.log("Arduino not found - Generating data");
            } else {
                console.log("Arduino found in the com %s", listArduinoSerial[0].comName);
                return listArduinoSerial[0].comName;
            }
        }).then(comName => {
            try {
                let arduino = new SerialPort(comName, { baudRate: 9600 });

                const parser = new Readline();
                arduino.pipe(parser);
                arduino.on('close',() => {
                    console.log('Lost Connection');
                    this.fake_data();
                });
                parser.on('data', (data) => {
                    // console.log('data', data)
                    // console.log('data',data.split(' - ').map(Number))
                    this.listData.push(data.split(' - ').map(Number));
                });
            } catch (e) {
                this.fake_data();
            }

        }).catch(error => console.log(error));
    }
}

const serial = new ArduinoRead();
serial.SetConnection();

module.exports.ArduinoDataTemp = { List: serial.List}