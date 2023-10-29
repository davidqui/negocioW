import { Persona } from './persona';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:8183/api/personas';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Persona[]> {
    this.http.get<Persona[]>(this.apiUrl).subscribe(
      data => {
        console.log('getEmployees data:', data);
      },
      error => {
        console.log('getEmployees error:', error);
      }
    );
    return this.http.get<Persona[]>(this.apiUrl);
  }

  getEmployeeById(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/${id}`);
  }

  createEmployee(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.apiUrl, persona);
  }

  updateEmployee(id: number, persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${this.apiUrl}/${id}`, persona);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
