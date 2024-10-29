// Cargar datos JSON
async function cargarDatosJSON(url) {
  const respuesta = await fetch(url);
  return await respuesta.json();
}


async function cargarTodosLosDatos() {
  const nombresTorta = await cargarDatosJSON('datos/nombresTorta.json');
  const tiposTorta = await cargarDatosJSON('datos/tiposTorta.json');
  const tiposDeco = await cargarDatosJSON('datos/tiposDeco.json');

  console.log('Nombres Torta:', nombresTorta);
  console.log('Tipos Torta:', tiposTorta);
  console.log('Tipos Deco:', tiposDeco);

 
  inicializarAplicacion(nombresTorta, tiposTorta, tiposDeco);
  
  
  if (window.location.pathname.includes('tipotorta.html')) {
    renderProducto();
  }
}

document.addEventListener('DOMContentLoaded', cargarTodosLosDatos);

