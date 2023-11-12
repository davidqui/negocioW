import {Component, OnInit} from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit{

  constructor(private clientService: ClientService) { }
  ngOnInit(): void {
  }

}
