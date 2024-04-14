import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpendCategory } from '../shared/SpendCategory';
import { environment } from 'src/environments/environment';
import { ResponseJson } from '../shared/ResponseJson';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient
  ) { }

  getCategoriesByUserId(): Observable<SpendCategory[]> {
    return this.http.get<SpendCategory[]>(environment.BASE_URL + '/categories');
  }

  existsByUserAndCategoryId(categoryId: number): Observable<boolean> {
    return this.http.get<boolean>(environment.BASE_URL + `/categories/categoryCheck/${categoryId}`);
  }

  registerNewCategory(userId: number, category: string): Observable<ResponseJson> {
    const newCategoryDTO = { userId: userId, description: category };
    return this.http.post<ResponseJson>(environment.BASE_URL + '/categories/register', newCategoryDTO);
  }

  deleteCategory(id: number): Observable<ResponseJson> {
    return this.http.delete<ResponseJson>(environment.BASE_URL + `/categories/${id}`)
  }
}
