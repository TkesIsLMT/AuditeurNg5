import { Component, OnInit } from '@angular/core';
import { ElementBase } from '../../element-base';
import { ModeleDetail } from '../../modele-detail';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModeleService } from '../../modele.service';
import { TypeElement } from '../../../../../enums/type-element.enum';
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { ElementService } from '../../element.service';
@Component({
  selector: 'app-element-sous-modele-config',
  templateUrl: './element-sous-modele-config.component.html',
  styleUrls: ['./element-sous-modele-config.component.css']
})
export class ElementSousModeleConfigComponent implements OnInit {
  element:ElementBase;
  selectedModele:ModeleDetail;
  modeles$:Observable<ModeleDetail[]>;
  private eleSrv:ElementService;
  
  constructor(private modalActive: NgbActiveModal, private modeleSrv:ModeleService) { 
    this.setElement(new ElementBase(TypeElement.Modele)); 
  }

  ngOnInit() {
  }

  compareModele(a:ModeleDetail,b:ModeleDetail){
    return a === b || (a && b && a.Id===b.Id);
  }

  notModele(){
    return _.isUndefined(this.selectedModele);
  }

  setContext(ctx:{ele:ElementBase,srv:ElementService}){
    this.setElement(ctx.ele);
    this.setElementService(ctx.srv);
  }

  private setElementService(srv:ElementService): void {
    this.eleSrv = srv;
    this.modeles$ = this.eleSrv.modelesDisponible.data.pipe(tap(o=>this.selectedModele = _.find(o,['Id',this.element.ModeleLieId])));
  }

  private setElement(e:ElementBase): void {
    this.element = e;
  }

  submit(form:NgForm){
    if (form.invalid)
      return;
//mapper data
    this.element.ModeleLieId = this.selectedModele.Id;
    this.element.ModeleLie = this.selectedModele;
    this.modalActive.close(this.element);
  }
  cancel(key:string){
    this.modalActive.dismiss(key);
  }

}
