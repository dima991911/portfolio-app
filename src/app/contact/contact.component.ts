import { Component, OnInit, OnDestroy } from '@angular/core';

import { ContactMessageService } from '../contact-message.service';
import { ErrorMessageService } from '../error-message.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  messages: any = [];
  message: string;
  load: boolean = false;
  pending: boolean = false;
  messageLoadInterval;

  constructor(
      private contactMessageService: ContactMessageService,
      private errorMessageService: ErrorMessageService
  ) { }

  ngOnInit() {
    this.loadMessage();
  }

  loadMessage() {
    let dialogKey = this.contactMessageService.getKeyDialog();

    if(!dialogKey) {
        this.messages = [];
    } else {
        this.load = true;
        this.contactMessageService.getMessages().subscribe((res) => {
            console.log(res['status']);
            if (res['status'] === 'INCORRECT_KEY_DIALOG') {
                this.contactMessageService.removeKeyDialog();
                this.messages = [];
            } else {
                this.messages = res['messages'];
                this.messageLoadInterval = setInterval(this.loadNewMessage.bind(this), 2000);
            }
            this.load = false;
        });
    }
  }

  sendMessage(){
    let keyDialog = this.contactMessageService.getKeyDialog();
    let message = this.message;
    this.message = '';

    this.contactMessageService.sendMessage(message, keyDialog).subscribe((res) => {
        if(res['dialog_key']) {
            this.contactMessageService.setKeyDialog(res['dialog_key']);
            this.messages.unshift(res['message']);
            this.messageLoadInterval = setInterval(this.loadNewMessage.bind(this), 2000);
        }
    }, (error) => {
        this.errorMessageService.setErrorMessage('Something went wrong');
        this.errorMessageService.showHideMessage(true);
        setTimeout(() => {
          this.errorMessageService.showHideMessage(false);
        }, 5000)

    });
  }

  loadNewMessage() {
      if(!this.pending) {
          this.pending = true;

          let lastMessage = this.messages[0];
          this.contactMessageService.loadNewMessage(lastMessage).subscribe((res) => {
              if(res['status'] === 'OK') {
                  this.messages.unshift(res['messages'][0]);
              }
              this.pending = false;
          }, (error) => {
              if (error.status !== 429) {
                  this.errorMessageService.setErrorMessage('Something went wrong');
                  this.errorMessageService.showHideMessage(true);
                  setTimeout(() => {
                      this.errorMessageService.showHideMessage(false);
                      this.pending = false;
                  }, 5000);
              }
          });
      }
  }

  ngOnDestroy(): void {
      clearInterval(this.messageLoadInterval);
  }
}
