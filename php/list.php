<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/gallery_media.php';

if (session_status() !== PHP_SESSION_ACTIVE) {
  session_start();
}

if (
  empty($_SESSION['gallery_token']) ||
  $_SESSION['gallery_token']['expires'] < time()
) {
  http_response_code(401);
  echo json_encode(["total" => 0, "items" => []], JSON_UNESCAPED_SLASHES);
  exit;
}

$folder = trim($_GET['folder'] ?? '', '/');
if ($folder === '' || str_contains($folder, '..')) {
  http_response_code(400);
  echo json_encode(["total" => 0, "items" => []], JSON_UNESCAPED_SLASHES);
  exit;
}

$offset = max(0, (int)($_GET['offset'] ?? 0));
$limit  = min(50, max(1, (int)($_GET['limit'] ?? 10)));

$basePath = realpath(__DIR__ . '/../img');
$baseDir  = __DIR__ . '/../img/' . $folder;
$targetPath = realpath($baseDir);

if (!$basePath || !$targetPath || !str_starts_with($targetPath, $basePath)) {
  http_response_code(403);
  echo json_encode(["total" => 0, "items" => []], JSON_UNESCAPED_SLASHES);
  exit;
}

if (!is_dir($baseDir)) {
  echo json_encode(["total" => 0, "items" => []], JSON_UNESCAPED_SLASHES);
  exit;
}

$cacheFile = $baseDir . '/.meta.json';
$thumbDir = $baseDir . '/.thumbs';
$cacheVersion = 2;

$files = glob($baseDir . "/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}", GLOB_BRACE) ?: [];
natsort($files);

// Fingerprints para invalidar cache cuando cambian archivos.
$maxMtime = 0;
$signatureParts = [];
foreach ($files as $fp) {
  $mt = @filemtime($fp);
  if ($mt && $mt > $maxMtime) $maxMtime = $mt;

  $signatureParts[] = implode('|', [
    basename($fp),
    (string)($mt ?: 0),
    (string)(@filesize($fp) ?: 0)
  ]);
}
$filesSignature = sha1(implode(';', $signatureParts));

$cache = null;
if (file_exists($cacheFile)) {
  $cache = json_decode((string)file_get_contents($cacheFile), true);
}

// cache válido?
$useCache = is_array($cache)
  && isset($cache['cacheVersion'], $cache['maxMtime'], $cache['filesSignature'], $cache['items'])
  && (int)$cache['cacheVersion'] === $cacheVersion
  && (int)$cache['maxMtime'] === (int)$maxMtime
  && (string)$cache['filesSignature'] === $filesSignature
  && is_array($cache['items']);

if ($useCache) {
  $allItems = $cache['items'];
} else {
  $allItems = [];

  foreach ($files as $filePath) {
    $size = @getimagesize($filePath);
    if (!$size) continue;

    [$width, $height] = [ (int)$size[0], (int)$size[1] ];

    $allItems[] = [
      "filename" => basename($filePath),
      "thumb" => createGalleryThumb($filePath, $thumbDir),
      "width" => $width,
      "height" => $height
    ];
  }

  file_put_contents($cacheFile, json_encode([
    "cacheVersion" => $cacheVersion,
    "maxMtime" => $maxMtime,
    "filesSignature" => $filesSignature,
    "thumbWidth" => GALLERY_THUMB_WIDTH,
    "items" => $allItems
  ], JSON_UNESCAPED_SLASHES));
}

$total = count($allItems);
$items = array_slice($allItems, $offset, $limit);

echo json_encode([
  "total" => $total,
  "items" => array_values($items)
], JSON_UNESCAPED_SLASHES);
