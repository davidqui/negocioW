import { Persona } from './../../services/persona';
import { Component, OnInit, Inject,  ViewChild, TemplateRef  } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';  // Cambia esto a PersonaService si tienes uno
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',  // Considera cambiar esto a 'app-persona'
  templateUrl: './employee.component.html',  // Considera cambiar esto a './persona.component.html'
  styleUrls: ['./employee.component.scss']  // Considera cambiar esto a './persona.component.scss'
})
export class EmployeeComponent implements OnInit {  // Considera cambiar esto a PersonaComponent
  @ViewChild('editModal') editModal!: TemplateRef<any>;
  Persona: any[] = [];  // Considera cambiar esto a persona

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

  constructor(@Inject(EmployeeService) private employeeService: EmployeeService, public modalService: NgbModal) {  // Cambia esto a PersonaService si tienes uno
    this.Persona = [];  // Considera cambiar esto a persona
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {  // Cambia esto a getPersonas si tienes uno
      this.Persona = data;  // Considera cambiar esto a persona
    });
  }

  guardarCambios() {
    this.employeeService.updateEmployee(this.personaAEditar.id, this.personaAEditar).subscribe({
      next: response => {
        console.log('Los cambios se han guardado con éxito');
      },
      error: error => {
        console.log('Ha ocurrido un error al guardar los cambios', error);
      }
    });
  }

  createEmployee() {
    this.employeeService.createEmployee(this.nuevaPersona).subscribe({
      next: response => {
        console.log('El empleado se ha creado con éxito');
        this.Persona.push(this.nuevaPersona);
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
        console.log('Ha ocurrido un error al crear el empleado', error);
      }
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: response => {
        console.log('El empleado se ha eliminado con éxito');
        this.Persona = this.Persona.filter(persona => persona.id !== id);
      },
      error: error => {
        console.log('Ha ocurrido un error al eliminar el empleado', error);
      }
    });
  }

  openModal() {
    this.modalService.open(this.editModal);
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
