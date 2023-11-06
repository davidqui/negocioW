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


  /**
   *Obtiene la lista de personas del API REST
   * @Author: David Quijano
   * @returns {Observable<Persona[]>}
   */
  getEmployees(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.apiUrl);
  }

  /**
   * Obtiene una persona por su id
   * @Author: David Quijano
   * @param id
   */
  getEmployeeById(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea una persona en el API REST
   * @Author: David Quijano
   * @param persona
   */
  createEmployee(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.apiUrl, persona);
  }

  /**
   * Actualiza una persona en el API REST por su id y la persona a actualizar en el body
   * @Author: David Quijano
   * @param id
   * @param persona
   */
  updateEmployee(id: number, persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${this.apiUrl}/${id}`, persona);
  }

  /**
   * Elimina una persona en el API REST por su id
   * @Author: David Quijano
   * @param id
   */
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
