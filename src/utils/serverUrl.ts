/**
 * Returns the base URL for internal server-side API requests.
 *
 * Checks for a JELLYSEERR_URL environment variable first (useful when the
 * backend runs on a different host, e.g. Vercel deployments pointing at an
 * external Jellyseerr instance). Falls back to the existing HOST/PORT
 * convention used for co-located deployments.
 */
export function getServerBaseUrl(): string {
  if (process.env.JELLYSEERR_URL) {
    return process.env.JELLYSEERR_URL.replace(/\/$/, '');
  }

  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 5055;

  return `http://${host}:${port}`;
}
