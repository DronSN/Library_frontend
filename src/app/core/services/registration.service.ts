import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginData} from '../model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  isValidUsername(username: string) {
    const params = new HttpParams({
      fromObject: {
        login: username
      }
    });
    return this.http.get('/api/users/isvalid/login', { params });

  }

  addNewRegularUser(data: LoginData): Observable<void> {
    return this.http.post<void>('/api/users/new/registration', data);
  }

}

