import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator } from '@angular/forms';
import { map, catchError, of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}
  // validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
  //BildIn
  // }
  validate = (control: AbstractControl<any, any>) => {
    const { value } = control;
    // console.log(this.http);
    // return this.http
    //   .post<any>('https://api.angular-email.com/auth/username', {
    //     username: value,
    //   })//Move To auth.service
    //Insted
    return this.authService.usernameAvailable(value).pipe(
      map((value) => {
        // console.log(value);
        // if (value.available) {
        //   return null;
        // }//Anyway geting true if entering map
        return null;
      }),
      catchError((err) => {
        // console.log(err);
        if (err.error.username) {
          return of({ nonUniqueUsername: true });
        } else {
          return of({ noConnection: true });
        }
      })
    );
  };
}
