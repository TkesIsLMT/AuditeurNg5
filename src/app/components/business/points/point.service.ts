import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import {map, catchError, observeOn, timeout, timeInterval} from "rxjs/operators";
import { ReferentielBaseService } from '../../tools/referentiel-utils/referentiel-base-service';
import { ReferentielPartialLoadingList } from '../../tools/referentiel-utils/referentiel-partial-loading-list';
import { PointDetail } from './point-detail';
import { CheckFieldDTI } from '../../../models/check-field-dti';
import { MessageService } from '../../../services/message.service';
import { ReferentielData } from '../../tools/referentiel-utils/referentiel-data';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PointService  extends ReferentielBaseService{
  private baseUrl = 'point';

  constructor(private http: HttpClient,msg:MessageService) {
    super(msg);
    this.baseUrl = environment.apiurl + this.baseUrl;
  }

  /**
   * Permet d'ajouter / modifier un point de contrôle
   * @param point - Le point à modifier
   */
  savePoint(point :PointDetail){
    return this.http.put(this.baseUrl, point, this.httpOptions);
  }

  deletePoint(point :ReferentielData | PointDetail | number){
    const id = typeof point === "number" ? point : point.Id;
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, this.httpOptions);
  }

  getPoint(id: number): Observable<PointDetail>{
    return this.http.get<PointDetail>(this.baseUrl + '/' + id, this.httpOptions);
  }

  getOrInitPoint(id:number): Observable<PointDetail>{
    if (id){
      return this.getPoint(id);
    } else {
      let obs = new Subject<PointDetail>();
      timer(1).pipe(map(o=>obs.next(new PointDetail())));
      return obs;
    }
  }

  getPoints(): Observable<PointDetail[]>{
    return this.http.get<PointDetail[]>(this.baseUrl, this.httpOptions);
  }

  isCodeUnique(dti: CheckFieldDTI){
    return this.http.post<boolean>(this.baseUrl + '/codeunique', dti, this.httpOptions).pipe(
      catchError(this.handleError<boolean>('isCodeUnique', false))
    );
  }

  findData(filter='', sortColumn='', sortAsc=true, pageNumber=0, pageSize=5) :Observable<ReferentielPartialLoadingList> {
      let httpParams = new HttpParams()
        .set('filter',filter)
        .set('orderby',sortColumn)
        .set('asc', sortAsc.toString())
        .set('pagetoskip',pageNumber.toString())
        .set('pageSize', pageSize.toString());
      let options = { 
        headers: this.httpHeaders,
        params: httpParams
      };
      return this.http.get<ReferentielPartialLoadingList>(this.baseUrl + '/find', options); 
    }
}
