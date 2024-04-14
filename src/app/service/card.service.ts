import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../shared/Card';
import { environment } from 'src/environments/environment';
import { ResponseJson } from '../shared/ResponseJson';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private http: HttpClient
  ) { }

  getUserCards(): Observable<Card[]> {
    return this.http.get<Card[]>(environment.BASE_URL + '/card/cards');
  }

  addEditCard(card: Card, selectedCard: Card | any): Observable<ResponseJson> {
    // Desconstruo meu card, pois o obj do front tem o invoice integrado para facilitar a view
    // E para enviar ao spring, preciso retirar a invoice para ser salvo corretamente
    // O atributo invoice é um retorno do back, e não um input
    const { invoices, ...cardWithoutInvoice } = card;

    if (selectedCard == null) {
      return this.http.post<ResponseJson>(environment.BASE_URL + '/card/save', cardWithoutInvoice);
    } else {
      return this.http.put<ResponseJson>(environment.BASE_URL + '/card/edit', cardWithoutInvoice);
    }
  }

  payCardInvoice(id: number): Observable<ResponseJson> {
    const obj = { invoiceId: id };
    return this.http.put<ResponseJson>(environment.BASE_URL + '/card/pay', obj);
  }

  deleteCard(id: number): Observable<void> {
    return this.http.delete<void>(environment.BASE_URL + `/card/delete/${id}`);
  }
}
