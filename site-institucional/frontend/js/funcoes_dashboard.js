window.onload = () => {
    var botoes = document.querySelectorAll('.buttons_cadastro');
    botoes.forEach(button => {
        button.addEventListener('click', () => {
            botoes.forEach(outterButter => {
                document.getElementById(outterButter.getAttribute('div')).classList.remove('show');
            })
            document.getElementById(button.getAttribute('div')).classList.toggle('show');
        }) 
    })
}
function register() {
    content_start.style.display = 'none';
    content_nav.style.display = 'block'
    content_safra.style.display = 'none'
}
function inicio() {
    content_start.style.display = 'block';
    content_lote.style.display = 'none';
    content_nav.style.display = 'none'
    content_safra.style.display = 'none'
}

function lote() {
    content_start.style.display = 'none';
    content_lote.style.display = 'none';
    content_nav.style.display = 'none'
    content_safra.style.display = 'none'
}