import { Component, OnInit, Input } from '@angular/core';
import { ElementBase } from '../element-base';
import { TypeElement } from '../../../../../enums/type-element.enum';
import { ElementService } from '../element.service';

@Component({
  selector: 'app-element-ligne',
  templateUrl: './element-ligne.component.html',
  styleUrls: ['./element-ligne.component.css']
})
export class ElementLigneComponent implements OnInit {
  @Input() element:ElementBase;

  constructor(private eleSrv:ElementService) { }

  ngOnInit() {
  }

  addCellule(){
    this.eleSrv.addNouvelElement(this.element, TypeElement.Cellule);
  }
}
