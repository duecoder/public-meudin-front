import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Spend } from '../shared/Spend';
import { environment } from 'src/environments/environment';
import { HomeSpends } from '../shared/HomeSpends';
import { ChartData } from '../shared/ChartData';

@Injectable({
  providedIn: 'root'
})
export class SpendsService {

  constructor(
    private http: HttpClient
  ) { }

  getSpends(): Observable<Spend[]> {
    return this.http.get<Spend[]>(environment.BASE_URL + '/spends');
  }

  getHomeSpendsDto(): Observable<HomeSpends> {
    return this.http.get<HomeSpends>(environment.BASE_URL + '/spends/home')
  }

  getChartData(date: string): Observable<ChartData[]> {
    return this.http.get<ChartData[]>(environment.BASE_URL + `/spends/chart/${date}`);
  }

  addEditSpend(data: Spend, selectedSpend: Spend | any): Observable<Spend> {
    if (selectedSpend == null) {
      return this.http.post<Spend>(environment.BASE_URL + '/spends/save', data);
    } else {
      return this.http.put<Spend>(environment.BASE_URL + '/spends/edit', data);
    }
  }

  deleteSpend(id: number): Observable<void> {
    return this.http.delete<void>(environment.BASE_URL + `/spends/${id}`);
  }

  deleteSpends(ids: number[]): Observable<void> {
    return this.http.delete<void>(environment.BASE_URL + '/spends/many', { body: ids });
  }
}
