<?php
header('Content-Type: application/json; charset=utf-8');
$folder = trim($_GET['folder'] ?? '', '/');

if (str_contains($folder, '..')) {
    http_response_code(400);
    exit;
}

$baseDir = __DIR__ . '/../img/' . $folder;
$basePath   = realpath(__DIR__ . '/../img');
$targetPath = realpath($baseDir);

if (!$targetPath || !str_starts_with($targetPath, $basePath)) {
    http_response_code(403);
    exit;
}

if (!is_dir($baseDir)) {
    echo json_encode([
        "error" => "Carpeta no encontrada",
        "folder" => $folder
    ]);
    exit;
}

$cacheFile = $baseDir . '/.meta.json';

if (file_exists($cacheFile)) {
    echo file_get_contents($cacheFile);
    exit;
}

$files = glob($baseDir . "/*.{jpg,JPG,jpeg,JPEG,png,PNG}", GLOB_BRACE);
natsort($files);

$result = [];

foreach ($files as $filePath) {
    $filename = basename($filePath);
    $size = @getimagesize($filePath);
    if (!$size) continue;
    [$width, $height] = $size;

    $result[] = [
        "filename" => $filename,
        "width" => $width,
        "height" => $height
    ];
}

$json = json_encode(array_values($result));
file_put_contents($cacheFile, $json);
echo $json;
?>
