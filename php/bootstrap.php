<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(dirname(__DIR__));
$dotenv->safeLoad();

function envConfigInt(string $key, int $default, int $min = 0, int $max = PHP_INT_MAX): int
{
  $value = filter_var($_ENV[$key] ?? null, FILTER_VALIDATE_INT);
  if ($value === false || $value === null) return $default;
  return max($min, min($max, $value));
}

function envConfigBool(string $key, bool $default = false): bool
{
  $value = filter_var($_ENV[$key] ?? null, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
  return $value ?? $default;
}

function appConfig(): array
{
  static $config = null;
  if ($config !== null) return $config;

  $endpointDefaults = [
    'tokenValidate' => 'php/token_validate.php',
    'checkToken' => 'php/check_token.php',
    'logout' => 'php/logout.php',
    'menu' => 'php/menu.php',
    'homeSlider' => 'php/home_slider.php',
    'media' => 'php/media.php',
    'list' => 'php/list.php',
    'zip' => 'php/zip.php',
    'deleteImage' => 'php/delete_image.php',
    'deleteFolder' => 'php/delete_folder.php',
    'checkUploadToken' => 'php/check_upload_token.php',
    'uploadTokenValidate' => 'php/upload_token_validate.php',
    'createFolder' => 'php/create_folder.php',
    'upload' => 'php/upload.php',
  ];

  $endpointEnvKeys = [
    'tokenValidate' => 'API_TOKEN_VALIDATE',
    'checkToken' => 'API_CHECK_TOKEN',
    'logout' => 'API_LOGOUT',
    'menu' => 'API_MENU',
    'homeSlider' => 'API_HOME_SLIDER',
    'media' => 'API_MEDIA',
    'list' => 'API_LIST',
    'zip' => 'API_ZIP',
    'deleteImage' => 'API_DELETE_IMAGE',
    'deleteFolder' => 'API_DELETE_FOLDER',
    'checkUploadToken' => 'API_CHECK_UPLOAD_TOKEN',
    'uploadTokenValidate' => 'API_UPLOAD_TOKEN_VALIDATE',
    'createFolder' => 'API_CREATE_FOLDER',
    'upload' => 'API_UPLOAD',
  ];

  $endpoints = [];
  foreach ($endpointDefaults as $name => $default) {
    $candidate = trim((string)($_ENV[$endpointEnvKeys[$name]] ?? $default));
    // Frontend endpoint configuration accepts only local relative PHP routes.
    $endpoints[$name] = preg_match('~^php/[a-z_]+\.php$~i', $candidate) ? $candidate : $default;
  }

  $timezone = trim((string)($_ENV['APP_TIMEZONE'] ?? 'UTC'));
  if (in_array($timezone, DateTimeZone::listIdentifiers(), true)) {
    date_default_timezone_set($timezone);
  }

  $appDebug = envConfigBool('APP_DEBUG');
  ini_set('display_errors', $appDebug ? '1' : '0');
  $baseUrl = rtrim(trim((string)($_ENV['APP_BASE_URL'] ?? '')), '/');
  if ($baseUrl !== '') {
    $parsedBaseUrl = parse_url($baseUrl);
    $isRelativeBase = str_starts_with($baseUrl, '/') && !str_contains($baseUrl, '..');
    $isHttpBase = is_array($parsedBaseUrl)
      && in_array(strtolower((string)($parsedBaseUrl['scheme'] ?? '')), ['http', 'https'], true)
      && !empty($parsedBaseUrl['host'])
      && !isset($parsedBaseUrl['query'])
      && !isset($parsedBaseUrl['fragment']);
    if (!$isRelativeBase && !$isHttpBase) $baseUrl = '';
  }
  $uploadExtensions = array_values(array_intersect(
    ['jpg', 'jpeg', 'png', 'webp'],
    array_filter(array_map('strtolower', array_map('trim', explode(',', (string)($_ENV['UPLOAD_ALLOWED_EXTENSIONS'] ?? 'jpg,jpeg,png,webp')))))
  ));
  if ($uploadExtensions === []) $uploadExtensions = ['jpg', 'jpeg', 'png', 'webp'];

  $config = [
    'app' => [
      'name' => trim((string)($_ENV['APP_NAME'] ?? 'Pixitor Gallery')) ?: 'Pixitor Gallery',
      'env' => trim((string)($_ENV['APP_ENV'] ?? 'production')) ?: 'production',
      'debug' => $appDebug,
      'base_url' => $baseUrl,
    ],
    'security' => [
      'gallery_token' => (string)($_ENV['GALLERY_TOKEN'] ?? ''),
      'upload_token' => (string)($_ENV['UPLOAD_TOKEN'] ?? ''),
      'gallery_session_ttl' => envConfigInt('GALLERY_SESSION_TTL_SECONDS', 43200, 300, 2592000),
      'upload_session_ttl' => envConfigInt('UPLOAD_SESSION_TTL_SECONDS', 43200, 300, 2592000),
      'token_max_attempts' => envConfigInt('TOKEN_MAX_ATTEMPTS', 3, 1, 20),
      'token_lock_seconds' => envConfigInt('TOKEN_LOCK_SECONDS', 300, 10, 86400),
    ],
    'session' => [
      'cookie_path' => trim((string)($_ENV['SESSION_COOKIE_PATH'] ?? '/')) ?: '/',
      'cookie_secure' => envConfigBool('SESSION_COOKIE_SECURE', !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off'),
      'cookie_httponly' => envConfigBool('SESSION_COOKIE_HTTPONLY', true),
      'cookie_samesite' => ucfirst(strtolower(trim((string)($_ENV['SESSION_COOKIE_SAMESITE'] ?? 'Lax')))),
    ],
    'gallery' => [
      'page_size' => envConfigInt('GALLERY_PAGE_SIZE', 12, 1, 50),
      'max_page_size' => envConfigInt('GALLERY_MAX_PAGE_SIZE', 50, 1, 100),
      'home_slider_limit' => envConfigInt('HOME_SLIDER_LIMIT', 5, 1, 10),
      'thumb_width' => envConfigInt('GALLERY_THUMB_WIDTH', 640, 64, 2400),
      'thumb_quality' => envConfigInt('GALLERY_THUMB_QUALITY', 78, 30, 100),
    ],
    'upload' => [
      'max_files' => envConfigInt('UPLOAD_MAX_FILES', 20, 1, 500),
      'max_file_size_mb' => envConfigInt('UPLOAD_MAX_FILE_SIZE_MB', 0, 0, 2048),
      'allowed_extensions' => $uploadExtensions,
    ],
    'endpoints' => $endpoints,
  ];

  return $config;
}

function appEndpointUrl(string $name): string
{
  $config = appConfig();
  $path = $config['endpoints'][$name] ?? '';
  if ($path === '') return '';
  return $config['app']['base_url'] !== ''
    ? $config['app']['base_url'] . '/' . $path
    : $path;
}

function startAppSession(): void
{
  if (session_status() === PHP_SESSION_ACTIVE) return;

  $session = appConfig()['session'];
  $sameSite = in_array($session['cookie_samesite'], ['Lax', 'Strict', 'None'], true)
    ? $session['cookie_samesite']
    : 'Lax';

  session_set_cookie_params([
    'lifetime' => 0,
    'path' => $session['cookie_path'],
    'secure' => $session['cookie_secure'],
    'httponly' => $session['cookie_httponly'],
    'samesite' => $sameSite,
  ]);
  session_start();
}
