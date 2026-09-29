<?php
require_once __DIR__ . '/bootstrap.php';
startAppSession();
unset($_SESSION['gallery_token']);
session_destroy();
header("Location: ../");
exit;
