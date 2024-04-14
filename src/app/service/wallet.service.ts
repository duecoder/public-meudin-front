import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WalletIncomeOutcome } from '../shared/WalletIncomeOutcome';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(
    private http: HttpClient
  ) { }

  getUserBalance(): Observable<number> {
    return this.http.get<number>(environment.BASE_URL + '/wallet/balance');
  }

  getMonthBalance(): Observable<WalletIncomeOutcome> {
    return this.http.get<WalletIncomeOutcome>(environment.BASE_URL + '/wallet/month');
  }

  getAllTimeBalance(): Observable<WalletIncomeOutcome> {
    return this.http.get<WalletIncomeOutcome>(environment.BASE_URL + '/wallet/alltime');
  }
}
