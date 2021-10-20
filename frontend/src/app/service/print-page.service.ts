import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintPageService {

  constructor() { }

  printPage() {
    window.print()
  }
}
