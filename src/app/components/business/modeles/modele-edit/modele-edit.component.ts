import { Component, OnInit } from '@angular/core';
import { ModeleDetail } from '../modele-detail';
import { ModeleService } from '../modele.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CacheGetter } from '../../../../services/cache-getter';
import { ElementBase } from '../element-base';
import { CheckFieldDTI } from '../../../../models/check-field-dti';
import { WindowService } from '../../../../services/window.service';
import { UgoNode } from '../../../../utils/ugo-node';
import * as _ from 'lodash';
import { TypeElement } from '../../../../enums/type-element.enum';
import { PointDetail } from '../../points/point-detail';
import { PointService } from '../../points/point.service';
import { ElementService } from '../element.service';

@Component({
  selector: 'app-modele-edit',
  templateUrl: './modele-edit.component.html',
  styleUrls: ['./modele-edit.component.css'],
  providers:[ElementService]
})
export class ModeleEditComponent implements OnInit {
  private isConceptionVisible:boolean = true;
  private isApercuVisible:boolean = false;
  private isLocalisationActive = false;
  pending:boolean = false;
  modele:ModeleDetail = new ModeleDetail(0);
  unites:number[];
  racine:ElementBase = new ElementBase(TypeElement.Modele);

  

  constructor(private modSrv:ModeleService, private pointSrv:PointService, private eleSrv: ElementService, private route:ActivatedRoute, private router: Router, private window:WindowService) { }

  ngOnInit() {
    this.racine.ModeleId = this.modele.Id;
    this.route.paramMap.pipe(
      switchMap((p:ParamMap)=>this.modSrv.getOrInitModele(p.get('id')))
    ).subscribe((res:ModeleDetail)=> {
      this.initElementService(res);
      this.modele = res
      this.unites = this.modele.UniteTravailId ? [this.modele.UniteTravailId]:[];

      let ele = this.genererArbre(_.map(this.modele.Elements,o=>{
        let d = new ElementBase(o.TypeElement);
        d.reload(o);
        return d;
      }));
      _.each(ele, e => this.racine.addChildElement(e));
    });
  }

  genererArbre(eles:ElementBase[]):ElementBase[]{
    let arbre = new Array<ElementBase>();
    _.each(eles, a=>{
      if (a.ElementParentId){
        let parent = _.find(eles, ['Id', a.ElementParentId]);
        if (parent){
          parent.addChildElement(a);
        }
      } else{
        arbre.push(a);
      }
    });
    return arbre;
  }

  onUnitesChange(value:number[]){
    this.modele.UniteTravailId = value.length>0 ? value[0]:0;
    this.initElementService();
  }

  private initElementService(modele:ModeleDetail = this.modele) {
    this.eleSrv.setCurrentData(modele.Id, modele.UniteTravailId);
  }

  onAddElement(value:ElementBase){
    value.ModeleId = this.modele.Id;
    this.racine.addChild(value);
  }
  
  isCodeUniqueFn(value: any){
    let p : CheckFieldDTI = {
      ExcludeId:this.modele.Id,
      Field:'modele.code',
      Value:value
    };
    return this.modSrv.isCodeUnique(p);
  }
  isCodeUnique = this.isCodeUniqueFn.bind(this);
  
  onBack(){
    this.window.goToPrevious();
  }

  private parcourirBranche(source:ElementBase[], before: (ele:ElementBase)=>void, after: (ele:ElementBase)=>void){
    _.each(source, s=>{
      before(s);
      this.parcourirBranche(s.childs as ElementBase[], before, after);
      after(s);
    });
  }

  private ordonnerBranche(branche:ElementBase[]){
    let i = 0;
    _.each(branche, e=>e.Ordre = i++);
  }

  private formaterElements():ElementBase[]{
    let data = _.cloneDeep(this.racine.childs as ElementBase[]);
    this.ordonnerBranche(data);
    this.parcourirBranche(data, ele => {}, ele => {
      ele.ElementsEnfants = ele.childs as ElementBase[];
      this.ordonnerBranche(ele.ElementsEnfants);
      ele.childs = undefined;
      ele.parent = undefined;
    });
    return data;
  }

  private toggleApercu(){
    this.isApercuVisible = !this.isApercuVisible;
    this.isLocalisationActive = this.isLocalisationActive && this.isApercuVisible && this.isConceptionVisible;
    this.manageLocalisation();
  }
  private toggleConception(){
    this.isConceptionVisible = !this.isConceptionVisible;
    this.isLocalisationActive = this.isLocalisationActive && this.isApercuVisible && this.isConceptionVisible;
    this.manageLocalisation();
  }
  private toggleLocalisation(){
    this.isLocalisationActive = !this.isLocalisationActive;
    this.manageLocalisation();
  }

  private manageLocalisation() {
    if (this.isLocalisationActive) {
      this.eleSrv.startActivation();
    }
    else {
      this.eleSrv.stopActivation();
    }
  }

  onSubmit(myForm){
    this.pending = true;

    this.modele.Elements = this.formaterElements(); 
    this.modSrv.saveModele(this.modele).subscribe();
  }
}
