import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/models';

// import { User } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // Real API example:
  register(email: string, password: string): Observable<User> {
    debugger;
    // Change this URL to your real API endpoint!
    return this.http.post('/api/auth/register', { email, password })as Observable<User>;
  }

  // Mock version for testing/demo:
  // register(email: string, password: string): Observable<any> {
  //   if (email && password) {
  //     return of({ success: true }).pipe(delay(1000)); // Simulate success
  //   } else {
  //     return throwError(() => new Error('Registration failed')).pipe(delay(1000));
  //   }
  // }
}
