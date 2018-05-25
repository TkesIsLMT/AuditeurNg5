import { Component, OnInit } from '@angular/core';
import { ModeleDetail } from '../modele-detail';
import { ModeleService } from '../modele.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CacheGetter } from '../../../../services/cache-getter';
import { ElementBase } from '../elements/element-base';
import { CheckFieldDTI } from '../../../../models/check-field-dti';

@Component({
  selector: 'app-modele-edit',
  templateUrl: './modele-edit.component.html',
  styleUrls: ['./modele-edit.component.css']
})
export class ModeleEditComponent implements OnInit {
  modele:ModeleDetail = new ModeleDetail();
  unites:number[];
  elements:ElementBase[]=[];

  constructor(private modSrv:ModeleService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((p:ParamMap)=>this.modSrv.getOrInitModele(p.get('id')))
    ).subscribe((res:ModeleDetail)=> {
      this.modele = res
      this.unites = [this.modele.UniteTravailId];
    });
  }

  onUnitesChange(value:number[]){
    this.modele.UniteTravailId = value.length>0 ? value[0]:0;
  }

  onAddElement(value:ElementBase){
    this.modele.Elements.push(value);
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
}
