import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorModalService {

  private messageSubject = new BehaviorSubject<string | null>(null);
  private redirectSubject = new BehaviorSubject<string | null>(null);

  message$ = this.messageSubject.asObservable();
  redirect$ = this.redirectSubject.asObservable();

  show(message: string, redirectTo: string | null = null) {
    this.messageSubject.next(message);
    this.redirectSubject.next(redirectTo);
  }

  hide() {
    this.messageSubject.next(null);
    this.redirectSubject.next(null);
  }
}
