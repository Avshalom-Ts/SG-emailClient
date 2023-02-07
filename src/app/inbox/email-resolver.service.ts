import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Email } from './email';
import { EMPTY } from 'rxjs';
import { EmailService } from './email.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailResolverService implements Resolve<Email> {
  constructor(private emailService: EmailService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { id } = route.params;
    return this.emailService.getEmail(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/inbox/not-found');
        return EMPTY;
      })
    );
  }
}
