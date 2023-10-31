import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaComponent } from '../app/components/employee/employee.component';


const routes: Routes = [
  {
    path: 'employee',
    component: PersonaComponent
  },
  {
    path: '',
    redirectTo: '/employee',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
