import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../email.service';
import { switchMap } from 'rxjs';
import { Email } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css'],
})
export class EmailShowComponent implements OnInit {
  email: Email | undefined;
  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService
  ) {}

  // ! way 1 with nested subscribe
  //? Its bad aproutch becose when new route will invoc by the user
  //? and the curent invoc will not reach the target it will coss a delay betwin the requests
  // ngOnInit(): void {
  //   // console.log(this.route);
  //   this.route.params.subscribe(({ id }) => {
  //     // console.log(id);
  //     this.emailService.getEmail(id).subscribe((email) => {
  //       console.log(email);
  //     });
  //   });
  // }

  // ! way 2 with rxjs
  // ? if there will be anotheres invocs from the user the previus will canceld
  // ? and the amswer will be from the last invocet.
  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(({ id }) => {
          return this.emailService.getEmail(id);
        })
      )
      .subscribe((email) => {
        // console.log(email);
        this.email = email;
      });
  }
}
