<?php
require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/token_rate_limit.php';
startAppSession();

$config = appConfig();

header('Content-Type: application/json; charset=utf-8');

$VALID_TOKEN = $config['security']['gallery_token'];
$token = trim($_POST['token'] ?? '');
$limitKey = 'gallery_token_attempts';

$limit = tokenRateLimitStatus($limitKey);
if ($limit['locked']) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'locked' => true, 'retryAfter' => $limit['retryAfter']]);
    exit;
}

if (!$VALID_TOKEN || $token !== $VALID_TOKEN) {
    $failure = tokenRateLimitFail($limitKey, $config['security']['token_max_attempts'], $config['security']['token_lock_seconds']);
    if ($failure['locked']) {
        http_response_code(429);
    }
    echo json_encode(['ok' => false] + $failure);
    exit;
}

tokenRateLimitClear($limitKey);

$_SESSION['gallery_token'] = [
    'value'   => $token,
    'expires' => time() + $config['security']['gallery_session_ttl']
];

echo json_encode(['ok' => true]);
