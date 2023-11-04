import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonaComponent } from './components/employee/employee.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [AppComponent, PersonaComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule, NgbModule, BsDropdownModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
