import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface usernameAvailableResponse {
  available: boolean;
}

export interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignupResponse {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string) {
    // return this.http.post<{ available: boolean }>(
    return this.http.post<usernameAvailableResponse>(
      `${this.rootUrl}/auth/username`,
      {
        username,
      }
    );
  }

  signup(credentials: any) {
    return this.http.post<any>(this.rootUrl + '/auth/signup', credentials);
  }
}
