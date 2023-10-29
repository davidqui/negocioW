import { Component, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'negocioW';
  @ViewChild('editModal') editModal!: TemplateRef<any>;

  constructor(private modalService: NgbModal) {}

  openModal() {
    this.modalService.open(this.editModal);
  }
}
