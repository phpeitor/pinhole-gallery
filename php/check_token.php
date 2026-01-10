<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

if (
    empty($_SESSION['gallery_token']) ||
    $_SESSION['gallery_token']['expires'] < time()
) {
    echo json_encode(['valid' => false]);
    exit;
}

echo json_encode(['valid' => true]);
