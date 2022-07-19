import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert } from '../models/alert';

@Injectable({ providedIn: 'root' })
export class AlertService {
  alert$: Subject<Alert | null> = new Subject();

  setAlert(alert: Alert): void {
    this.alert$.next(alert);

    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  getAlert(): Observable<Alert | null> {
    return this.alert$.asObservable();
  }

  clearAlert(): void {
    this.alert$.next(null);
  }
}
