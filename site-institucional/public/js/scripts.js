function redirectTo(directory) {
  const location = {
    index: 'index.html',
    sobre: 'sobre.html'
  }

  const {
    host
  } = window.location;
  console.log('directory', directory);
  console.log("winwod.location", window.location)
  console.log('location[directory]', location[directory])
  window.location.href = 'http://127.0.0.1:5500/PI/HTML/projetos/AGROTIS/pagina-institucional/'+location[directory]
}