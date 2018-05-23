import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs/Observable';

import { ReferentielPartialLoadingList } from '../../tools/referentiel-utils/referentiel-partial-loading-list';
import { ReferentielBaseService } from '../../tools/referentiel-utils/referentiel-base-service';
import { CategorieDetail } from './categorie-detail';
import { tap, catchError, shareReplay, map, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { MessageService } from '../../../services/message.service';
import { CheckFieldDTI } from '../../../models/check-field-dti';
import { ReferentielData } from '../../tools/referentiel-utils/referentiel-data';
import { UgoTreeNode } from '../../tools/ugo-check-tree/ugo-tree-node';

import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';
import { CacheGetter } from '../../../services/cache-getter';

@Injectable()
export class CategorieService extends ReferentielBaseService{
  private baseUrl = 'categorie';
  categorieInCache: CacheGetter<CategorieDetail[]>;
  constructor(private http: HttpClient, msg: MessageService) { 
    super(msg);
    this.baseUrl = environment.apiurl + this.baseUrl;
    this.categorieInCache = new CacheGetter<CategorieDetail[]>(this.getCategories.bind(this));
  }
  
  /**
   * Permet d'ajouter / modifier une catégorie
   * @param categorie - La catégorie à modifier
   */
  saveCategorie(categorie :CategorieDetail){
    this.categorieInCache.forceReload();
    return this.http.put(this.baseUrl, categorie, this.httpOptions);
  }

  deleteCategorie(categorie :ReferentielData | CategorieDetail | number){
    this.categorieInCache.forceReload();
    const id = typeof categorie === "number" ? categorie : categorie.Id;
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, this.httpOptions);
  }

  isCodeUnique(dti: CheckFieldDTI){
    return this.http.post<boolean>(this.baseUrl + '/codeunique', dti, this.httpOptions).pipe(
      catchError(this.handleError<boolean>('isCodeUnique', false))
    );
  }

  private getCategories(): Observable<CategorieDetail[]>{
    return this.http.get<CategorieDetail[]>(this.baseUrl, this.httpOptions);
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

  changeCategorieState(categorie:CategorieDetail, newState:boolean) {
    this.categorieInCache.forceReload();
    const url: string = this.baseUrl +  (newState?'/enable/':'/disable/') + categorie.Id
    return this.http.post<boolean>(url, undefined, this.httpOptions);
  }


  get arbreCategorie(){
    return this.categorieInCache.data.pipe(
      map(o => _.map(o,(item)=> new UgoTreeNode(item.Id.toString(),item.Libelle,item)) ), /*transpose en ugotreenode*/
      map(o => //on refait la relation parent/enfant pour EACH noeud et on retourne un FILTER pour ne prendre que les racines (parent = null)
        _.filter( _.each(o,(item) => {
          const mere = _.find(o, ['id', _.isNil(item.value.CategorieMereId) ? '0':item.value.CategorieMereId.toString()]);
          if (mere)
            mere.addChild(item);
        }), f=> _.isNil(f.parent)))
    );
  }
}
