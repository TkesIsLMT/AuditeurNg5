import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import {map} from "rxjs/operators";
import { PointControle } from '../../../models/point-controle';

import * as _ from "lodash";
import { PointSynthesePartialList } from './models/point-synthese-partial-list';

const httpHeaders = new HttpHeaders({'Content-Type':  'application/json'});

@Injectable()
export class PointService {

  private baseUrl = 'point';

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.apiurl + this.baseUrl;
  }

  getPoints(): Observable<PointControle[]>{
    let options = {
      headers: httpHeaders,
    }
    return this.http.get<PointControle[]>(this.baseUrl, options);
  }

  findPoints(filter='', sortColumn='', sortAsc=true, pageNumber=1, pageSize=5) :Observable<PointSynthesePartialList> {
    //(string filter, string orderby, bool asc, int pagetoskip, int pagesize)
      let httpParams = new HttpParams()
        .set('filter',filter)
        .set('orderby',sortColumn)
        .set('asc', sortAsc.toString())
        .set('pagetoskip',pageNumber.toString())
        .set('pageSize', pageSize.toString());
      let options = { 
        headers:httpHeaders,
        params: httpParams};
      return this.http.get<PointSynthesePartialList>(this.baseUrl + '/find', options); 
    }
  
    // count():Observable<number>{
    //   return this.http.get<number>(this.baseUrl + '/count', {headers:httpHeaders});
    // }
}
