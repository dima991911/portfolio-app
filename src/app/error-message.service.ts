import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  displayMessage: boolean = false;
  errorMessage: string = 'Error';

  constructor() { }

  setErrorMessage(message) {
    this.errorMessage = message;
  }

  showHideMessage(bool) {
    this.displayMessage = bool;
  }
}
