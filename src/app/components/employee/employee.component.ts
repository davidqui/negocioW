import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from '../../services/persona';

@Component({
  selector: 'app-persona',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class PersonaComponent implements OnInit {
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

  // Cambia el alcance de modalService a público
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

  createPersona(event: any) {
    event.preventDefault();

    const newPersona = {
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

    let existingPersona = this.persona.find(persona => persona.id === newPersona.id);
    if (existingPersona) {
      // Incrementar el ID
      newPersona.id = existingPersona.id + 1;
      existingPersona = this.persona.find(persona => persona.id === newPersona.id);
      while (existingPersona) {
        newPersona.id++;
        existingPersona = this.persona.find(persona => persona.id === newPersona.id);
      }
    }


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

    this.personaService.createEmployee(newPersona).subscribe({
      next: response => {
        console.log('La persona se ha creado con éxito');
        // Aquí puedes realizar alguna acción adicional después de guardar la persona en la base de datos, si es necesario.
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
    this.personaAEditar = persona;
    this.modalService.open(this.editModal);
  }



  closeModal() {
    this.modalService.dismissAll();
  }
}
