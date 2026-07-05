<?php
declare(strict_types=1);

if (session_status() !== PHP_SESSION_ACTIVE) {
  session_start();
}
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/gallery_media.php';

if (
  empty($_SESSION['gallery_token']) ||
  $_SESSION['gallery_token']['expires'] < time()
) {
  http_response_code(401);
  echo json_encode(['items' => []], JSON_UNESCAPED_SLASHES);
  exit;
}

$imgRoot = realpath(__DIR__ . '/../img');
if (!$imgRoot || !is_dir($imgRoot)) {
  echo json_encode(['items' => []], JSON_UNESCAPED_SLASHES);
  exit;
}

$limit = min(5, max(1, (int)($_GET['limit'] ?? 5)));
$candidates = [];
$allowed = ['jpg' => true, 'jpeg' => true, 'png' => true, 'webp' => true];
$iterator = new RecursiveIteratorIterator(
  new RecursiveCallbackFilterIterator(
    new RecursiveDirectoryIterator($imgRoot, FilesystemIterator::SKIP_DOTS),
    static function (SplFileInfo $current): bool {
      if ($current->isDir()) {
        $name = $current->getFilename();
        return $name !== '' && $name[0] !== '.';
      }

      return true;
    }
  )
);

foreach ($iterator as $file) {
  if (!$file instanceof SplFileInfo || !$file->isFile()) continue;

  $extension = strtolower($file->getExtension());
  if (!isset($allowed[$extension])) continue;

  $candidates[] = $file->getPathname();
}

shuffle($candidates);

$images = [];
foreach ($candidates as $filePath) {
  $size = @getimagesize($filePath);
  if (!$size) continue;

  $dirPath = $file->getPath();
  $thumb = createGalleryThumb($filePath, $dirPath . DIRECTORY_SEPARATOR . '.thumbs');
  $relative = galleryRelativePath($imgRoot, $filePath);
  $folder = dirname($relative);
  $folder = $folder === '.' ? '' : $folder;

  $images[] = [
    'url' => 'img/' . $relative,
    'thumb' => $thumb && $folder !== '' ? 'img/' . $folder . '/' . $thumb : 'img/' . $relative,
    'width' => (int)$size[0],
    'height' => (int)$size[1],
  ];

  if (count($images) >= $limit) break;
}

echo json_encode([
  'items' => $images,
], JSON_UNESCAPED_SLASHES);
