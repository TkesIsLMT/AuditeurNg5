import { Observable } from "rxjs/Observable";
import { MessageService } from "./message.service";
import { of } from "rxjs/observable/of";
import { HttpHeaders } from "@angular/common/http";

export abstract class ServiceBase {
    constructor(protected msg:MessageService) {
        
    }

    protected httpHeaders = new HttpHeaders({'Content-Type':  'application/json'});
    protected httpOptions = { headers: this.httpHeaders};
    
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.msg.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
