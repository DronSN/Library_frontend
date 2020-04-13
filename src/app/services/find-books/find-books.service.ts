import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Book} from '../../model/book';

@Injectable({
  providedIn: 'root'
})
export class FindBooksService {

  constructor(private http: HttpClient) { }

  getBooks(search: string): Observable<Book[]> {
    if (!search.trim()) {
      return of([]);
    }
    return this.http.get<Book[]>(`/api/books/?search=${search}`);
  }
}
