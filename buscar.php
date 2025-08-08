<?php
// Permitir acceso desde cualquier origen (evita errores de CORS)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Validar si se recibió un parámetro 'query' por GET (ej: ?query=celulares)
if (!isset($_GET['query']) || empty($_GET['query'])) {
    echo json_encode(["error" => "Falta el parámetro 'query'"]);
    exit;
}

// Obtener lo que el usuario escribió en la búsqueda
$busqueda = urlencode($_GET['query']); // Codifica espacios, tildes, etc.

// URL base de la API de Mercado Libre México (MLM)
$url = "https://api.mercadolibre.com/sites/MLM/search?q=$busqueda";

// Inicializa cURL (una herramienta de PHP para hacer peticiones HTTP)
$ch = curl_init();

// Configurar cURL: URL, devolver resultado como string, y timeout
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10); // segundos

// Ejecutar la petición y guardar la respuesta
$respuesta = curl_exec($ch);

// Verificar si hubo error al conectarse
if ($respuesta === false) {
    echo json_encode(["error" => "Error al conectar con la API de Mercado Libre"]);
    curl_close($ch);
    exit;
}

// Cerrar cURL
curl_close($ch);

// Enviar la respuesta original (JSON) al navegador
echo $respuesta;
?>
