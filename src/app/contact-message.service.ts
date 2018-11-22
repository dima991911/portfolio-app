import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ContactMessageService {
  // api: string = 'http://api-weather/api/';
  api: string = 'https://api.skochko.net/api/';

  constructor(
      private http: HttpClient,
      private userService: UserService
  ) { }

  getKeyDialog() {
    if(!localStorage.getItem('key_dialog')) {
      return null;
    }
    return localStorage.getItem('key_dialog');
  }

  setKeyDialog(key) {
    localStorage.setItem('key_dialog', key);
  }

  removeKeyDialog() {
    localStorage.removeItem('key_dialog');
  }

  getMessages() {
    let dialogKey = this.getKeyDialog();
    return this.http.get(`${this.api}messages?dialog_key=${dialogKey}`);
  }

  sendMessage(msg, key) {
    let data = {
      message: msg,
      dialog_key: key,
      token: this.userService.getToken()
    };

    return this.http.post(`${this.api}send-message`, data);
  }

  getAllDialogs() {
    let token = this.userService.getToken();
    return this.http.get(`${this.api}get-all-dialogs?token=${token}`);
  }

  loadNewMessage(lastMessage) {
    return this.http.get(`${this.api}load-message?dialog_key=${this.getKeyDialog()}&id=${lastMessage.id}`);
  }
}
