export function saveAccessToken(token: string): void {
  document.cookie = `access_token=${token}; path=/; secure=true; samesite=none; max-age=900`;
}

export function getAccessToken(): string | null {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('access_token='))
    ?.split('=')[1];
  return cookie || null;
}

export function clearAccessToken(): void {
  document.cookie = `access_token=; path=/; secure=true; samesite=none; max-age=0`;
}
