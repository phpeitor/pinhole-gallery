<?php
declare(strict_types=1);

if (session_status() !== PHP_SESSION_ACTIVE) {
  session_start();
}

header('Content-Type: application/json; charset=utf-8');

if (
  empty($_SESSION['gallery_token']) ||
  $_SESSION['gallery_token']['expires'] < time()
) {
  http_response_code(401);
  echo json_encode(['ok' => false, 'error' => 'Token invalido o expirado']);
  exit;
}

$imgRoot = realpath(__DIR__ . '/../img');
if (!$imgRoot || !is_dir($imgRoot)) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Directorio de imagenes no encontrado']);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Metodo no permitido']);
  exit;
}

$parent = trim($_POST['parent'] ?? '', '/');
$name = trim($_POST['name'] ?? '');

if ($name === '' || preg_match('/[^\w\- ]/', $name)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Nombre invalido (solo letras, numeros, espacios, guiones)']);
  exit;
}

$folder = $parent !== '' ? $parent . '/' . $name : $name;

if (str_contains($folder, '..')) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Ruta invalida']);
  exit;
}

$targetDir = $imgRoot . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $folder);
$targetReal = realpath(dirname($targetDir));

if (!$targetReal || !str_starts_with($targetReal, $imgRoot)) {
  http_response_code(403);
  echo json_encode(['ok' => false, 'error' => 'Carpeta no permitida']);
  exit;
}

if (is_dir($targetDir)) {
  http_response_code(409);
  echo json_encode(['ok' => false, 'error' => 'La carpeta ya existe']);
  exit;
}

if (!mkdir($targetDir, 0755, true)) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'No se pudo crear la carpeta']);
  exit;
}

echo json_encode([
  'ok' => true,
  'folder' => str_replace(DIRECTORY_SEPARATOR, '/', $folder),
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
