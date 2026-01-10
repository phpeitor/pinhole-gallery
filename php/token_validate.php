<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

$VALID_TOKEN = 'EMMA2026';
$TTL = 60 * 60 * 24;

$token = trim($_POST['token'] ?? '');

if ($token !== $VALID_TOKEN) {
    http_response_code(401);
    echo json_encode(["ok" => false, "message" => "Token inválido"]);
    exit;
}

$_SESSION['gallery_token'] = [
    'token' => $token,
    'expires' => time() + $TTL
];

echo json_encode([
    "ok" => true,
    "expires_in" => $TTL
]);