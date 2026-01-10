<?php
session_start();
require_once __DIR__ . '/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');

$VALID_TOKEN = $_ENV['GALLERY_TOKEN'] ?? '';
$token = trim($_POST['token'] ?? '');

if (!$VALID_TOKEN || $token !== $VALID_TOKEN) {
    echo json_encode(['ok' => false]);
    exit;
}

$_SESSION['gallery_token'] = [
    'value'   => $token,
    'expires' => time() + (60 * 60 * 12) // 12 horas
];

echo json_encode(['ok' => true]);
