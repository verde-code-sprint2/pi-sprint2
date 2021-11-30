var express = require("express");
var router = express.Router();

var funcionariosController = require("../controllers/funcionariosController");

router.get("/:fk_safra", function (req, res) {
    funcionariosController.listar(req, res);
});

// router.post("/:fk_safra", function (req, res) {
//   funcionariosController.cadastrar(req, res);
// });

module.exports = router;