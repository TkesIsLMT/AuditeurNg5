import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TypeElement } from '../../../../../enums/type-element.enum';
import * as _ from 'lodash';
import { ModeleDetail } from '../../modele-detail';
import { PointDetail } from '../../../points/point-detail';
import { ElementBase } from '../../element-base';

@Component({
  selector: 'app-element-base',
  templateUrl: './element-base.component.html',
  styleUrls: ['./element-base.component.css']
})
export class ElementBaseComponent implements OnInit {
  @Input() element:ElementBase;
  @Input() modele:ModeleDetail;
  private isExpanded:boolean = true;
  
  constructor() { }

  ngOnInit() {

  }

  titreElement(){
    let str = '';
    if (this.element){
      if (this.element.Libelle) {
        str += this.element.Libelle;
      } else {
        str += TypeElement[this.element.TypeElement];
      } 
      if (this.element.childs) {
        str += ` (${this.element.childs.length} sous-élément/s)`;
      }
    }
    return str;
  }

}
