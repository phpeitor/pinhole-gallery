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

$folder = trim($_POST['folder'] ?? '', '/');
if ($folder === '' || str_contains($folder, '..')) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Carpeta invalida']);
  exit;
}

$targetDir = $imgRoot . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $folder);
$targetReal = realpath($targetDir);

if (!$targetReal || !str_starts_with($targetReal, $imgRoot)) {
  http_response_code(403);
  echo json_encode(['ok' => false, 'error' => 'Carpeta no permitida']);
  exit;
}

if (!is_dir($targetReal)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'La carpeta no existe']);
  exit;
}

if (empty($_FILES['files'])) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'No se enviaron archivos']);
  exit;
}

$allowed = [
  'jpg' => 'image/jpeg',
  'jpeg' => 'image/jpeg',
  'png' => 'image/png',
  'webp' => 'image/webp',
];

$files = $_FILES['files'];
$uploaded = 0;
$errors = [];

if (is_array($files['name'])) {
  $total = count($files['name']);
  for ($i = 0; $i < $total; $i++) {
    if ($files['error'][$i] !== UPLOAD_ERR_OK) {
      $errors[] = $files['name'][$i] . ': Error al subir (codigo ' . $files['error'][$i] . ')';
      continue;
    }

    $ext = strtolower(pathinfo($files['name'][$i], PATHINFO_EXTENSION));
    if (!isset($allowed[$ext])) {
      $errors[] = $files['name'][$i] . ': Tipo de archivo no permitido';
      continue;
    }

    $dest = $targetReal . DIRECTORY_SEPARATOR . basename($files['name'][$i]);
    if (move_uploaded_file($files['tmp_name'][$i], $dest)) {
      $uploaded++;
    } else {
      $errors[] = $files['name'][$i] . ': No se pudo guardar';
    }
  }
} else {
  if ($files['error'] !== UPLOAD_ERR_OK) {
    $errors[] = $files['name'] . ': Error al subir (codigo ' . $files['error'] . ')';
  } else {
    $ext = strtolower(pathinfo($files['name'], PATHINFO_EXTENSION));
    if (!isset($allowed[$ext])) {
      $errors[] = $files['name'] . ': Tipo de archivo no permitido';
    } else {
      $dest = $targetReal . DIRECTORY_SEPARATOR . basename($files['name']);
      if (move_uploaded_file($files['tmp_name'], $dest)) {
        $uploaded++;
      } else {
        $errors[] = $files['name'] . ': No se pudo guardar';
      }
    }
  }
}

// Limpiar cache
$cacheFile = $targetReal . '/.meta.json';
if ($uploaded > 0 && file_exists($cacheFile)) {
  @unlink($cacheFile);
}

echo json_encode([
  'ok' => count($errors) === 0,
  'uploaded' => $uploaded,
  'errors' => $errors,
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
