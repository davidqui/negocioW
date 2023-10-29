import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getPersonas().subscribe(
      (data: any) => {
        console.log('Personas:', data);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
}
