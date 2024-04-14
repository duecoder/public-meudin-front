// cookie.service.ts
import { Injectable } from '@angular/core';
import { CookieService as AngularCookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor(private angularCookieService: AngularCookieService) {}

  setCookie(key: string, value: string, expires: number): void {
    this.angularCookieService.set(key, value, expires, '/', undefined, undefined, 'Strict');
    document.cookie = `${key}=${value}; HttpOnly; Secure`; // Adicione a configuração HttpOnly
  }

  getCookie(key: string): string | undefined {
    return this.angularCookieService.get(key);
  }

  deleteCookie(key: string): void {
    this.angularCookieService.delete(key, '/');
  }
}
