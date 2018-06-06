import { Component, OnInit, Input } from '@angular/core';
import { TypeElement } from '../../../../../enums/type-element.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElementTableauConfigComponent } from '../element-tableau-config/element-tableau-config.component';
import * as _ from 'lodash';
import { ElementBase } from '../../element-base';
import { ElementService } from '../../element.service';

@Component({
  selector: 'app-element-tableau',
  templateUrl: './element-tableau.component.html',
  styleUrls: ['./element-tableau.component.css']
})
export class ElementTableauComponent implements OnInit {
  @Input() element:ElementBase;
  constructor(private eleSrv:ElementService, private modalService:NgbModal) { }

  ngOnInit() {
  }

  addLigne(){
    let ligne = this.eleSrv.addNouvelElement(this.element, TypeElement.Ligne);
    this.eleSrv.addNouvelElement(ligne, TypeElement.Cellule);
  }

  do(action:string){
    if (action === 'edit') 
      this.openEdit();
  }
  openEdit() {
    const mdForm = this.modalService.open(ElementTableauConfigComponent);
    mdForm.componentInstance.setElement(_.clone(this.element));
    mdForm.result.then(x => this.element.Colonnes = x.Colonnes, ()=>{/*rien à faire si l'utilisateur annule !*/});
  }
}
