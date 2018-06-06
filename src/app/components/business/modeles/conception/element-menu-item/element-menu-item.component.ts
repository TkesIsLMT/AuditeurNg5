import { Component, OnInit, Input } from '@angular/core';
import { ElementBase } from '../../element-base';

@Component({
  selector: 'app-element-menu-item',
  templateUrl: './element-menu-item.component.html',
  styleUrls: ['./element-menu-item.component.css']
})
export class ElementMenuItemComponent implements OnInit {
  @Input() element:ElementBase;

  constructor() { }

  ngOnInit() {
  }
}
