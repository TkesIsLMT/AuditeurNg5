import { Injectable } from '@angular/core';
import { TypeElement } from '../../../../../enums/type-element.enum';
import { ElementBase } from './element-base';
import * as _ from 'lodash';
import { PointService } from '../../../points/point.service';
import { map, merge } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ModeleService } from '../../modele.service';
import { zip } from 'rxjs/observable/zip';
import { CacheGetter } from '../../../../../services/cache-getter';
import { PointDetail } from '../../../points/point-detail';

@Injectable()
export class ElementService {
  private currentUT:number = 0;
  pointsDisponible:CacheGetter<PointDetail[]>


  constructor(private pointSrv:PointService, private modeleSrv: ModeleService) {
    this.pointsDisponible = new CacheGetter<PointDetail[]>(()=>pointSrv.pointInCache.data.pipe(map(res=>_.filter(res, function(o){
      return _.indexOf(o.ListeUnite, this.currentUT)>=0
    }.bind(this)))));
  }

  setCurrentUniteTravail(idUt: number){
    this.currentUT = idUt;
    if (_.isNaN(idUt) || _.isNil(idUt)){
      this.currentUT = 0;
    } else {
      this.currentUT = idUt;  
    }
    this.pointsDisponible.forceReload();
  }

  sousTypeAutorise(type:TypeElement) {
    switch (type) {
      case TypeElement.Modele: return [];
      case TypeElement.Menu: return [TypeElement.MenuItem];
      case TypeElement.MenuItem: return [TypeElement.Modele, TypeElement.Menu, TypeElement.Tableau, TypeElement.Cellule];
      case TypeElement.Tableau: return [TypeElement.Ligne];
      case TypeElement.Ligne: return [TypeElement.Cellule];
      case TypeElement.Cellule: return [];
      case TypeElement.Schema: return [TypeElement.Cellule];
    }
  }

  bindElement(ele:ElementBase): Observable<ElementBase>{
    let obsPoint = this.pointSrv.pointInCache.data.pipe(map(o=>{
      ele.PointControle = _.find(o,['Id', ele.PointControleId])
      return ele;
    }));
    let obsModele = this.modeleSrv.modeleInCache.data.pipe(map(o=>{
      ele.ModeleLie = _.find(o,['Id', ele.ModeleLieId])
      return ele;
    }));
    return zip(obsPoint,obsModele).pipe(map(o=>o[0]));
  }

  isTypeAutorise(typeParent:TypeElement, typeEnfant:TypeElement){
    const tab = this.sousTypeAutorise(typeParent);
    return _.indexOf(tab,typeEnfant) >=0;
  }

  addNouvelElement(parent:ElementBase, type: TypeElement, enfantAuto:boolean = false):ElementBase{
    let newEle = new ElementBase(type);
    if (parent) {
      if (!this.isTypeAutorise(parent.TypeElement,type))
        throw 'Arborescence de type non autorisé';
      parent.addChildElement(newEle);
    }
    if (enfantAuto) {
      let tab = this.sousTypeAutorise(type);
      if (tab.length === 1){
        this.addNouvelElement(newEle, tab[0], true);
      }
    } 
    return newEle;
  }

  deleteElement(ele:ElementBase){
    if (ele.parent){
      ele.parent.childs.splice(_.indexOf(ele.parent.childs,ele),1);
    }
    ele.parent = undefined;
  }

  clearElement(ele:ElementBase){
    if (ele.childs){
      _.each(_.clone(ele.childs),e=>this.deleteElement(e as ElementBase));
    }
  }

  upElement(ele:ElementBase){
    this.moveElement(ele,true);
  }
  downElement(ele:ElementBase){
    this.moveElement(ele,false);
  }

  private moveElement(ele:ElementBase, up:boolean){
    if (ele.parent && ele.parent.childs) {
      let chLen = ele.parent.childs.length;
      let idx = _.indexOf(ele.parent.childs, ele);
      let sens = 0;
      if (up && idx > 0){
        sens = -1;
      } else if (!up && idx < chLen){
        sens = 1;
      }
      if (sens !== 0){
        let tmp = ele.parent.childs[idx + sens];
        ele.parent.childs[idx + sens] = ele;
        ele.parent.childs[idx] = tmp;
      }
    }
  }
  
}
