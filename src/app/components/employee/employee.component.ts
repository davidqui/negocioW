import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from '../../services/persona';
import { DatePipe } from '@angular/common';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-persona',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class PersonaComponent implements OnInit {
  @ViewChild('createModal') createModal!: TemplateRef<any>;
  @ViewChild('editModal') editModal!: TemplateRef<any>;
  personas: Persona[] = [];
  personaAEditar: Persona | null = null;
  nuevaPersona: Persona = {
    id: 0,
    nombre: '',
    apellido: '',
    salario: 0,
    nit: '',
    correo: '',
    fechaContrato: new Date(),
    fechaNacimiento: new Date(),
    edad: 0
  };

  constructor(@Inject(EmployeeService) private personaService: EmployeeService, public modalService: NgbModal, private datePipe: DatePipe) {}

  /**
   * Obtiene la lista de personas
   * @Author: David Quijano
   * @return void
   */
  ngOnInit(): void {
    this.personaService.getEmployees().subscribe(data => {
      this.personas = data;
    });
    // Llamar a calculateAge para la nueva persona (creación)
    this.calculateAge(this.nuevaPersona.fechaNacimiento.toISOString(), 'nuevaPersona');

    // Llamar a calculateAge para la persona a editar (edición)
    if (this.personaAEditar) {
      this.calculateAge(this.personaAEditar.fechaNacimiento.toISOString(), 'personaAEditar');
    }

  }

  /**
   * Actualiza una persona de la lista de personas y cierra el modal  de edición de personas
   * @Author: David Quijano
   * @return void
   * @param {Persona} persona persona a editar y actualizar en la lista de personas (this.persona)
   */
  guardarCambios() {
    this.personaService.updateEmployee(this.personaAEditar!.id, this.personaAEditar!).subscribe({
      next: response => {
        console.log('Los cambios se han guardado con éxito');
        this.closeModal();
      },
      error: error => {
        console.log('Ha ocurrido un error al guardar los cambios', error);
      }
    });
  }

  /**
   * Crea una nueva persona y la agrega a la lista de personas
   * @Author: David Quijano
   * @returns void
   */
  createPersona() {
    if (!this.validateForm()) {
      return;
    }

    // No necesitas convertir las fechas a cadenas, mantenlas como objetos Date
    const newPersona = this.getPersonaFromForm();

    this.personaService.createEmployee(newPersona).subscribe({
      next: response => {
        console.log('La persona se ha creado con éxito');
        this.personas.push(newPersona);
        this.nuevaPersona = {
          id: 0,
          nombre: '',
          apellido: '',
          salario: 0,
          nit: '',
          correo: '',
          fechaContrato: new Date(),
          fechaNacimiento: new Date(),
          edad: 0
        };
        this.modalService.dismissAll();
      },
      error: error => {
        console.log('Ha ocurrido un error al crear la persona', error);
      }
    });
  }

  /**
   * Calcula la edad de la persona y la asigna a la propiedad 'edad' de la persona
   * @Author: David Quijano
   * @returns void
   */
  calculateAge(birthDate: Date | string, target: 'nuevaPersona' | 'personaAEditar'): void {
    // Asegurarse de que birthDate sea una cadena
    const birthDateStr = typeof birthDate === 'string' ? birthDate : (birthDate as Date).toISOString();
    const birthDateObj = new Date(birthDateStr);
    const today = new Date();
    const age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      if (target === 'nuevaPersona') {
        this.nuevaPersona.edad = age - 1;
      } else if (target === 'personaAEditar') {
        this.personaAEditar!.edad = age - 1;
      }
    } else {
      if (target === 'nuevaPersona') {
        this.nuevaPersona.edad = age;
      } else if (target === 'personaAEditar') {
        this.personaAEditar!.edad = age;
      }
    }
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
   * Elimina una persona de la lista
   * @Author: David Quijano
   * @param id
   */
  deletePersona(id: number) {
    this.personaService.deleteEmployee(id).subscribe({
      next: response => {
        console.log('La persona se ha eliminado con éxito');
        // Filtra la persona por su ID y excluye la que corresponde al ID pasado
        this.personas = this.personas.filter(persona => persona.id !== id);
      },
      error: error => {
        console.log('Ha ocurrido un error al eliminar la persona', error);
      }
    });
  }

  /**
   * Abre el modal de creación de personas
   * @Author: David Quijano
   */
  openCreateModal() {
    // Reiniciar los valores del formulario de nueva persona
    this.nuevaPersona = {
      id: 0,
      nombre: '',
      apellido: '',
      salario: 0,
      nit: '',
      correo: '',
      fechaContrato: new Date(),
      fechaNacimiento: new Date(),
      edad: 0
    };

    // Abrir el modal de creación
    this.modalService.open(this.createModal).result.then((result) => {
      if (result === 'guardar') {
        // Validar el formulario antes de guardar los cambios
        if (!this.validateForm()) {
          return;
        }

        // Crear la nueva persona
        const newPersona = this.getPersonaFromForm();

        this.personaService.createEmployee(newPersona).subscribe({
          next: response => {
            console.log('La persona se ha creado con éxito');
            this.personas.push(newPersona);
          },
          error: error => {
            console.log('Ha ocurrido un error al crear la persona', error);
          }
        });
      }
    }, (reason) => {
      // Modal cerrado sin guardar cambios
      console.log('Modal cerrado sin guardar cambios');
    });
  }

  /**
   * Abre el modal de edición de personas
   * @Author: David Quijano
   * @param persona
   */
  openModal(persona: Persona) {
    this.personaAEditar = persona;
    this.modalService.open(this.editModal);
  }

  /**
   * Cierra el modal
   * @Author: David Quijano
   */
  closeModal() {
    this.modalService.dismissAll();
  }

 validateForm() {
    // Validar el formulario aquí
    return true;
  }

  /**
   * Obtiene la persona del formulario de creación de personas y la dedocker start mi-oracle-dbvuelve
   * @Author: David Quijano
   */
  getPersonaFromForm() {
    const newPersona: Persona = {
      id: this.nuevaPersona.id,
      nombre: this.nuevaPersona.nombre,
      apellido: this.nuevaPersona.apellido,
      salario: this.nuevaPersona.salario,
      nit: this.nuevaPersona.nit,
      correo: this.nuevaPersona.correo,
      fechaContrato: this.nuevaPersona.fechaContrato,
      fechaNacimiento: this.nuevaPersona.fechaNacimiento,
      edad: this.nuevaPersona.edad
    };

    return newPersona;
  }
}
