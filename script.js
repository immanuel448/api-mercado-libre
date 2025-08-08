// Esperamos que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    //se crean constantes de elementos del html
  const formulario = document.getElementById("formulario");
  const input = document.getElementById("busqueda");
  const resultado = document.getElementById("resultado");

  // Evento al enviar el formulario
  formulario.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita recargar la página

    const query = input.value.trim(); // Captura el texto de búsqueda
    if (!query) return;

    resultado.innerHTML = "Buscando productos..."; // Mensaje temporal

    try {
      // Llamada a la API pública de Mercado Libre (para México: MLM)
      const respuesta = await fetch(`https://api.mercadolibre.com/sites/MLM/search?q=${encodeURIComponent(query)}`);
      const datos = await respuesta.json();

      // Si no hay resultados
      if (datos.results.length === 0) {
        resultado.innerHTML = "No se encontraron productos.";
        return;
      }

      // Limpiamos y mostramos los productos encontrados
      resultado.innerHTML = "";
      datos.results.slice(0, 10).forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");

        // Estructura del producto
        div.innerHTML = `
          <h3>${producto.title}</h3>
          <img src="${producto.thumbnail}" alt="${producto.title}" />
          <p>Precio: $${producto.price}</p>
          <a href="${producto.permalink}" target="_blank">Ver en Mercado Libre</a>
        `;
        resultado.appendChild(div);
      });

    } catch (error) {
      console.error("Error al buscar:", error);
      resultado.innerHTML = "Ocurrió un error al buscar.";
    }
  });
});
