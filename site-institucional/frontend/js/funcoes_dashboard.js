const { text } = require("body-parser");

function register() {
    content_start.style.display = 'none';
    content_lote.style.display = 'block';
    content_nav.style.display = 'block'
    content_safra.style.display = 'none'
}
function inicio() {
    content_start.style.display = 'block';
    content_lote.style.display = 'none';
    content_nav.style.display = 'none'
    content_safra.style.display = 'none'
}

function reg_lote() {
    content_start.style.display = 'none';
    content_lote.style.display = 'block';
    content_safra.style.display = 'none'

}

function reg_safra() {
    content_start.style.display = 'none';
    content_lote.style.display = 'none';
    content_safra.style.display = 'block'
}

function reg_insumo() {
    content_start.style.display = 'none';
    content_lote.style.display = 'none';
    content_safra.style.display = 'none'
}

function reg_planta() {
    content_start.style.display = 'none';
    content_lote.style.display = 'none';
    content_safra.style.display = 'none'
}