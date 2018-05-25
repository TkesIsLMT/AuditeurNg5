import { Component, OnInit, Input } from '@angular/core';
import { ElementBase } from '../element-base';
import { TypeElement } from '../../../../../enums/type-element.enum';

@Component({
  selector: 'app-element-base',
  templateUrl: './element-base.component.html',
  styleUrls: ['./element-base.component.css']
})
export class ElementBaseComponent implements OnInit {
  @Input() element:ElementBase;
  constructor() { }

  ngOnInit() {
  }
}
