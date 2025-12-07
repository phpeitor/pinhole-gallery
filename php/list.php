<?php
header('Content-Type: application/json; charset=utf-8');
$folder = $_GET['folder'] ?? '';
$baseDir = __DIR__ . '/../img/' . $folder;

if (!is_dir($baseDir)) {
    echo json_encode([
        "error" => "Carpeta no encontrada",
        "folder" => $folder
    ]);
    exit;
}

$files = glob($baseDir . "/*.{jpg,JPG,jpeg,JPEG,png,PNG}", GLOB_BRACE);
natsort($files);

$result = [];

foreach ($files as $filePath) {
    $filename = basename($filePath);
    [$width, $height] = getimagesize($filePath);

    $result[] = [
        "filename" => $filename,
        "width" => $width,
        "height" => $height
    ];
}

echo json_encode(array_values($result));
?>
