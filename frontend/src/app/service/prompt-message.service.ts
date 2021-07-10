import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromptMessageService {

  constructor() { }

  setMessage(message = '') {
    alert(message);
  }
}
