<?php
require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/token_rate_limit.php';
startAppSession();

header('Content-Type: application/json; charset=utf-8');

$limit = tokenRateLimitStatus('gallery_token_attempts');

if (
    empty($_SESSION['gallery_token']) ||
    $_SESSION['gallery_token']['expires'] < time()
) {
    echo json_encode([
        'valid' => false,
        'locked' => $limit['locked'],
        'retryAfter' => $limit['retryAfter'],
    ]);
    exit;
}

echo json_encode(['valid' => true]);
