import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jwtDecode } from "jwt-decode";
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey: string = 'meudinToken';
  private userIdKey: string = 'userId';
  private expirationTime: number = 60 * 60;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  logIn(username: string, password: string): Observable<string> {
    const loginDTO = { username: username, password: password };
    return this.http.post<string>(environment.BASE_URL + '/auth/login', loginDTO);
  }

  setToken(token: string): void {
    // Configurar o cookie para expirar em 1 hora (ajuste conforme necessário)
    // const expirationTime = 60 * 60;
    this.cookieService.setCookie(this.tokenKey, token, this.expirationTime);

    // Decodificar o token para obter informações, incluindo userId
    const decodedToken: any = jwtDecode(token);
    if (decodedToken && decodedToken.userId) {
      this.userIdKey = decodedToken.userId;
      // Armazenar userId no localStorage se desejar persistir
      localStorage.setItem('userId', this.userIdKey.toString());
      this.cookieService.setCookie(this.userIdKey, this.userIdKey.toString(), this.expirationTime);
      if (decodedToken.fullName) {
        const displayName = decodedToken.fullName.split(' ')[0]
        localStorage.setItem('displayName', displayName);
      }
    }
  }

  getToken(): string {
    return this.cookieService.getCookie(this.tokenKey) || '';
  }

  setUserId(userId: string) {
    this.userIdKey = userId;
    this.cookieService.setCookie(this.userIdKey, userId.toString(), this.expirationTime);
    localStorage.setItem('userId', userId.toString());
  }

  getUserId(): number {
    const userIdFromCookie = this.cookieService.getCookie(this.userIdKey);
    return userIdFromCookie ? +userIdFromCookie : 0; // Converte para número
  }

  logOut(): void {
    this.cookieService.deleteCookie(this.tokenKey);
    this.cookieService.deleteCookie(this.userIdKey);
  }
}
