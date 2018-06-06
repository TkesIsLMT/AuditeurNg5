import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ElementBase } from '../../element-base';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElementCelluleConfigComponent } from '../element-cellule-config/element-cellule-config.component';
import * as _ from 'lodash';
import { ElementService } from '../../element.service';
import { PointDetail } from '../../../points/point-detail';

@Component({
  selector: 'app-element-cellule',
  templateUrl: './element-cellule.component.html',
  styleUrls: ['./element-cellule.component.css'],
})
export class ElementCelluleComponent implements OnInit {
  @Input() element:ElementBase;
  @Input() pointsDispo:PointDetail[] = [];
  
  resume:string;
  constructor(private modalService:NgbModal, private eleSrv: ElementService) { }

  ngOnInit() {
    if (this.element.PointControle){
      this.initResume();
    } else {
      this.eleSrv.bindElement(this.element).subscribe(e=>this.initResume());
    }
  }
   
  private initResume() {
    let s:string = '';
    if (this.element.PointControle){
      s = this.element.PointControle.Libelle;
    } else if (this.element.Libelle){
      s = this.element.Libelle;
    } else {
      s = 'à configurer';
    }
    this.resume = "Cellule : " + s;
  }

  do(action:string){
    if (action === 'edit'){
      this.openEdit();
    }
  }
  openEdit() {
    const mdForm = this.modalService.open(ElementCelluleConfigComponent);
    mdForm.componentInstance.setContext({ele:_.clone(this.element),srv:this.eleSrv});
    mdForm.result.then(x => {
      this.element.PointControleId = x.PointControleId
      this.element.PointControle = x.PointControle;
      this.element.EstObligatoire = x.EstObligatoire;
      this.element.EstCommentable = x.EstCommentable;
      this.element.EstLiableATL = x.EstLiableATL;
      this.element.Libelle = x.Libelle;
      this.initResume();
    }, ()=>{/*rien à faire si l'utilisateur annule !*/});
  }
}
