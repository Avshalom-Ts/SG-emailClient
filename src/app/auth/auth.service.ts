import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { FormControl } from '@angular/forms';

interface usernameAvailableResponse {
  available: boolean;
}

export interface SignupCredentials {
  username?: string | null;
  password?: string | null;
  passwordConfirmation?: string | null;
}

export interface SignupResponse {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string) {
    return this.http.post<usernameAvailableResponse>(
      `${this.rootUrl}/auth/username`,
      {
        username,
      }
    );
  }

  signup(credentials: SignupCredentials) {
    return this.http
      .post<SignupResponse>(this.rootUrl + '/auth/signup', credentials)
      .pipe(
        tap(() => {
          this.signedin$.next(true);
        })
      );
  }
  checkAuth() {
    return this.http.get(`${this.rootUrl}/auth/signedin`).pipe(
      tap((response) => {
        // console.log(response);
      })
    );
  }
}
