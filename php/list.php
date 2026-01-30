<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

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

$files = glob($baseDir . "/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}", GLOB_BRACE) ?: [];
natsort($files);

// fingerprint por mtime máximo
$maxMtime = 0;
foreach ($files as $fp) {
  $mt = @filemtime($fp);
  if ($mt && $mt > $maxMtime) $maxMtime = $mt;
}

$cache = null;
if (file_exists($cacheFile)) {
  $cache = json_decode((string)file_get_contents($cacheFile), true);
}

// cache válido?
$useCache = is_array($cache)
  && isset($cache['maxMtime'], $cache['items'])
  && (int)$cache['maxMtime'] === (int)$maxMtime
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
      "width" => $width,
      "height" => $height
    ];
  }

  file_put_contents($cacheFile, json_encode([
    "maxMtime" => $maxMtime,
    "items" => $allItems
  ], JSON_UNESCAPED_SLASHES));
}

$total = count($allItems);
$items = array_slice($allItems, $offset, $limit);

echo json_encode([
  "total" => $total,
  "items" => array_values($items)
], JSON_UNESCAPED_SLASHES);
