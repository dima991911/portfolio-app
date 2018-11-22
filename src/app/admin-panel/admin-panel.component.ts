import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { ContactMessageService } from '../contact-message.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  dialogs: any = [];

  constructor(
      private userService: UserService,
      private contactMessageService: ContactMessageService,
      private router: Router
  ) { }

  ngOnInit() {
    this.contactMessageService.getAllDialogs().subscribe((res) => {
        console.log(res);
        this.dialogs = res;
    }, (error) => {
        this.userService.removeToken();
        this.router.navigate(['home']);
    });
  }

  sendMessage(msg, dialog) {
    let keyDialog = dialog.key;
    this.contactMessageService.sendMessage(msg.value, keyDialog).subscribe((res) => {
      console.log(res['message']);
      msg.value = '';
      dialog.messages.unshift(res['message']);
    });
  }

}
