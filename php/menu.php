<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$imgRoot = realpath(__DIR__ . '/../img');
if (!$imgRoot || !is_dir($imgRoot)) {
  echo json_encode(['groups' => []], JSON_UNESCAPED_SLASHES);
  exit;
}

function isVisibleDir(string $path, string $name): bool {
  return $name !== ''
    && $name[0] !== '.'
    && is_dir($path . DIRECTORY_SEPARATOR . $name);
}

function hasGalleryImages(string $path): bool {
  $images = glob($path . '/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}', GLOB_BRACE) ?: [];
  return count($images) > 0;
}

function makeLabel(string $value): string {
  $label = str_replace(['-', '_'], ' ', $value);
  return trim($label);
}

function makeId(string $parent, string $child): string {
  $raw = strtolower($parent . '_' . $child);
  $id = preg_replace('/[^a-z0-9]+/', '_', $raw);
  return trim((string)$id, '_');
}

$entries = scandir($imgRoot) ?: [];
$parentDirs = [];
foreach ($entries as $name) {
  if (!isVisibleDir($imgRoot, $name)) continue;
  $parentDirs[] = $name;
}
natcasesort($parentDirs);

$groups = [];
$usedIds = [];

foreach ($parentDirs as $parent) {
  $parentPath = $imgRoot . DIRECTORY_SEPARATOR . $parent;

  $children = scandir($parentPath) ?: [];
  $childDirs = [];
  foreach ($children as $child) {
    if (!isVisibleDir($parentPath, $child)) continue;
    $childDirs[] = $child;
  }
  natcasesort($childDirs);

  $items = [];
  foreach ($childDirs as $child) {
    $childPath = $parentPath . DIRECTORY_SEPARATOR . $child;
    if (!hasGalleryImages($childPath)) continue;

    $id = makeId($parent, $child);
    if ($id === '') continue;

    // Evita colisiones de id en nombres similares.
    $baseId = $id;
    $suffix = 2;
    while (isset($usedIds[$id])) {
      $id = $baseId . '_' . $suffix;
      $suffix++;
    }
    $usedIds[$id] = true;

    $items[] = [
      'id' => $id,
      'folder' => $parent . '/' . $child,
      'title' => makeLabel($child),
    ];
  }

  if (count($items) === 0) continue;

  $groups[] = [
    'group' => makeLabel($parent),
    'items' => array_values($items),
  ];
}

echo json_encode([
  'groups' => array_values($groups),
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
