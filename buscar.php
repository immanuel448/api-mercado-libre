<?php
// buscar.php

// 1️⃣ Configuramos para devolver siempre JSON
header('Content-Type: application/json; charset=utf-8');

// 2️⃣ Capturamos el parámetro 'query' de la URL
// Ejemplo: buscar.php?query=celulares
$query = isset($_GET['query']) ? trim($_GET['query']) : '';

// 3️⃣ Si no hay búsqueda, devolvemos un JSON vacío y salimos
if ($query === '') {
    echo json_encode([
        "results" => [],
        "error" => "No se recibió término de búsqueda"
    ]);
    exit;
}

// 4️⃣ Armamos la URL de la API de Mercado Libre (México = MLM)
// $url = "https://api.mercadolibre.com/sites/MLM/search?q=" . urlencode($query);
$url = "https://api.mercadolibre.com/sites/MLM/search?q=celulares&limit=5";

// 5️⃣ Obtenemos el contenido de la API (usa file_get_contents, que es como HttpClient.GetStringAsync en C#)
$respuesta = file_get_contents($url);
echo $data;

// 6️⃣ Si hubo error en la petición, devolvemos un JSON con error
if ($respuesta === FALSE) {
    echo json_encode([
        "results" => [],
        "error" => "No se pudo conectar con Mercado Libre"
    ]);
    exit;
}

// 7️⃣ Simplemente devolvemos la respuesta original de Mercado Libre
// (ya es JSON, así que no necesitamos decodificar/volver a codificar)
echo $respuesta;
