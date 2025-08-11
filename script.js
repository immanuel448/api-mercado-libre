// Esperamos que el DOM esté listo (similar a esperar que el formulario de C# esté cargado antes de usarlo)
document.addEventListener("DOMContentLoaded", () => {

  // Obtenemos referencias a elementos HTML usando su ID
  // Esto es como hacer TextBox txtBusqueda = this.FindControl("txtBusqueda"); en C#
  const formulario = document.getElementById("formulario"); // El <form> principal
  const input = document.getElementById("busqueda");        // El <input> de búsqueda
  const resultado = document.getElementById("resultado");   // El <div> donde mostramos los productos

  // Suscribimos un evento al formulario para cuando se envíe
  // En C#: formulario.Submit += async (sender, e) => { ... }
  formulario.addEventListener("submit", async (e) => {

    e.preventDefault(); // Evita que el formulario recargue la página (como un PostBack en ASP.NET)

    const query = input.value.trim(); // Captura el texto de búsqueda y quita espacios al inicio y final
    if (!query) return; // Si está vacío, salimos

    // Mostramos un mensaje temporal mientras se cargan los datos
    resultado.innerHTML = "Buscando productos..."; 

    try {
      // Hacemos la petición HTTP GET a la API pública de Mercado Libre
      // encodeURIComponent(query) evita problemas con espacios o caracteres especiales en la URL
      // "await" es como en C#: espera a que termine la tarea pero sin bloquear la interfaz
      const respuesta = await fetch(`buscar.php?query=${encodeURIComponent(query)}`);


      // Convertimos la respuesta en un objeto JSON (en C# sería como deserializar con JsonConvert)
      const datos = await respuesta.json();

      // Si no hay resultados, mostramos mensaje y salimos
      if (datos.results.length === 0) {
        resultado.innerHTML = "No se encontraron productos.";
        return;
      }

      // Limpiamos el área de resultados antes de mostrar los nuevos
      resultado.innerHTML = "";

      // Recorremos solo los primeros 10 productos encontrados
      // Esto es como un foreach(var producto in datos.results.Take(10)) en C#
      datos.results.slice(0, 10).forEach(producto => {

        // Creamos dinámicamente un <div> en memoria
        const div = document.createElement("div");
        div.classList.add("producto"); // Le asignamos una clase CSS

        // Creamos el HTML interno del producto usando template strings (similar a $"..." en C#)
        div.innerHTML = `
          <h3>${producto.title}</h3>
          <img src="${producto.thumbnail}" alt="${producto.title}" />
          <p>Precio: $${producto.price}</p>
          <a href="${producto.permalink}" target="_blank">Ver en Mercado Libre</a>
        `;

        // Agregamos este <div> al contenedor de resultados
        resultado.appendChild(div);
      });

    } catch (error) {
      // Si ocurre un error (red, API caída, etc.) lo mostramos en la consola y en la página
      console.error("Error al buscar:", error);
      resultado.innerHTML = "Ocurrió un error al buscar.";
    }
  });
});
