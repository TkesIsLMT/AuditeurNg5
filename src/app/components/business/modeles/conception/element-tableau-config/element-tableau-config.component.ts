import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ElementBase } from '../../element-base';
import { TypeElement } from '../../../../../enums/type-element.enum';
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';

export interface entete {
  numero:number;
  libelle:string;
}

@Component({
  selector: 'app-element-tableau-config',
  templateUrl: './element-tableau-config.component.html',
  styleUrls: ['./element-tableau-config.component.css']
})
export class ElementTableauConfigComponent implements OnInit {
  element:ElementBase;
  private nombreColonne:number;
  private entetesColonne:entete[];

  constructor(private modalActive: NgbActiveModal) { 
    this.setElement(new ElementBase(TypeElement.Tableau));
  }

  ngOnInit() {
  }

  setElement(e:ElementBase): void {
    this.element = e;
    let pos = 1;
    if (this.element.Colonnes){
      this.entetesColonne = _.map(this.element.Colonnes.split(','), (c) => { let obj = {numero:pos++,libelle:c}; return obj;});
    } else {
      this.entetesColonne = [{numero:1,libelle:''}];
    }
    this.nombreColonne = this.entetesColonne.length;
  }

  redim(  ){
    if (this.nombreColonne<this.entetesColonne.length){
      this.entetesColonne.slice(0,this.nombreColonne);
    } else {
      do {
        this.entetesColonne.push({numero:this.entetesColonne.length+1, libelle:''});  
      } while (this.entetesColonne.length !== this.nombreColonne);
    }
  }

  submit(form:NgForm){
    if (form.invalid)
      return;
    this.element.Colonnes = _.map(this.entetesColonne, e=>e.libelle).join(',');
    this.modalActive.close(this.element);
  }
  cancel(key:string){
    this.modalActive.dismiss(key);
  }
}
