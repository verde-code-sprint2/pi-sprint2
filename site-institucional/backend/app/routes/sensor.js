var express = require("express");
var router = express.Router();

var sensorController = require("../controllers/sensorController");

router.get("/", function (req, res) {
    sensorController.testar(req, res);
});

router.get("/listar", function (req, res) {
    sensorController.listar(req, res);
});

router.get("/listar/:idSensor", function (req, res) {
    sensorController.listarPorUsuario(req, res);
});

router.delete("/:idSensor", function (req, res) {
    sensorController.deletar(req, res);
});

router.put("/:idSensor", function (req, res) {
    sensorController.editar(req, res);
});

module.exports = router;