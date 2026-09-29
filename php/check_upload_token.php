<?php
require_once __DIR__ . '/bootstrap.php';
startAppSession();
header('Content-Type: application/json; charset=utf-8');

if (
  !empty($_SESSION['upload_token']) &&
  $_SESSION['upload_token']['expires'] >= time()
) {
  echo json_encode(['valid' => true]);
} else {
  echo json_encode(['valid' => false]);
}
