import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorModalService } from '../services/error-modal.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent {

  message: string | null = null;
  redirectTo: string | null = null;

  constructor(
    private errorService: ErrorModalService,
    private router: Router
  ) {
    this.errorService.message$.subscribe(msg => this.message = msg);
    this.errorService.redirect$.subscribe(route => this.redirectTo = route);
  }

  close() {
    this.errorService.hide();

    // Si hay una redirección configurada → navegar
    if (this.redirectTo) {
      this.router.navigate([this.redirectTo]);
    }
  }
}
