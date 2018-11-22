import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ErrorMessageService } from '../error-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  load: boolean = false;

  constructor(
      private userService: UserService,
      private errorMessageService: ErrorMessageService,
      private router: Router
  ) { }

  ngOnInit() {
    let token = this.userService.getToken();
    if(token) {
        this.router.navigate(['admin-panel']);
    } else {
        this.formLogin = new FormGroup({
            'login': new FormControl('', [
                Validators.required
            ]),
            'password': new FormControl('', [
                Validators.required
            ])
        })
    }
  }

  loginUser() {
    this.load = true;
    let user = this.formLogin.getRawValue();

    this.userService.loginUser(user).subscribe((res) => {
        this.userService.setToken(res['token']);
        this.router.navigate(['admin-panel']);
        this.load = false;
    }, (error) => {
        this.load = false;
        this.errorMessageService.setErrorMessage('Email or password invalid');
        this.errorMessageService.showHideMessage(true);
        setTimeout(() => {
            this.errorMessageService.showHideMessage(false);
        }, 5000)
    });
  }

}
