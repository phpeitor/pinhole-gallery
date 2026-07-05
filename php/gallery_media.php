<?php
declare(strict_types=1);

const GALLERY_THUMB_WIDTH = 640;
const GALLERY_THUMB_QUALITY = 78;

function createGalleryThumb(string $sourcePath, string $thumbDir, int $thumbWidth = GALLERY_THUMB_WIDTH): ?string {
  if (!function_exists('imagewebp')) return null;

  $size = @getimagesize($sourcePath);
  if (!$size || empty($size['mime'])) return null;

  $sourceMtime = @filemtime($sourcePath) ?: 0;
  $sourceSize = @filesize($sourcePath) ?: 0;
  $thumbName = sha1(basename($sourcePath) . '|' . $sourceMtime . '|' . $sourceSize . '|' . $thumbWidth) . '.webp';
  $thumbPath = $thumbDir . DIRECTORY_SEPARATOR . $thumbName;

  if (is_file($thumbPath)) {
    return '.thumbs/' . $thumbName;
  }

  if (!is_dir($thumbDir) && !@mkdir($thumbDir, 0775, true) && !is_dir($thumbDir)) {
    return null;
  }

  $source = match ($size['mime']) {
    'image/jpeg' => function_exists('imagecreatefromjpeg') ? @imagecreatefromjpeg($sourcePath) : false,
    'image/png' => function_exists('imagecreatefrompng') ? @imagecreatefrompng($sourcePath) : false,
    'image/webp' => function_exists('imagecreatefromwebp') ? @imagecreatefromwebp($sourcePath) : false,
    default => false,
  };

  if (!$source) return null;

  $width = max(1, (int)$size[0]);
  $height = max(1, (int)$size[1]);
  $targetWidth = min($thumbWidth, $width);
  $targetHeight = max(1, (int)round($height * ($targetWidth / $width)));

  $thumb = imagecreatetruecolor($targetWidth, $targetHeight);
  if (!$thumb) {
    imagedestroy($source);
    return null;
  }

  imagealphablending($thumb, false);
  imagesavealpha($thumb, true);
  $transparent = imagecolorallocatealpha($thumb, 0, 0, 0, 127);
  imagefilledrectangle($thumb, 0, 0, $targetWidth, $targetHeight, $transparent);

  imagecopyresampled($thumb, $source, 0, 0, 0, 0, $targetWidth, $targetHeight, $width, $height);
  $ok = imagewebp($thumb, $thumbPath, GALLERY_THUMB_QUALITY);

  imagedestroy($source);
  imagedestroy($thumb);

  return $ok ? '.thumbs/' . $thumbName : null;
}

function galleryRelativePath(string $rootPath, string $filePath): string {
  $relative = ltrim(substr($filePath, strlen($rootPath)), DIRECTORY_SEPARATOR);
  return str_replace(DIRECTORY_SEPARATOR, '/', $relative);
}
