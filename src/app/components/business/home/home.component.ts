import { Component, OnInit } from '@angular/core';
import { UgoTreeNode } from '../../tools/ugo-check-tree/ugo-tree-node';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tree:UgoTreeNode[];
  check: boolean = true;
  constructor() { }

  ngOnInit() {
    let node = new UgoTreeNode("1", "niveau 1");
    node.addChild(new UgoTreeNode("11","niveau 11")).addChild(new UgoTreeNode("111","niveau 1-1-1")).addChild(new UgoTreeNode("111a","niveau 1-1-1-a"));
    node.addChild(new UgoTreeNode("12","niveau 12"));
    this.tree = [ node ];
  }

  toggle(){
    this.check = !this.check;
  }
}
