/**
 * Browser Cookie Management Utilities
 * Handles reading, writing, and removing cookies with expiration and security attributes.
 */

export function setCookie(name: string, value: string, days: number = 7, path: string = '/'): void {
  try {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:';
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=${path};SameSite=Lax${isSecure ? ';Secure' : ''}`;
  } catch (err) {
    console.error('Failed to set cookie:', err);
  }
}

export function getCookie(name: string): string | null {
  try {
    if (typeof document === 'undefined') return null;
    const nameEQ = encodeURIComponent(name) + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  } catch {
    return null;
  }
}

export function deleteCookie(name: string, path: string = '/'): void {
  try {
    if (typeof document === 'undefined') return;
    document.cookie = `${encodeURIComponent(name)}=;path=${path};expires=Thu, 01 Jan 1970 00:00:00 GMT;max-age=0;SameSite=Lax`;
  } catch (err) {
    console.error('Failed to delete cookie:', err);
  }
}
