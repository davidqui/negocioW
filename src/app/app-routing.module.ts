import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaComponent } from '../app/components/employee/employee.component';
import { ProviderComponent } from '../app/components/provider/provider.component';
import { ClientComponent } from '../app/components/client/client.component';


const routes: Routes = [
  {
    path: 'employee',
    component: PersonaComponent
  },
  {
    path: 'proveedores',
    component: ProviderComponent
  },
  {
    path: 'clientes',
    component: ClientComponent
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
