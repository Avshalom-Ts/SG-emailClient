import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
