import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiStatusService {

  constructor(
    private http: HttpClient
  ) { }

  checkAPIStatus(): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + '/api-status');
  }
}
