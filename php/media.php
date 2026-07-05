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
  exit;
}

$path = trim((string)($_GET['path'] ?? ''), '/');
if ($path === '' || str_contains($path, '..')) {
  http_response_code(400);
  exit;
}

$basePath = realpath(__DIR__ . '/../img');
$targetPath = realpath(__DIR__ . '/../img/' . $path);

if (!$basePath || !$targetPath || !is_file($targetPath) || !str_starts_with($targetPath, $basePath)) {
  http_response_code(404);
  exit;
}

$extension = strtolower(pathinfo($targetPath, PATHINFO_EXTENSION));
$types = [
  'jpg' => 'image/jpeg',
  'jpeg' => 'image/jpeg',
  'png' => 'image/png',
  'webp' => 'image/webp',
];

if (!isset($types[$extension])) {
  http_response_code(403);
  exit;
}

$mtime = (int)filemtime($targetPath);
$size = (int)filesize($targetPath);
$etag = '"' . sha1($path . '|' . $mtime . '|' . $size) . '"';
$lastModified = gmdate('D, d M Y H:i:s', $mtime) . ' GMT';

header('Cache-Control: private, max-age=86400');
header('ETag: ' . $etag);
header('Last-Modified: ' . $lastModified);
header('X-Content-Type-Options: nosniff');

$ifNoneMatch = trim((string)($_SERVER['HTTP_IF_NONE_MATCH'] ?? ''));
$ifModifiedSince = strtotime((string)($_SERVER['HTTP_IF_MODIFIED_SINCE'] ?? ''));
if ($ifNoneMatch === $etag || ($ifModifiedSince && $ifModifiedSince >= $mtime)) {
  http_response_code(304);
  exit;
}

header('Content-Type: ' . $types[$extension]);
header('Content-Length: ' . (string)$size);

readfile($targetPath);
