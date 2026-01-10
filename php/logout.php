<?php
session_start();
unset($_SESSION['gallery_token']);
session_destroy();
header("Location: ../");
exit;
