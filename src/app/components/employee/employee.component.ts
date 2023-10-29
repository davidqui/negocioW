import { Component, OnInit, Inject } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit{

  employee: any[] = []; // Inicializa la lista employee como un arreglo vacío
  nuevaPersona: any;
  personaAEditar: any = null;

  constructor(@Inject(EmployeeService) private employeeService: EmployeeService) {
    this.nuevaPersona = {};
    this.personaAEditar = {};
    this.employee = [];
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employee = data;
    });
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(employee => {
      this.employee = employee;
    });
  }

  crearPersona() {
    this.employeeService.createEmployee(this.nuevaPersona).subscribe(persona => {
      // La persona se creó exitosamente. Puedes, por ejemplo, agregarla a tu lista:
      this.employee.push(persona);
    });
  }

  editarPersona(i: number) {
    this.personaAEditar = this.employee[i];
  }

  guardarCambios() {
    this.employeeService.updateEmployee(this.personaAEditar.id, this.personaAEditar).subscribe(() => {
      // Los cambios se guardaron exitosamente. Aquí puedes, por ejemplo, ocultar el formulario:
      this.personaAEditar = null;
    });
  }

  eliminarPersona(i: number) {
    if (confirm('¿Estás seguro de que quieres eliminar a esta persona?')) {
      this.employeeService.deleteEmployee(this.employee[i].id).subscribe(() => {
        // La persona se eliminó exitosamente. Aquí puedes, por ejemplo, eliminarla de tu lista:
        this.employee.splice(i, 1);
      });
    }
  }
}
