import { Component, OnInit } from '@angular/core';
import { ElementBase } from '../element-base';
import { ModeleDetail } from '../../modele-detail';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModeleService } from '../../modele.service';
import { TypeElement } from '../../../../../enums/type-element.enum';
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-element-sous-modele-config',
  templateUrl: './element-sous-modele-config.component.html',
  styleUrls: ['./element-sous-modele-config.component.css']
})
export class ElementSousModeleConfigComponent implements OnInit {
  element:ElementBase;
  selectedModele:ModeleDetail;
  sousModeleDispo:ModeleDetail[];
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

  setContext(ctx:{element:ElementBase, sousModele:ModeleDetail[]}){
    this.setElement(ctx.element);
    this.setListe(ctx.sousModele);
  }

  private setElement(e:ElementBase): void {
    this.element = e;
  }
  private setListe(lst:ModeleDetail[]){
    this.sousModeleDispo = lst;
    if (this.element)
      this.selectedModele = _.find(this.sousModeleDispo, ['Id', this.element.ModeleLieId])
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
