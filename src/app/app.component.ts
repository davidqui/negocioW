import { Component, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonaComponent } from '../app/components/employee/employee.component';
import { Persona } from '../app/services/persona';
import { EmployeeService } from '../app/services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'negocioW';
  @ViewChild('editModal') editModal!: TemplateRef<any>;

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

  // Cambia la propiedad modalService a pública
  constructor(public modalService: NgbModal, private employeeService: EmployeeService) {}

  openModal(persona: Persona) {
    this.personaAEditar = { ...persona }; // Crea una copia de la persona para evitar la edición en tiempo real
    this.modalService.open(this.editModal);
  }

  // Agrega este método público
  public dismissAll(): void {
    this.modalService.dismissAll();
  }

  guardarCambios() {
    this.employeeService.updateEmployee(this.personaAEditar.id, this.personaAEditar).subscribe(
      (updatedPersona) => {
        console.log(updatedPersona);
        this.dismissAll(); // Llama al nuevo método público aquí
      },
      (error) => {
        console.error('Error updating persona', error);
      }
    );
  }
}
