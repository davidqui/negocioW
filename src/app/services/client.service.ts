import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Persona} from "./persona";
import { Cliente } from './models/cliente.model';


// Resto del código de tu servicio


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:8183/api/clientes';

  /**
   * Constructor
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista de clientes del API REST (GET) http://localhost:8183/api/clientes
   * @Author: David Quijano
   * @returns {Observable<Cliente[]>}
   */
  getCliente(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  /**
   * Obtiene un cliente por su id (GET) http://localhost:8183/api/clientes/{id}
   * @Author: David Quijano
   * @param id
   */
  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un cliente (POST) http://localhost:8183/api/clientes
   * @Author: David Quijano
   * @param cliente
   */
  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  /**
   * Formatea la fecha en formato 'yyyy-MM-dd'
   * @Author: David Quijano
   * @param date
   */
  formatDate(date: Date): string {
    // Formatear la fecha como 'yyyy-MM-dd'
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  /**
   * Actualiza un cliente por su id (PUT) http://localhost:8183/api/clientes/{id}
   * @Author: David Quijano
   * @param id
   * @param cliente
   */
  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
  }

  /**
   * Elimina un cliente por su id (DELETE) http://localhost:8183/api/clientes/{id}
   * @Author: David Quijano
   * @param id
   */
  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
