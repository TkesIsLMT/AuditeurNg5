import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import {map} from "rxjs/operators";
import { PointControle } from '../../../models/point-controle';

import * as _ from "lodash";
import { SynthesePartialList } from '../../../shared/synthese/synthese-partial-list';
import { SyntheseService } from '../../../shared/synthese/synthese-service';

const httpHeaders = new HttpHeaders({'Content-Type':  'application/json'});

@Injectable()
export class PointService  implements SyntheseService{

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

  findData(filter='', sortColumn='', sortAsc=true, pageNumber=0, pageSize=5) :Observable<SynthesePartialList> {
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
      return this.http.get<SynthesePartialList>(this.baseUrl + '/find', options); 
    }
}
