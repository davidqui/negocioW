import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from '../../services/persona';
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
  persona: Persona[] = [];
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

  constructor(@Inject(EmployeeService) private personaService: EmployeeService, public modalService: NgbModal) {}

  ngOnInit(): void {
    this.personaService.getEmployees().subscribe(data => {
      this.persona = data;
    });
  }

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

  createPersona() {
    if (!this.validateForm()) {
      return;
    }

    // No necesitas convertir las fechas a cadenas, mantenlas como objetos Date
    const newPersona = this.getPersonaFromForm();

    this.personaService.createEmployee(newPersona).subscribe({
      next: response => {
        console.log('La persona se ha creado con éxito');
        this.persona.push(newPersona);
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


  formatDate(date: Date): string {
    // Formatear la fecha como 'yyyy-MM-dd'
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  deletePersona(id: number) {
    this.personaService.deleteEmployee(id).subscribe({
      next: response => {
        console.log('La persona se ha eliminado con éxito');
        this.persona = this.persona.filter(persona => persona.id !== id);
      },
      error: error => {
        console.log('Ha ocurrido un error al eliminar la persona', error);
      }
    });
  }
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
            this.persona.push(newPersona);
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

  openModal(persona: Persona) {
    this.personaAEditar = persona;
    this.modalService.open(this.editModal);
  }

  closeModal() {
    this.modalService.dismissAll();
  }

 validateForm() {
    // Validar el formulario aquí
    return true;
  }

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
