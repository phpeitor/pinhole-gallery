<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';
startAppSession();

header('Content-Type: application/json; charset=utf-8');

if (
  empty($_SESSION['upload_token']) ||
  $_SESSION['upload_token']['expires'] < time()
) {
  http_response_code(401);
  echo json_encode(['ok' => false, 'error' => 'Token de subida invalido o expirado']);
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

$parent = trim(str_replace('\\', '/', (string)($_POST['parent'] ?? '')), '/');
$name = trim((string)($_POST['name'] ?? ''));
$parts = array_values(array_filter(explode('/', ($parent !== '' ? $parent . '/' : '') . $name), 'strlen'));

if ($parts === []) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Indica un nombre de carpeta']);
  exit;
}

foreach ($parts as &$part) {
  $part = trim($part);
  if ($part === '' || $part === '.' || $part === '..' || preg_match('/[^\w\- ]/u', $part)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Nombre invalido. Usa letras, numeros, espacios o guiones']);
    exit;
  }
  $part = trim(preg_replace('/\s+/', '_', $part));
}
unset($part);

$folder = implode('/', $parts);

$targetDir = $imgRoot . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $folder);

$walkPath = $imgRoot;
foreach ($parts as $part) {
  $walkPath .= DIRECTORY_SEPARATOR . $part;
  if (is_link($walkPath)) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'No se permiten carpetas enlazadas']);
    exit;
  }
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

$targetReal = realpath($targetDir);
if (!$targetReal || !str_starts_with($targetReal, $imgRoot . DIRECTORY_SEPARATOR)) {
  http_response_code(403);
  echo json_encode(['ok' => false, 'error' => 'Carpeta no permitida']);
  exit;
}

echo json_encode([
  'ok' => true,
  'folder' => str_replace(DIRECTORY_SEPARATOR, '/', $folder),
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
