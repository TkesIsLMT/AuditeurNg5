import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs/Observable';

import { Categorie } from '../../../models/categorie';
import { CategorieSynthesePartialList } from "./models/categorie-synthese-partial-list";

const httpHeaders = new HttpHeaders({'Content-Type':  'application/json'});

@Injectable()
export class CategorieService {

  private baseUrl = 'categorie';

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.apiurl + this.baseUrl;
  }

  getCategories(): Observable<Categorie[]>{
    return this.http.get<Categorie[]>(this.baseUrl, {headers:httpHeaders});
  }

  findCategories(filter='', sortColumn='', sortAsc=true, pageNumber=1, pageSize=5) :Observable<CategorieSynthesePartialList> {
      let httpParams = new HttpParams()
        .set('filter',filter)
        .set('orderby',sortColumn)
        .set('asc', sortAsc.toString())
        .set('pagetoskip',pageNumber.toString())
        .set('pageSize', pageSize.toString());
      let options = { 
        headers:httpHeaders,
        params: httpParams};
      return this.http.get<CategorieSynthesePartialList>(this.baseUrl + '/find', options); 
    }
}
