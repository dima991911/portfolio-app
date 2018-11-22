import { Component, OnInit } from '@angular/core';
import {
    state,
    animate,
    trigger,
    transition,
    style
} from '@angular/animations';

import { UserService } from './user.service';
import { ErrorMessageService } from './error-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
      trigger('fadeAnimation', [
          state('*', style({
              right: '3%'
          })),
          transition(':enter', [
              style({right: '-50%'}),
              animate('0.5s ease-in')
          ]),
          transition(':leave', [
              animate('0.5s ease-in', style({right: '-50%'}))
          ])
      ])
  ]
})
export class AppComponent implements OnInit {

  constructor(
      public userService: UserService,
      public errorMessageService: ErrorMessageService
  ) {}

  ngOnInit(): void {
      let token = this.userService.getToken();
      if(token) {
          this.userService.checkUser().subscribe((res) => {

          }, (error) => {
              this.userService.removeToken();
          });
      }
  }
}
