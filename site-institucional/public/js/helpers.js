// const client = new ApiClient(process.env.API_KEY);
const maskCNPJ = (value , id) => {
  var x = value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
  id.value = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '');
}
const maskCPF = value => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

// (00) 00000-0000
const maskPhone = value => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{4})(\d)/, "$1-$2");
};

// 00000-000
const maskCEP = (value, element) => {
  if(value.length >= 7){
    searchAlt(value)
  }
  element.value= value.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+?$/, "$1-$2");
};

// 00/00/0000
const maskDate = value => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1");
};

// Aceita apenas que letras sejam digitadas
const maskOnlyLetters = value => {
  return value.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, "");
};

// Aceita apenas números
const maskOnlyNumbers = value => {
  return value.replace(/\D/g, "");
};

const searchCEP = (value) => {
  fetch(`https://viacep.com.br/ws/${value.replace("-","")}/json/`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  }).then(async response => {
    const res = await response.json();
    document.getElementById("txtLogradouro").value = res.logradouro;
    document.getElementById("txtBairro").value = res.bairro;
    searchAlt(value)
    }
  )
}

const searchAlt = async (value) => {
  const dataAddress = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${value.replace("-","")}&key=AIzaSyCms5xrwnXKB-6oygcvu7gRBxo_oF4HBl0`, {
    method: 'GET',
  })

  const dataAddressParsed = await dataAddress.json();
  
  document.getElementById("txtLogradouro").value = dataAddressParsed.results[0].address_components[1].short_name;
  document.getElementById("txtBairro").value = dataAddressParsed.results[0].address_components[2].short_name;

  const { lat, lng } = dataAddressParsed.results[0].geometry.location;
  const dataAlt = await 
  fetch(`http://localhost:3000/api/altitude?`+ new URLSearchParams({
    lat,
    lng,
  }).toString(),{
    method: 'GET',
  }
  );

  const dataAltParsed = await dataAlt.json();

  document.getElementById("txtAltitude").value = dataAltParsed.results[0].elevation.toFixed()
  
}