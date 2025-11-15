import { Component } from '@angular/core';
import { ErrorModalService } from '../services/error-modal.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent {
  
  message: string | null = null;

  constructor(private errorService: ErrorModalService) {
    // Escuchar cambios de mensaje
    this.errorService.message$.subscribe(msg => {
      this.message = msg;
    });
  }

  close() {
    this.errorService.hide();
  }


}
