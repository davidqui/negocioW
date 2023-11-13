import { Component, Inject, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Cliente } from '../../services/models/cliente.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  clientes: Cliente[] = [];
  clientAEditar: Cliente | null = null;
  nuevoCliente: {
    preferencias: string;
    puntuacion: number;
    fechaRegistro: Date;
    correo: string;
    categoria: string;
    notas: string;
    direccion: string;
    id: number;
    ultimaCompra: Date;
    telefono: string;
  } = {
    id: 0,
    correo: '',
    telefono: '',
    direccion: '',
    preferencias: '',
    puntuacion: 0,
    fechaRegistro: new Date(),
    ultimaCompra: new Date(),
    categoria: '',
    notas: ''
  };

  constructor(@Inject(ClientService) private clientService: ClientService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.clientService.getCliente().subscribe(data => {
      this.clientes = data;
    });
  }

  /**
   * Actualiza un cliente de la lista de clientes y cierra el modal de edición de clientes
   * @Author: David Quijano
   * @return void
   */
  createClient() {
    const newClient: Cliente = this.getClientFromForm();
    this.clientService.createCliente(newClient).subscribe(
      data => {
        this.clientes.push(data);
        this.nuevoCliente = {
          id: 0,
          correo: '',
          telefono: '',
          direccion: '',
          preferencias: '',
          puntuacion: 0,
          fechaRegistro: new Date(),
          ultimaCompra: new Date(),
          categoria: '',
          notas: ''
        };
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * Obtiene los datos del formulario y los asigna a un objeto de tipo Cliente
   * @Author: David Quijano
   * @returns {Cliente}
   */
  getClientFromForm(): Cliente {
    return {
      clienteId: 0,  // Asigna un valor adecuado para clienteId
      personaId: 0,
      telefono: this.nuevoCliente.telefono,
      direccion: this.nuevoCliente.direccion,
      preferencias: this.nuevoCliente.preferencias,
      puntuacion: this.nuevoCliente.puntuacion,
      fechaRegistro: this.nuevoCliente.fechaRegistro,
      ultimaCompra: this.nuevoCliente.ultimaCompra,
      categoria: this.nuevoCliente.categoria,
      notas: this.nuevoCliente.notas,
      persona: {  // Agrega la propiedad persona con valores adecuados
        id: 0,
        nombre: '', // Agrega el nombre que corresponda
        apellido: '', // Agrega el apellido que corresponda
        fechaNacimiento: new Date(), // Agrega la fecha de nacimiento que corresponda
        nit: '', // Agrega el nit que corresponda
        edad: 0, // Agrega la edad que corresponda
        fechaContrato: new Date(), // Agrega la fecha de contrato que corresponda
        correo: '', // Agrega el correo que corresponda
        salario: 0 // Agrega el salario que corresponda
      }
    };
  }



  /**
   * Formatea la fecha como 'yyyy-MM-dd'
   * @Author: David Quijano
   * @param date - Fecha a formatear
   * @returns {string} - Fecha formateada
   */
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
