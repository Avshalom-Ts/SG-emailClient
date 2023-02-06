import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Email } from './email';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root',
})
export class EmailResolverService implements Resolve<Email> {
  constructor(private emailService: EmailService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { id } = route.params;
    return this.emailService.getEmail(id);
  }
}
