import { Component, OnInit, Input } from '@angular/core';
import { ElementBase } from '../element-base';
import { TypeElement } from '../../../../../../enums/type-element.enum';
import { ElementService } from '../element.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { ElementSousModeleConfigComponent } from '../element-sous-modele-config/element-sous-modele-config.component';
import { ModeleDetail } from '../../../modele-detail';

@Component({
  selector: 'app-element-sous-modele',
  templateUrl: './element-sous-modele.component.html',
  styleUrls: ['./element-sous-modele.component.css']
})
export class ElementSousModeleComponent implements OnInit {
  @Input() element:ElementBase;
  @Input() sousModele:ModeleDetail[];

  resume:string;
  constructor(private eleSrv:ElementService, private modalService:NgbModal) { }

  ngOnInit() {
    if (this.element.PointControle){
      this.initResume();
    } else {
      this.eleSrv.bindElement(this.element).subscribe(e=>this.initResume());
    }
  }

  private initResume() {
    this.resume = "Sous modèle : ";
    this.resume += this.element.ModeleLie ? this.element.ModeleLie.Libelle : this.element.Libelle;
  }  

  do(action:string){
    if (action === 'edit') 
      this.openEdit();
  }

  openEdit() {
    const mdForm = this.modalService.open(ElementSousModeleConfigComponent);
    mdForm.componentInstance.setContext({element:_.clone(this.element), sousModele:this.sousModele});
    mdForm.result.then(x =>{
      this.element.ModeleLieId = x.ModeleLieId;
      this.element.ModeleLie = x.ModeleLie;
      this.initResume();
    }, ()=>{/*rien à faire si l'utilisateur annule !*/});
  }

}
