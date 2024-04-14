import { UserAccount } from 'src/app/shared/UserAccount';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  private userLoggedIn = new BehaviorSubject<boolean>(this.isUserLoggedIn());
  userLoggedIn$ = this.userLoggedIn.asObservable();

  setUserLoggedIn(bool: boolean): void {
    localStorage.setItem('userLoggedIn', bool.toString());
    this.userLoggedIn.next(bool);
  }

  logOut(): void {
    // Aqui eu salvo o activeIndex antes de limpar o localStorage
    // Pra voltar esse valor depois, e manter o accordion no estado deixado mesmo após logout
    const activeIndexHomeBool = localStorage.getItem("introBool");
    localStorage.clear();
    localStorage.setItem("introBool", activeIndexHomeBool ? activeIndexHomeBool : '');
    this.setUserLoggedIn(false);
  }

  private isUserLoggedIn(): boolean {
    const storedValue = localStorage.getItem('userLoggedIn');
    return storedValue ? JSON.parse(storedValue) : false;
  }

  getUserData(userId: number): Observable<UserAccount> {
    return this.http.get<UserAccount>(environment.BASE_URL + `/user/${userId}`);
  }

  updateUserData(dto: UserAccount): Observable<boolean> {
    return this.http.put<boolean>(environment.BASE_URL + '/user/update', dto);
  }
}
