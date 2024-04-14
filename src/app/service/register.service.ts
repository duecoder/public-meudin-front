import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseJson } from '../shared/ResponseJson';
import { RegisterObj } from '../shared/RegisterObj';
import { PersonalForm } from '../shared/PersonalForm';
import { LoginForm } from '../shared/LoginForm';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient
  ) { }

  register(personalForm: PersonalForm, loginForm: LoginForm): Observable<ResponseJson> {
    const obj = new RegisterObj(personalForm, loginForm);
    return this.http.post<ResponseJson>(environment.BASE_URL + '/user/register', obj);
  }

  verifyExistentCpf(cpf: number): Observable<boolean> {
    return this.http.get<boolean>(environment.BASE_URL + `/user/cpf/${cpf}`);
  }
}
