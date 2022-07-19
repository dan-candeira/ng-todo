import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert } from '../models/alert';

@Injectable({ providedIn: 'root' })
export class AlertService {
  alert$: Subject<Alert> = new Subject();

  setAlert(alert: Alert): void {
    this.alert$.next(alert);
  }

  getAlert(): Observable<Alert> {
    return this.alert$.asObservable();
  }
}
