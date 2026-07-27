<?php
declare(strict_types=1);

if (session_status() !== PHP_SESSION_ACTIVE) {
  session_start();
}

header('Content-Type: application/json; charset=utf-8');

if (
  empty($_SESSION['upload_token']) ||
  $_SESSION['upload_token']['expires'] < time()
) {
  http_response_code(401);
  echo json_encode(['ok' => false, 'error' => 'Token de subida invalido o expirado']);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Metodo no permitido']);
  exit;
}

$path = trim((string)($_POST['path'] ?? ''), '/');
if ($path === '' || str_contains($path, '..')) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Ruta invalida']);
  exit;
}

$allowed = ['jpg', 'jpeg', 'png', 'webp'];
$extension = strtolower(pathinfo($path, PATHINFO_EXTENSION));
if (!in_array($extension, $allowed, true)) {
  http_response_code(403);
  echo json_encode(['ok' => false, 'error' => 'Tipo de archivo no permitido']);
  exit;
}

$imgRoot = realpath(__DIR__ . '/../img');
$targetPath = realpath(__DIR__ . '/../img/' . $path);

if (!$imgRoot || !$targetPath || !is_file($targetPath) || !str_starts_with($targetPath, $imgRoot)) {
  http_response_code(404);
  echo json_encode(['ok' => false, 'error' => 'Imagen no encontrada']);
  exit;
}

$folderPath = dirname($targetPath);
$thumbDir = $folderPath . DIRECTORY_SEPARATOR . '.thumbs';
$thumbName = sha1(basename($targetPath) . '|' . ((string)(@filemtime($targetPath) ?: 0)) . '|' . ((string)(@filesize($targetPath) ?: 0)) . '|640') . '.webp';

if (!@unlink($targetPath)) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'No se pudo eliminar la imagen']);
  exit;
}

$thumbPath = $thumbDir . DIRECTORY_SEPARATOR . $thumbName;
if (is_file($thumbPath)) {
  @unlink($thumbPath);
}

$cacheFile = $folderPath . DIRECTORY_SEPARATOR . '.meta.json';
if (is_file($cacheFile)) {
  @unlink($cacheFile);
}

echo json_encode(['ok' => true], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
