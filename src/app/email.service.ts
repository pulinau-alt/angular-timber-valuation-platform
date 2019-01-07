import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import {Observable} from 'rxjs';

  
// import 'rxjs/add/operator/map';
// node_modules\rxjs\add\operator

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:  Http) { }
  sendEmail(argparam) {
    // return this.http.post('httpspakainfo.com/email/', argparam)
    // .map(res => res.json())
    // //  map((response: any) => response.json())
    // //  .pipe(map((response: any) => response.json()));
    // .catch(this._errorHandler);
  }
  private _errorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error')
  }
}

// //email
// //send email in angular 6 EmailService
// @Injectable()
// export class EmailService {
//   //constructor(private http:  Http) { }
//   // sendEmail(argparam) {
//   //   return this.http.post('httpspakainfo.com/email/', argparam)
//   //   .map(res => res.json())
//   //   .catch(this._errorHandler);
//   // }
//   private _errorHandler(error: Response) {
//     console.error(error);
//     return Observable.throw(error || 'Server Error')
//   }
// }