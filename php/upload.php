<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';
$appConfig = appConfig();

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
$allowed = array_intersect_key($allowed, array_flip($appConfig['upload']['allowed_extensions']));

$files = $_FILES['files'];
$uploaded = 0;
$errors = [];
$fileCount = is_array($files['name']) ? count($files['name']) : 1;
$maxFileSizeBytes = $appConfig['upload']['max_file_size_mb'] * 1024 * 1024;

if ($fileCount > $appConfig['upload']['max_files']) {
  http_response_code(413);
  echo json_encode(['ok' => false, 'error' => 'Se permiten hasta ' . $appConfig['upload']['max_files'] . ' archivos por carga']);
  exit;
}

function uploadErrorMessage(int $code): string {
  return match ($code) {
    UPLOAD_ERR_INI_SIZE => 'El archivo excede upload_max_filesize configurado en PHP',
    UPLOAD_ERR_FORM_SIZE => 'El archivo excede el limite permitido por el formulario',
    UPLOAD_ERR_PARTIAL => 'El archivo se subio parcialmente',
    UPLOAD_ERR_NO_FILE => 'No se recibio el archivo',
    UPLOAD_ERR_NO_TMP_DIR => 'Falta el directorio temporal de PHP',
    UPLOAD_ERR_CANT_WRITE => 'No se pudo escribir el archivo en disco',
    UPLOAD_ERR_EXTENSION => 'Una extension de PHP bloqueo la subida',
    default => 'Error al subir (codigo ' . $code . ')',
  };
}

if (is_array($files['name'])) {
  $total = count($files['name']);
  for ($i = 0; $i < $total; $i++) {
    if ($files['error'][$i] !== UPLOAD_ERR_OK) {
      $errors[] = $files['name'][$i] . ': ' . uploadErrorMessage((int)$files['error'][$i]);
      continue;
    }

    if ($maxFileSizeBytes > 0 && (int)$files['size'][$i] > $maxFileSizeBytes) {
      $errors[] = $files['name'][$i] . ': El archivo excede el maximo de ' . $appConfig['upload']['max_file_size_mb'] . ' MB';
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
    $errors[] = $files['name'] . ': ' . uploadErrorMessage((int)$files['error']);
  } elseif ($maxFileSizeBytes > 0 && (int)$files['size'] > $maxFileSizeBytes) {
    $errors[] = $files['name'] . ': El archivo excede el maximo de ' . $appConfig['upload']['max_file_size_mb'] . ' MB';
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
