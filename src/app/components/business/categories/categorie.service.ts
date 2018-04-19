import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs/Observable';

import { Categorie } from '../../../models/categorie';
import { ReferentielPartialLoadingList } from '../../tools/referentiel-utils/referentiel-partial-loading-list';
import { ReferentielBaseService } from '../../tools/referentiel-utils/referentiel-base-service';

const httpHeaders = new HttpHeaders({'Content-Type':  'application/json'});

@Injectable()
export class CategorieService implements ReferentielBaseService{

  private baseUrl = 'categorie';

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.apiurl + this.baseUrl;
  }

  getCategories(): Observable<Categorie[]>{
    return this.http.get<Categorie[]>(this.baseUrl, {headers:httpHeaders});
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
        params: httpParams,
        withCredential:true
      };
      return this.http.get<ReferentielPartialLoadingList>(this.baseUrl + '/find', options); 
    }
}
