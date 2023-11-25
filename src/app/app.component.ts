import { Component, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from './services/persona';
import { EmployeeService } from './services/employee.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'negocioW';
  @ViewChild('editModal') editModal!: TemplateRef<any>;
  private subscription: Subscription | null = null;

  personas: Persona[] = [];

  personaAEditar: Persona = {
    id: 0,
    nombre: 'Nombre',
    apellido: 'Apellido',
    salario: 0,  // Agrega valores adecuados
    nit: '123456',
    correo: 'correo@example.com',
    fechaContrato: new Date(),
    fechaNacimiento: new Date(),
    edad: 0,
    categoria: 'Categoria',  // Agrega valores adecuados
    cargo: 'Cargo'  // Agrega valores adecuados
  };


  constructor(public modalService: NgbModal, private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.personas = data;
    }, (error) => {
      console.error('Error loading employees', error);
    });
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

  getEmployees() {
    this.subscription = this.employeeService.getEmployees().subscribe(
      data => this.personas = data,
      error => console.error(error)
    );
  }

  ngOnDestroy() {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
  }

  dismissAll() {
    this.modalService.dismissAll();
  }
}
