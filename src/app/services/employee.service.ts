import { Empleado } from './empleado';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:8183/api/personas';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Empleado[]> {
    this.http.get<Empleado[]>(this.apiUrl).subscribe(
      data => {
        console.log('getEmployees data:', data);
      },
      error => {
        console.log('getEmployees error:', error);
      }
    );
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  getEmployeeById(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.apiUrl}/${id}`);
  }

  createEmployee(employee: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.apiUrl, employee);
  }

  updateEmployee(id: number, employee: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
