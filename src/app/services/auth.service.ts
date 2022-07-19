import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    console.log(this.getToken());
    return !!this.getToken();
  }

  // call to api to POST user login
  login(data = null): void {
    // if api return true save some state about user authentication
    // using local storage is the easy way to simulate this
    localStorage.setItem('todoToken', uuidv4());
    this.router.navigate(['']);
  }

  logout(): void {
    localStorage.removeItem('todoToken');
    this.router.navigate(['login']);
  }

  getToken(): string {
    return localStorage.getItem('todoToken') || '';
  }
}
