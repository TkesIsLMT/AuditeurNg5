import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs/Observable';

import { Categorie } from '../../../models/categorie';
import { ReferentielPartialLoadingList } from '../../tools/referentiel-utils/referentiel-partial-loading-list';
import { ReferentielBaseService } from '../../tools/referentiel-utils/referentiel-base-service';
import { CategorieDetail } from './categorie-detail';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { MessageService } from '../../../services/message.service';
import { CheckFieldDTI } from '../../../models/check-field-dti';
import { ReferentielData } from '../../tools/referentiel-utils/referentiel-data';

const httpHeaders = new HttpHeaders({'Content-Type':  'application/json'});
const httpOptions = { headers: httpHeaders};

@Injectable()
export class CategorieService implements ReferentielBaseService{
  private baseUrl = 'categorie';
  constructor(private http: HttpClient, private msg: MessageService) { 
    this.baseUrl = environment.apiurl + this.baseUrl;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.msg.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * Permet d'ajouter / modifier une catégorie
   * @param categorie - La catégorie à modifier
   */
  saveCategorie(categorie :CategorieDetail){
      return this.http.put(this.baseUrl, categorie, httpOptions);
      // .pipe(
      //   tap(()=>console.log(`updated categorie id = ${categorie.Id}`))
      //   catchError(this.handleError<any>('updateCategorie'))
      // );
  }

  deleteCategorie(categorie :ReferentielData | CategorieDetail | number){
    const id = typeof categorie === "number" ? categorie : categorie.Id;
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  isCodeUnique(dti: CheckFieldDTI){
    return this.http.post<boolean>(this.baseUrl + '/codeunique', dti, httpOptions).pipe(
      catchError(this.handleError<boolean>('isCodeUnique', false))
    );
  }

  getCategories(): Observable<Categorie[]>{
    return this.http.get<Categorie[]>(this.baseUrl, httpOptions);
  }

  findData(filter='', sortColumn='', sortAsc=true, pageNumber=0, pageSize=5) :Observable<ReferentielPartialLoadingList> {
      let httpParams = new HttpParams()
        .set('filter',filter)
        .set('orderby',sortColumn)
        .set('asc', sortAsc.toString())
        .set('pagetoskip',pageNumber.toString())
        .set('pageSize', pageSize.toString());
      let options = { 
        headers:httpHeaders,
        params: httpParams
      };
      return this.http.get<ReferentielPartialLoadingList>(this.baseUrl + '/find', options); 
    }
}
