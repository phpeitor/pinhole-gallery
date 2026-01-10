<?php
session_start();

if (
    empty($_SESSION['gallery_token']) ||
    $_SESSION['gallery_token']['expires'] < time()
) {
    http_response_code(403);
    exit('Token inválido o expirado');
}

$folder = $_GET['folder'] ?? '';
$folder = trim($folder, '/');

$baseDir = realpath(__DIR__ . '/../img');
$targetDir = realpath($baseDir . '/' . $folder);

if (!$targetDir || strpos($targetDir, $baseDir) !== 0) {
    http_response_code(400);
    exit("Carpeta inválida");
}

$images = glob($targetDir . "/*.{jpg,JPG,jpeg,JPEG,png,PNG}", GLOB_BRACE);

if (!$images) {
    http_response_code(404);
    exit("No hay imágenes");
}

$zipName = basename($folder) . '.zip';
$zipPath = sys_get_temp_dir() . '/' . uniqid('gallery_') . '.zip';

$zip = new ZipArchive();

if ($zip->open($zipPath, ZipArchive::CREATE) !== true) {
    http_response_code(500);
    exit("No se pudo crear el ZIP");
}

foreach ($images as $img) {
    $zip->addFile($img, basename($img));
}

$zip->close();

// Headers de descarga
header('Content-Type: application/zip');
header('Content-Disposition: attachment; filename="' . $zipName . '"');
header('Content-Length: ' . filesize($zipPath));

readfile($zipPath);
unlink($zipPath);
exit;
