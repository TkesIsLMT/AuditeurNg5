import { Injectable } from '@angular/core';
import { ReferentielBaseService } from '../../tools/referentiel-utils/referentiel-base-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MessageService } from '../../../services/message.service';
import { environment } from '../../../../environments/environment';
import { ReferentielPartialLoadingList } from '../../tools/referentiel-utils/referentiel-partial-loading-list';
import { Observable } from 'rxjs/Observable';
import { UniteTravailService } from '../unite-travail/unite-travail.service';
import { ModeleDetail } from './modele-detail';
import { map, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import { ModeleListComponent } from './modele-list/modele-list.component';
import "rxjs/add/observable/zip";
import { UniteTravail } from '../unite-travail/unite-travail';
import { Subject } from 'rxjs/Subject';
import { timer } from 'rxjs/observable/timer';
import { of } from 'rxjs/observable/of';
import { CheckFieldDTI } from '../../../models/check-field-dti';
import { CacheGetter } from '../../../services/cache-getter';

@Injectable()
export class ModeleService extends ReferentielBaseService {
  private baseUrl = 'modeleinspection';
  modeleInCache: CacheGetter<ModeleDetail[]>;

  constructor(private http: HttpClient, msg: MessageService, private utSrv: UniteTravailService) { 
    super(msg);
    this.baseUrl = environment.apiurl + this.baseUrl;
    this.modeleInCache= new CacheGetter<ModeleDetail[]>(this.getModeles.bind(this));
  }

  findData(filter='', sortColumn='', sortAsc=true, pageNumber=0, pageSize=5): Observable<ReferentielPartialLoadingList> {
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

    let getData$ = this.http.get<ReferentielPartialLoadingList>(this.baseUrl + '/find', options);

    return Observable.zip(getData$, this.utSrv.uniteInCache.data).pipe(map(o=>{
      _.each(o[0].PageData, mod => this.mapUniteTravail(mod as ModeleDetail, o[1]))
      return o[0];
    }));
  }
  
  private mapUniteTravail(modele:ModeleDetail, uts:UniteTravail[]) {
    modele.UniteTravail = _.find(uts, ut=>ut.Id === modele.UniteTravailId);
    if (modele.UniteTravail)
      modele.UniteLibelle = modele.UniteTravail.Libelle;
  }

  private getModeles():Observable<ModeleDetail[]>{
    return this.http.get<ModeleDetail[]>(this.baseUrl, this.httpOptions);
  }

  getModele(id:number) :Observable<ModeleDetail>{
    return this.http.get<ModeleDetail>([this.baseUrl, id].join('/'), this.httpOptions);
  }

  getOrInitModele(id:string) :Observable<ModeleDetail>{
    if (!_.isNaN(id) && id !== null){
      return this.getModele(parseInt(id));
    } else {
      return of(new ModeleDetail());
    }
  }

  isCodeUnique(dti: CheckFieldDTI){
    return this.http.post<boolean>(this.baseUrl + '/codeunique', dti, this.httpOptions).pipe(
      catchError(this.handleError<boolean>('isCodeUnique', false))
    );
  }
  
  saveModele(dti: ModeleDetail){
    this.modeleInCache.forceReload();    
    return this.http.put(this.baseUrl, dti, this.httpOptions);
  }
}
