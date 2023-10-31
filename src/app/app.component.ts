import { Component, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from './services/persona';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'negocioW';
  @ViewChild('editModal') editModal!: TemplateRef<any>;

  personas: Persona[] = [];

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

  constructor(public modalService: NgbModal, private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.personas = data;
      },
      (error) => {
        console.error('Error loading employees', error);
      }
    );
  }

  openModal(persona: Persona, i: number) {
    this.personaAEditar = { ...persona };
    this.modalService.open(this.editModal, { centered: true });
  }

  guardarCambios() {
    this.employeeService.updateEmployee(this.personaAEditar.id, this.personaAEditar).subscribe(
      (updatedPersona) => {
        console.log(updatedPersona);
        this.dismissAll();
      },
      (error) => {
        console.error('Error updating persona', error);
      }
    );
  }

  dismissAll() {
    this.modalService.dismissAll();
  }
}
