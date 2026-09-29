<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

$config = appConfig();
$publicEndpoints = [];
foreach (array_keys($config['endpoints']) as $name) {
  $publicEndpoints[$name] = appEndpointUrl($name);
}
$publicConfig = [
  'appName' => $config['app']['name'],
  'baseUrl' => $config['app']['base_url'],
  'pageSize' => $config['gallery']['page_size'],
  'homeSliderLimit' => $config['gallery']['home_slider_limit'],
  'maxUploadFiles' => $config['upload']['max_files'],
  'allowedUploadExtensions' => $config['upload']['allowed_extensions'],
  'endpoints' => $publicEndpoints,
];

header('Content-Type: application/javascript; charset=utf-8');
header('Cache-Control: no-store, private');
echo 'window.PIXITOR_CONFIG = Object.freeze(' . json_encode(
  $publicConfig,
  JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_SLASHES
) . ');';
