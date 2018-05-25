import { Component, OnInit, Input } from '@angular/core';
import { ElementBase } from '../element-base';

@Component({
  selector: 'app-element-menu',
  templateUrl: './element-menu.component.html',
  styleUrls: ['./element-menu.component.css']
})
export class ElementMenuComponent implements OnInit {
  @Input() element:ElementBase;
  constructor() { }

  ngOnInit() {
  }

}
