import { Component, OnInit, EventEmitter, AfterViewInit, Input, Output } from '@angular/core';
import { UgoTreeNode } from './ugo-tree-node';
import * as _ from 'lodash';
import { ClickManager } from '../../../utils/click-manager';

@Component({
  selector: 'ugo-check-tree',
  templateUrl: './ugo-check-tree.component.html',
  styleUrls: ['./ugo-check-tree.component.css']
})
export class UgoCheckTreeComponent implements OnInit,AfterViewInit {
  private $checkClass = 'far fa-check-square';
  private $uncheckClass = 'far fa-square';
  private $expandClass = 'fas fa-chevron-circle-up';
  private $unexpandClass = 'fas fa-chevron-circle-down';
  private $clickAction = 'check';
  private $dblClickAction = 'expand';


  private checkOnClick:boolean;
  private expandOnClick:boolean;
  private checkOnDblClick:boolean;
  private expandOnDblClick:boolean;
  
  private labelClickManager: ClickManager;

  private cancelClick = false;
  private clicked = false;
  
  @Input() nodes: UgoTreeNode[];
  @Input() checkable: boolean = true;
  @Input() expandable: boolean = true;
  @Input() showRacine: boolean = true;
  @Input() expandClass: string;
  @Input() unexpandClass: string;
  @Input() checkClass: string;
  @Input() uncheckClass: string;
  @Input() recursiveCheck: boolean = false;
  @Input() recursiveExpand: boolean = false;
  @Input() clickAction: string; //vide pour ne rien faire, check, expand, les deux
  @Input() dblClickAction: string; //vide pour ne rien faire, check, expand, les deux

  @Output() onBeforeCheck: EventEmitter<any> = new EventEmitter();
  @Output() onAfterCheck: EventEmitter<any> = new EventEmitter();
  @Output() onBeforeExpand: EventEmitter<any> = new EventEmitter();
  @Output() onAfterExpand: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.expandClass = this.$expandClass;
    this.unexpandClass = this.$unexpandClass;
    this.checkClass = this.$checkClass;
    this.uncheckClass = this.$uncheckClass;
    // on fait quoi sur level clic / dblclick ?
    this.clickAction = this.$clickAction;
    this.dblClickAction = this.$dblClickAction;

    this.labelClickManager = new ClickManager(this.levelClick.bind(this), this.levelDblClick.bind(this));
  }

  ngAfterViewInit(): void {
    const lowerClick = this.clickAction.toLowerCase();
    const lowerDoubl = this.dblClickAction.toLowerCase();
    this.checkOnClick = lowerClick.match('check') !== null;
    this.expandOnClick = lowerClick.match('expand') !== null;
    this.checkOnDblClick = lowerDoubl.match('check') !== null;
    this.expandOnDblClick = lowerDoubl.match('expand') !== null;
    this.initOriginalExpandState(this.nodes);
  }

  private initOriginalExpandState(elements:UgoTreeNode[]) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].setOriginalState()
        this.initOriginalExpandState(elements[i].childs);
    }
  }

isChkExpandVisible(chk) {
    return this.expandable && chk.expandable && this.hasChild(chk);
}

isChkCheckVisible(chk) {
    return this.checkable && chk.checkable;
}

isLineVisible(chk:UgoTreeNode):boolean {
  chk.setOriginalState();
  return (this.showRacine && chk.parent === undefined && chk.visible) || (chk.visible && chk.parent && chk.parent.expanded);
}

    levelClick(chk) {
      if (this.checkOnClick && chk.checkable)
        this.toggleCheck(chk);
      else if (this.expandOnClick && chk.expandable)
        this.toggleExpand(chk);
    }

    levelDblClick(chk) {
      if (this.checkOnDblClick && chk.checkable)
        this.toggleCheck(chk);
      else if (this.expandOnDblClick && chk.expandable)
        this.toggleExpand(chk);
    }

toggleCheckStart(chk) {
    this.onBeforeCheck.emit(chk);
    this.toggleCheckUnit(chk);
    this.onAfterCheck.emit(chk);
}

toggleCheck = this.toggleCheckStart;

toggleCheckUnit(chk, recursiveValue = undefined) {
    if (!chk.checkable)
        return;
    if (recursiveValue === undefined)
        chk.checked = !chk.checked;
    else
        chk.checked = recursiveValue;
    if (!chk.childs || !this.recursiveCheck)
        return;
    for (var i = 0; i < chk.childs.length; i++) {
      this.toggleCheckUnit(chk.childs[i], chk.checked);
    }
}

hasChild = function (chk) {
    return chk.hasDynamicChild || (chk.childs && chk.childs.length > 0);
}

toggleExpandStart(chk) {
    this.onBeforeExpand.emit(chk);
    this.toggleExpandUnit(chk);
    this.onAfterExpand.emit(chk);
}

toggleExpand = this.toggleExpandStart;
toggleExpandUnit(chk, recursiveValue = undefined) {
    var valChild = true;

    if (recursiveValue === undefined) {
        chk.expanded = !chk.expanded;
        chk.originalExpandState = chk.expanded;
        for (var i = 0; i < chk.childs.length; i++) {
            if (!this.hasChild(chk.childs[i]))
                chk.childs[i].originalExpandState = chk.expanded;
        }
        valChild = chk.expanded;
    }
    else {
        var value = recursiveValue;
        if (value && !this.recursiveExpand)
            value = chk.originalExpandState;
        chk.expanded = value;
        valChild = value;
    }
    if (!chk.childs || !chk.expandable)
        return;
    for (var i = 0; i < chk.childs.length; i++) {
       this.toggleExpandUnit(chk.childs[i], valChild);
    }
}
}
