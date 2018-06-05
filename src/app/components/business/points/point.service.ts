import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import {map, catchError, observeOn, timeout, timeInterval, takeUntil, shareReplay} from "rxjs/operators";
import { ReferentielBaseService } from '../../tools/referentiel-utils/referentiel-base-service';
import { ReferentielPartialLoadingList } from '../../tools/referentiel-utils/referentiel-partial-loading-list';
import { PointDetail } from './point-detail';
import { CheckFieldDTI } from '../../../models/check-field-dti';
import { MessageService } from '../../../services/message.service';
import { ReferentielData } from '../../tools/referentiel-utils/referentiel-data';
import { Subject } from 'rxjs/Subject';
import { CacheGetter } from '../../../services/cache-getter';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PointService  extends ReferentielBaseService{
  private baseUrl = 'point';
  uniteInCache: CacheGetter<string[]>;
  pointInCache: CacheGetter<PointDetail[]>;

  constructor(private http: HttpClient,msg:MessageService) {
    super(msg);
    this.baseUrl = environment.apiurl + this.baseUrl;
    this.uniteInCache = new CacheGetter<string[]>((this.getUnitesMesure.bind(this)));
    this.pointInCache = new CacheGetter<PointDetail[]>((this.getPoints.bind(this)));
  }
  private getUnitesMesure(): Observable<string[]>{
    return this.http.get<string[]>(this.baseUrl + "/unitemesure", this.httpOptions);
  }

  savePoint(point :PointDetail){
    this.uniteInCache.forceReload();
    this.pointInCache.forceReload();
    return this.http.put(this.baseUrl, point, this.httpOptions);
  }

  deletePoint(point :ReferentielData | PointDetail | number){
    this.uniteInCache.forceReload();
    this.pointInCache.forceReload();
    const id = typeof point === "number" ? point : point.Id;
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, this.httpOptions);
  }

  changePointState(point:PointDetail, newState:boolean) {
    const url: string = this.baseUrl +  (newState?'/enable/':'/disable/') + point.Id
    return this.http.post<boolean>(url, undefined, this.httpOptions);
  }

  getPoint(id: number): Observable<PointDetail>{
    return this.http.get<PointDetail>(this.baseUrl + '/' + id, this.httpOptions);
  }

  getOrInitPoint(id:number): Observable<PointDetail>{
    if (id){
      return this.getPoint(id);
    } else {
      return of(new PointDetail());
    }
  }

  private getPoints(): Observable<PointDetail[]>{
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
