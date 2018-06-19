import { Component, OnInit, Input } from '@angular/core';
import { ElementBase } from '../../element-base';
import { TypeElement } from '../../../../../enums/type-element.enum';
import { ElementService } from '../../element.service';

@Component({
  selector: 'app-element-menu',
  templateUrl: './element-menu.component.html',
  styleUrls: ['./element-menu.component.css']
})
export class ElementMenuComponent implements OnInit {
  @Input() element:ElementBase;

  constructor(private eleSrv:ElementService) { }

  ngOnInit() {
  }

  addItem(){
    this.eleSrv.addNouvelElement(this.element,TypeElement.MenuItem);
  }
}
