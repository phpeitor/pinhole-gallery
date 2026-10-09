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
  echo json_encode(['ok' => false, 'error' => 'El token de subida no es válido o ha expirado']);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Método no permitido']);
  exit;
}

$imgRoot = realpath(__DIR__ . '/../img');
$path = trim(str_replace('\\', '/', (string)($_POST['path'] ?? '')), '/');
$action = (string)($_POST['action'] ?? 'inspect');
$parts = $path === '' ? [] : explode('/', $path);

if (!$imgRoot || $parts === [] || in_array($action, ['inspect', 'delete'], true) === false) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'La carpeta seleccionada no es válida']);
  exit;
}

$walkPath = $imgRoot;
foreach ($parts as $part) {
  if ($part === '' || $part === '.' || $part === '..' || $part[0] === '.') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'La ruta contiene un nivel no permitido']);
    exit;
  }
  $walkPath .= DIRECTORY_SEPARATOR . $part;
  if (is_link($walkPath)) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'No se permiten carpetas enlazadas']);
    exit;
  }
}

$target = $imgRoot . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $path);
$targetReal = realpath($target);
$rootPrefix = rtrim($imgRoot, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR;
if (
  !$targetReal ||
  !is_dir($targetReal) ||
  is_link($target) ||
  !str_starts_with(strtolower($targetReal), strtolower($rootPrefix))
) {
  http_response_code(404);
  echo json_encode(['ok' => false, 'error' => 'No se encontró la carpeta seleccionada']);
  exit;
}

function inspectFolderTree(string $directory): array {
  $folders = 1;
  $images = 0;
  $entries = scandir($directory) ?: [];
  foreach ($entries as $entry) {
    if ($entry === '.' || $entry === '..') continue;
    if ($entry[0] === '.') continue;
    $entryPath = $directory . DIRECTORY_SEPARATOR . $entry;
    if (is_link($entryPath)) continue;
    if (is_dir($entryPath)) {
      [$childFolders, $childImages] = inspectFolderTree($entryPath);
      $folders += $childFolders;
      $images += $childImages;
    } elseif (is_file($entryPath) && preg_match('/\.(jpe?g|png|webp)$/i', $entry)) {
      $images++;
    }
  }
  return [$folders, $images];
}

[$folderCount, $imageCount] = inspectFolderTree($targetReal);
if ($action === 'inspect') {
  echo json_encode([
    'ok' => true,
    'path' => str_replace(DIRECTORY_SEPARATOR, '/', substr($targetReal, strlen($rootPrefix))),
    'folders' => $folderCount,
    'images' => $imageCount,
  ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
  exit;
}

function removeFolderTree(string $directory): bool {
  $entries = scandir($directory) ?: [];
  foreach ($entries as $entry) {
    if ($entry === '.' || $entry === '..') continue;
    $entryPath = $directory . DIRECTORY_SEPARATOR . $entry;
    if (is_link($entryPath) || is_file($entryPath)) {
      if (!@unlink($entryPath)) return false;
    } elseif (is_dir($entryPath) && !removeFolderTree($entryPath)) {
      return false;
    }
  }
  return @rmdir($directory);
}

$parentDirectory = dirname($targetReal);
if (!removeFolderTree($targetReal)) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'No se pudo eliminar todo el contenido de la carpeta']);
  exit;
}

$parentMeta = $parentDirectory . DIRECTORY_SEPARATOR . '.meta.json';
if (is_file($parentMeta)) @unlink($parentMeta);

echo json_encode([
  'ok' => true,
  'path' => $path,
  'folders' => $folderCount,
  'images' => $imageCount,
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
