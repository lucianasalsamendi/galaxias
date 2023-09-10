document.addEventListener("DOMContentLoaded", function () {
    const inputBuscar = document.getElementById("inputBuscar");
    const btnBuscar = document.getElementById("btnBuscar");
    const contenedor = document.getElementById("contenedor");
  
    btnBuscar.addEventListener("click", function () {
      const busqueda = inputBuscar.value;
      if (busqueda) {
        buscarImagenesNASA(busqueda);
      }
    });
  
    function buscarImagenesNASA(query) {
      const url = `https://images-api.nasa.gov/search?q=${query}`;
  
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          mostrarResultados(data);
        })
        .catch((error) => {
          console.error("Error al buscar imágenes: ", error);
        });
    }
  
    function mostrarResultados(data) {
      contenedor.innerHTML = ""; // Limpiamos el contenido anterior
  
      if (data.collection && data.collection.items) {
        data.collection.items.forEach((item) => {
          if (item.links && item.data) {
            const imagen = item.links[0].href;
            const titulo = item.data[0].title;
            const descripcion = item.data[0].description || "Sin descripción";
            const fecha = item.data[0].date_created || "Fecha desconocida";
  
            const resultadoHTML = `
              <div class="card mb-3">
                <img src="${imagen}" class="card-img-top" alt="${titulo}">
                <div class="card-body">
                  <h5 class="card-title">${titulo}</h5>
                  <p class="card-text">${descripcion}</p>
                  <p class="card-text"><small class="text-muted">Fecha: ${fecha}</small></p>
                </div>
              </div>
            `;
  
            contenedor.insertAdjacentHTML("beforeend", resultadoHTML);
          }
        });
      } else {
        contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
      }
    }
  });
  