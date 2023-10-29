import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:8183/api/personas/'; // URL de autenticación

  constructor(private http: HttpClient) { }

  getPersonas(): Observable<any> {
    return this.http.get(this.authUrl);
  }
}
