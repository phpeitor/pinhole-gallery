<?php
declare(strict_types=1);

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

function tokenRateLimitFail(string $key, int $maxAttempts = 3, int $lockSeconds = 300): array {
  $now = time();
  $state = $_SESSION[$key] ?? ['attempts' => 0, 'locked_until' => 0];
  $attempts = (int)($state['attempts'] ?? 0) + 1;

  if ($attempts >= $maxAttempts) {
    $_SESSION[$key] = [
      'attempts' => $attempts,
      'locked_until' => $now + $lockSeconds,
    ];

    return ['locked' => true, 'retryAfter' => $lockSeconds];
  }

  $_SESSION[$key] = [
    'attempts' => $attempts,
    'locked_until' => 0,
  ];

  return [
    'locked' => false,
    'retryAfter' => 0,
    'attemptsLeft' => max(0, $maxAttempts - $attempts),
  ];
}

function tokenRateLimitClear(string $key): void {
  unset($_SESSION[$key]);
}
