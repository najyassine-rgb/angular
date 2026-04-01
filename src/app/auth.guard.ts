import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('token');
    router.navigate(['/']);
    return false;
  }

  return true;
};
