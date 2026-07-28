<?php
declare(strict_types=1);

const TOKEN_MAX_ATTEMPTS = 3;
const TOKEN_LOCK_SECONDS = 300;

function tokenRateLimitStatus(string $key): array {
  $now = time();
  $state = $_SESSION[$key] ?? ['attempts' => 0, 'locked_until' => 0];
  $lockedUntil = (int)($state['locked_until'] ?? 0);

  if ($lockedUntil > $now) {
    return [
      'locked' => true,
      'retryAfter' => $lockedUntil - $now,
    ];
  }

  if ($lockedUntil > 0) {
    unset($_SESSION[$key]);
  }

  return ['locked' => false, 'retryAfter' => 0];
}

function tokenRateLimitFail(string $key): array {
  $now = time();
  $state = $_SESSION[$key] ?? ['attempts' => 0, 'locked_until' => 0];
  $attempts = (int)($state['attempts'] ?? 0) + 1;

  if ($attempts >= TOKEN_MAX_ATTEMPTS) {
    $_SESSION[$key] = [
      'attempts' => $attempts,
      'locked_until' => $now + TOKEN_LOCK_SECONDS,
    ];

    return ['locked' => true, 'retryAfter' => TOKEN_LOCK_SECONDS];
  }

  $_SESSION[$key] = [
    'attempts' => $attempts,
    'locked_until' => 0,
  ];

  return [
    'locked' => false,
    'retryAfter' => 0,
    'attemptsLeft' => TOKEN_MAX_ATTEMPTS - $attempts,
  ];
}

function tokenRateLimitClear(string $key): void {
  unset($_SESSION[$key]);
}
