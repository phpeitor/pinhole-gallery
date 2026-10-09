<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';
startAppSession();
header('Content-Type: application/json; charset=utf-8');

// Validar token antes de mostrar menú
if (
    empty($_SESSION['gallery_token']) ||
    $_SESSION['gallery_token']['expires'] < time()
) {
    echo json_encode(['groups' => []], JSON_UNESCAPED_SLASHES);
    exit;
}

$imgRoot = realpath(__DIR__ . '/../img');
if (!$imgRoot || !is_dir($imgRoot)) {
  echo json_encode(['groups' => []], JSON_UNESCAPED_SLASHES);
  exit;
}

function isVisibleDir(string $path, string $name): bool {
  return $name !== ''
    && $name[0] !== '.'
    && !is_link($path . DIRECTORY_SEPARATOR . $name)
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

function makeSlug(string $value): string {
  $slug = strtolower($value);
  $slug = preg_replace('/[^a-z0-9]+/', '_', $slug);
  return trim((string)$slug, '_');
}

function makeId(string $parent, string $child): string {
  return makeSlug($parent . '_' . $child);
}

function collectGalleryFolders(string $parentPath, string $parent, string $relative, array &$usedIds): array {
  $items = [];
  $entries = scandir($parentPath) ?: [];
  natcasesort($entries);

  foreach ($entries as $name) {
    if (!isVisibleDir($parentPath, $name)) continue;
    $childPath = $parentPath . DIRECTORY_SEPARATOR . $name;
    $childRelative = $relative !== '' ? $relative . '/' . $name : $name;

    $hasImages = hasGalleryImages($childPath);
    $children = collectGalleryFolders($childPath, $parent, $childRelative, $usedIds);
    if (!$hasImages && count($children) === 0) continue;

    $id = null;
    if ($hasImages) {
      $id = makeId($parent, str_replace('/', '_', $childRelative));
      $baseId = $id;
      $suffix = 2;
      while (isset($usedIds[$id])) {
        $id = $baseId . '_' . $suffix;
        $suffix++;
      }
      $usedIds[$id] = true;
    }

    $items[] = [
      'id' => $id,
      'folder' => $parent . '/' . $childRelative,
      'title' => makeLabel($name),
      'children' => $children,
    ];
  }

  return $items;
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
  $parentHasImages = hasGalleryImages($parentPath);

  $items = [];
  $directId = null;
  if ($parentHasImages) {
    $id = makeSlug($parent);
    if ($id !== '') {
      $baseId = $id;
      $suffix = 2;
      while (isset($usedIds[$id])) {
        $id = $baseId . '_' . $suffix;
        $suffix++;
      }
      $usedIds[$id] = true;
      $directId = $id;
    }
  }

  $items = collectGalleryFolders($parentPath, $parent, '', $usedIds);

  if (!$parentHasImages && count($items) === 0) continue;

  $groups[] = [
    'group' => makeLabel($parent),
    'id' => $directId,
    'folder' => $parentHasImages ? $parent : null,
    'parentFolder' => $parent,
    'items' => array_values($items),
  ];
}

echo json_encode([
  'groups' => array_values($groups),
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
