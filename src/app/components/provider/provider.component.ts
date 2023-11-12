import {Component, OnInit} from '@angular/core';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit{

  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
  }

}
