import { Injectable } from '@angular/core';
import { ServiceBase } from '../../../services/service-base';
import { MessageService } from '../../../services/message.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CacheGetter } from '../../../services/cache-getter';
import { UniteTravail } from './unite-travail';
import { map } from 'rxjs/operators';
import { UgoTreeNode } from '../../tools/ugo-check-tree/ugo-tree-node';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UniteTravailService extends ServiceBase{
  private baseUrl = 'unitetravail';
  uniteInCache: CacheGetter<UniteTravail[]>;
  
  constructor(private http: HttpClient, msg: MessageService) { 
    super(msg);
    this.baseUrl = environment.apiurl + this.baseUrl;
    this.uniteInCache = new CacheGetter<UniteTravail[]>(this.getUniteTravail.bind(this));
  }

  private getUniteTravail(){
    return this.http.get<UniteTravail[]>(this.baseUrl, this.httpOptions);
  }
  
  // getUnite(id :number):Observable<UniteTravail>{
  //   return this.uniteInCache.data.pipe(map(o=> _.find(o, ['Id', id])));
  // }

  get arbreUniteTravail(){
    return this.uniteInCache.data.pipe(
      map(o => _.map(_.groupBy(o,'RegroupementId'), gp => {
        let nodeGp = new UgoTreeNode('Regr' + gp[0].RegroupementId, gp[0].RegroupementLibelle,undefined,true,false,false,false,true);
        _.each(gp, (ut)=> nodeGp.addChild(new UgoTreeNode(ut.Id.toString(), ut.Libelle, ut)));
        return nodeGp;
      })));
  }

}
