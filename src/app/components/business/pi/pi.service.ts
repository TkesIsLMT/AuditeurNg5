import { Injectable } from '@angular/core';
import { ServiceBase } from '../../../services/service-base';
import { MessageService } from '../../../services/message.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { UgoTreeNode } from '../../tools/ugo-check-tree/ugo-tree-node';
import * as _ from 'lodash';
import { PiDetail } from './pi-detail';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PiService extends ServiceBase{
  private baseUrl = 'pi';
  
  constructor(private http: HttpClient, msg: MessageService) { 
    super(msg);
    this.baseUrl = environment.apiurl + this.baseUrl;
  }

  getPI(){
    return this.http.get<PiDetail[]>(this.baseUrl, this.httpOptions);
  }
  
  getPiElement(webid):Observable<PiDetail> {
    return this.http.get<PiDetail>(this.baseUrl + "/" + webid);
  }
  getPiRelation(webid, typeEle):Observable<PiDetail[]> {
    return this.http.get<PiDetail[]>(this.baseUrl + "/" + webid + "/" + typeEle + "/relation");
  }
  getPiBranche(webid):Observable<PiDetail[]> {
    return this.http.get<PiDetail[]>(this.baseUrl + "/" + webid + "/branche");
  }
  getPiValeur(webid):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${webid}/value`);
  }
}
