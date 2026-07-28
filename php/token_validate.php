<?php
session_start();
require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/token_rate_limit.php';

header('Content-Type: application/json; charset=utf-8');

$VALID_TOKEN = $_ENV['GALLERY_TOKEN'] ?? '';
$token = trim($_POST['token'] ?? '');
$limitKey = 'gallery_token_attempts';

$limit = tokenRateLimitStatus($limitKey);
if ($limit['locked']) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'locked' => true, 'retryAfter' => $limit['retryAfter']]);
    exit;
}

if (!$VALID_TOKEN || $token !== $VALID_TOKEN) {
    $failure = tokenRateLimitFail($limitKey);
    if ($failure['locked']) {
        http_response_code(429);
    }
    echo json_encode(['ok' => false] + $failure);
    exit;
}

tokenRateLimitClear($limitKey);

$_SESSION['gallery_token'] = [
    'value'   => $token,
    'expires' => time() + (60 * 60 * 12) // 12 horas
];

echo json_encode(['ok' => true]);
