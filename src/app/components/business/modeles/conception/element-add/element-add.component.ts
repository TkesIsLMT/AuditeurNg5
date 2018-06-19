import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ElementBase } from '../../element-base';
import { TypeElement } from '../../../../../enums/type-element.enum';
import * as _ from 'lodash';
import { ElementService } from '../../element.service';

@Component({
  selector: 'app-element-add',
  templateUrl: './element-add.component.html',
  styleUrls: ['./element-add.component.css']
})
export class ElementAddComponent implements OnInit {
  @Input() element:ElementBase;
  @Input() captionVisible:boolean = true;
  @Output() add:EventEmitter<ElementBase> = new EventEmitter<ElementBase>()

  caption:string;
  types:TypeElement[]=[];
  private currentType:TypeElement;

  constructor(private eleSrv:ElementService) { }

  typeElementToString(type:TypeElement):string{
    return TypeElement[type].toString();
  }

  ngOnInit() {
    this.currentType = this.element ? this.element.TypeElement : TypeElement.Modele;
    this.types = this.initTypes();
    this.eleSrv.hasSousModele$.subscribe(res=>{
        if (!res)
          this.types = _.difference(this.types,[TypeElement.Modele]);
      },
        err=>console.log(err)
      );
    this.caption = `Ajouter dans '${this.typeElementToString(this.currentType)}'`;
  }

  initTypes(){
    if (_.isUndefined(this.element)){
      return [TypeElement.Modele, TypeElement.Menu, TypeElement.Tableau, TypeElement.Schema, TypeElement.Cellule];
    } else {
      return this.eleSrv.sousTypeAutorise(this.element.TypeElement);
    }
  }

  selectType(e, type:TypeElement){
    e.preventDefault();
    e.stopPropagation();

    let newEle = this.eleSrv.addNouvelElement(this.element, type, true);
    this.add.emit(newEle);
  }

}
