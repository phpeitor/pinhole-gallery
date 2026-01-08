<?php
header('Content-Type: application/json; charset=utf-8');

$folder = trim($_GET['folder'] ?? '', '/');

if (str_contains($folder, '..')) {
    http_response_code(400);
    exit;
}

$offset = max(0, (int)($_GET['offset'] ?? 0));
$limit  = min(50, max(1, (int)($_GET['limit'] ?? 10)));

$baseDir   = __DIR__ . '/../img/' . $folder;
$basePath = realpath(__DIR__ . '/../img');
$targetPath = realpath($baseDir);

if (!$targetPath || !str_starts_with($targetPath, $basePath)) {
    http_response_code(403);
    exit;
}

if (!is_dir($baseDir)) {
    echo json_encode([
        "total" => 0,
        "items" => []
    ]);
    exit;
}

/**
 * CACHE GLOBAL DE LA CARPETA (sin paginar)
 */
$cacheFile = $baseDir . '/.meta.json';

if (file_exists($cacheFile)) {
    $allItems = json_decode(file_get_contents($cacheFile), true);
} else {
    $files = glob($baseDir . "/*.{jpg,JPG,jpeg,JPEG,png,PNG}", GLOB_BRACE);
    natsort($files);

    $allItems = [];

    foreach ($files as $filePath) {
        $size = @getimagesize($filePath);
        if (!$size) continue;

        [$width, $height] = $size;

        $allItems[] = [
            "filename" => basename($filePath),
            "width" => $width,
            "height" => $height
        ];
    }

    file_put_contents($cacheFile, json_encode($allItems));
}

$total = count($allItems);
$items = array_slice($allItems, $offset, $limit);

echo json_encode([
    "total" => $total,
    "items" => array_values($items)
]);
