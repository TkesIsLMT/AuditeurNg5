import { Injectable } from '@angular/core';
import { TypeElement } from '../../../enums/type-element.enum';
import { ElementBase } from './element-base';
import * as _ from 'lodash';
import { PointService } from '../points/point.service';
import { map, merge, switchMap, tap, observeOn, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { zip } from 'rxjs/observable/zip';
import { CacheGetter } from '../../../services/cache-getter';
import { PointDetail } from '../points/point-detail';
import { ModeleService } from './modele.service';
import { ModeleDetail } from './modele-detail';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ElementService {
  private currentModele:number = 0;
  private currentUT:number = 0;
  isActivationOn:boolean = false;
  activeElement$: Subject<ElementBase>;
  hasSousModele$: Observable<boolean>;
  pointsDisponible:CacheGetter<PointDetail[]>;
  modelesDisponible:CacheGetter<ModeleDetail[]>;


  constructor(private pointSrv:PointService, private modeleSrv: ModeleService) {
    this.pointsDisponible = new CacheGetter<PointDetail[]>(()=>pointSrv.pointInCache.data.pipe(map(res=>_.filter(res, function(o){
      return _.indexOf(o.ListeUnite, this.currentUT)>=0
    }.bind(this)))));
    this.modelesDisponible = new CacheGetter<ModeleDetail[]>(()=>modeleSrv.modeleInCache.data.pipe(map(res=>_.filter(res, function(o){
      return o.UniteTravailId === this.currentUT && o.Id !== this.currentModele
    }.bind(this)))));
    this.hasSousModele$ = this.modelesDisponible.data.pipe(map(res => res.length>0), shareReplay(1));
    this.activeElement$ = new Subject<ElementBase>();
  }

  setCurrentData(idMod:number, idUt: number){
    if (_.isNaN(idMod) || _.isNil(idMod)){
      this.currentModele = 0;
    } else {
      this.currentModele = idMod;  
    }
    if (_.isNaN(idUt) || _.isNil(idUt)){
      this.currentUT = 0;
    } else {
      this.currentUT = idUt;  
    }
    this.pointsDisponible.forceReload();
    this.modelesDisponible.forceReload();
  }

  startActivation(){
    this.isActivationOn = true;
  }
  
  stopActivation(){
    this.activeElement$.next(new ElementBase(TypeElement.Modele));
    this.isActivationOn = false;
  }

  activateElement(ele:ElementBase){
    if (this.isActivationOn)
      this.activeElement$.next(ele);
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
  
  getIntituleElement(ele:ElementBase) {
    let s:string = '';
    if (ele.Libelle){
      s = ele.Libelle;
    } else if (ele.PointControle){
      s = ele.PointControle.Libelle;
    } else {
      s = "";
    }
    return s;
  }
}
