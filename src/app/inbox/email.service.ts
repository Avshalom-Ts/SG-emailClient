import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from './email';

interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  rootUrl = 'https://api.angular-email.com';
  constructor(private http: HttpClient) {}

  getEmails() {
    //! Dont need to put {withCredentials:true} becouse we use the interceptore globaly for the app
    return this.http.get<EmailSummary[]>(this.rootUrl + '/emails');
  }

  getEmail(id: string) {
    return this.http.get<Email>(`${this.rootUrl}/emails/${id}`);
  }
}
