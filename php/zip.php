<?php
declare(strict_types=1);

if (session_status() !== PHP_SESSION_ACTIVE) {
  session_start();
}

if (
  empty($_SESSION['gallery_token']) ||
  $_SESSION['gallery_token']['expires'] < time()
) {
  http_response_code(401);
  exit('Token invalido o expirado');
}

$folder = trim((string)($_GET['folder'] ?? ''), '/');
if ($folder === '' || str_contains($folder, '..')) {
  http_response_code(400);
  exit('Carpeta invalida');
}

$baseDir = realpath(__DIR__ . '/../img');
$targetDir = $baseDir ? realpath($baseDir . DIRECTORY_SEPARATOR . $folder) : false;

if (!$baseDir || !$targetDir || !is_dir($targetDir) || !str_starts_with($targetDir, $baseDir)) {
  http_response_code(403);
  exit('Carpeta bloqueada');
}

$images = glob($targetDir . '/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}', GLOB_BRACE) ?: [];
natsort($images);

if (count($images) === 0) {
  http_response_code(404);
  exit('No hay imagenes');
}

$safeName = preg_replace('/[^a-zA-Z0-9_-]+/', '-', basename($folder));
$zipName = trim((string)$safeName, '-') ?: 'gallery';
$zipName .= '.zip';
$zipPath = tempnam(sys_get_temp_dir(), 'gallery_');

if (!$zipPath) {
  http_response_code(500);
  exit('No se pudo crear archivo temporal');
}

$zip = new ZipArchive();
if ($zip->open($zipPath, ZipArchive::OVERWRITE) !== true) {
  @unlink($zipPath);
  http_response_code(500);
  exit('No se pudo crear el ZIP');
}

foreach ($images as $img) {
  if (!is_file($img)) continue;
  $zip->addFile($img, basename($img));
}

$zip->close();

header('Content-Type: application/zip');
header('Content-Disposition: attachment; filename="' . $zipName . '"');
header('Content-Length: ' . (string)filesize($zipPath));
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

readfile($zipPath);
@unlink($zipPath);
exit;
