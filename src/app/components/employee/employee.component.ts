import { Persona } from './../../services/persona';
import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-persona',
  templateUrl: './employee.component.html',  // Considera cambiar esto a './persona.component.html'
  styleUrls: ['./employee.component.scss']  // Considera cambiar esto a './persona.component.scss'
})
export class PersonaComponent implements OnInit {
  @ViewChild('editModal') editModal!: TemplateRef<any>;
  persona: Persona[] = [];

  personaAEditar: Persona = {
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

  constructor(@Inject(EmployeeService) private personaService: EmployeeService, public modalService: NgbModal) {
    this.personaAEditar = {
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
  }

  ngOnInit(): void {
    this.personaService.getEmployees().subscribe(data => {
      this.persona = data;
    });
  }

  guardarCambios() {
    this.personaService.updateEmployee(this.personaAEditar.id, this.personaAEditar).subscribe({
      next: response => {
        console.log('Los cambios se han guardado con éxito');
      },
      error: error => {
        console.log('Ha ocurrido un error al guardar los cambios', error);
      }
    });
  }

  createPersona(event: FormEvent) {
    if (event) {
      event.preventDefault();
    }

    this.personaService.createEmployee(this.nuevaPersona).subscribe({
      next: response => {
        console.log('La persona se ha creado con éxito');
        this.persona.push(this.nuevaPersona);
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
      },
      error: error => {
        console.log('Ha ocurrido un error al crear la persona', error);
      }
    });
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

  openModal(persona: Persona) {
    if (!persona) {
      return;
    }

    this.personaAEditar = persona;
    this.modalService.open(this.editModal);
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
