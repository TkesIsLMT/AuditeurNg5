import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ElementBase } from '../element-base';
import { TypeElement } from '../../../../../enums/type-element.enum';
import * as _ from 'lodash';

@Component({
  selector: 'app-element-add',
  templateUrl: './element-add.component.html',
  styleUrls: ['./element-add.component.css']
})
export class ElementAddComponent implements OnInit {
  @Input() element:ElementBase;
  @Output() add:EventEmitter<ElementBase> = new EventEmitter<ElementBase>()
  caption:string;
  types:TypeElement[];
  private currentType:TypeElement;

  constructor() { }

  typeElementToString(type:TypeElement):string{
    return TypeElement[type].toString();
  }

  ngOnInit() {
    this.currentType = this.element ? this.element.TypeElement : TypeElement.Modele;
    this.types = this.initTypes();
    this.caption = `Ajouter dans '${this.typeElementToString(this.currentType)}'`;
  }

  initTypes(){
    if (_.isUndefined(this.element)){
      return [TypeElement.Modele, TypeElement.Menu, TypeElement.Tableau, TypeElement.Schema];
    } else {
      return this.initSousType(this.element.TypeElement);
    }
  }

  private initSousType(type:TypeElement) {
    switch (type) {
      case TypeElement.Modele: return [];
      case TypeElement.Menu: return [TypeElement.MenuItem];
      case TypeElement.MenuItem: return [TypeElement.Modele, TypeElement.Menu, TypeElement.Tableau, TypeElement.Cellule];
      case TypeElement.Tableau: return [TypeElement.Ligne];
      case TypeElement.Ligne: return [TypeElement.Cellule];
      case TypeElement.Cellule: return [];
      case TypeElement.Schema: return [TypeElement.SchemaPoint];
      case TypeElement.SchemaPoint: return [];
    }
  }

  selectType(type:TypeElement){
    const tab = this.initSousType(type);
    let newEle = new ElementBase(type);
    if (tab.length === 1){
      let bbEle = new ElementBase(tab[0])
      newEle.addChild(bbEle);
    }
    if (this.element){
      this.element.addChild(newEle);
    }
    this.add.emit(newEle);
  }

}
