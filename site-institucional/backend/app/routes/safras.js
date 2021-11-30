var express = require("express");
var router = express.Router();

var safraController = require("../controllers/safraController");

router.get("/", function (req, res) {
    safraController.listar(req, res);
});

router.post("/", function (req, res) {
  safraController.cadastrar(req, res);
});


module.exports = router;