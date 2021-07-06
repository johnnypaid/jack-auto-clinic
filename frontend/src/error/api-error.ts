import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class ApiError {

  public handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      // client side errors
      console.error('An error occurred:', error.error.message);
    } else {
      // server side errors
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
