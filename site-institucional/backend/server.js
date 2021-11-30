const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require("path");

const app = express();

process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";
const PORTA = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: '*'
}));


app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.resolve(__dirname,'..',"frontend")));

app.use("/", require("./app/routes/index"));
app.use('/sensors', require('./app/routes/sensor'));
app.use("/usuarios", require("./app/routes/usuarios"));
app.use("/lotes", require("./app/routes/lotes"));
app.use("/safras", require("./app/routes/safras"));
app.use("/funcionarios", require("./app/routes/funcionarios"));
// app.use("/sensor", require("./app/routes/sensor"));

app.listen(PORTA || 3333, function () {
    console.log(`Servidor do site está rodando rodando: http://localhost:${3333} \n
    Você está rodando sua aplicação em ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", banco local (MySQL Workbench). \n
    \t\tSe "producao", banco remoto (SQL Server em nuvem Azure)`);
});

