import { Component, OnInit, EventEmitter, AfterViewInit, Input, Output, DoCheck, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { UgoTreeNode } from './ugo-tree-node';
import * as _ from 'lodash';
import { ClickManager } from '../../../utils/click-manager';

@Component({
  selector: 'ugo-check-tree',
  templateUrl: './ugo-check-tree.component.html',
  styleUrls: ['./ugo-check-tree.component.css']
})
export class UgoCheckTreeComponent implements OnInit,AfterViewInit {
  private $checkClass = 'far fa-check-square fa-fw';
  private $uncheckClass = 'far fa-square fa-fw';
  private $expandClass = 'fas fa-chevron-right fa-fw';
  private $unexpandClass = 'fas fa-chevron-down fa-fw';
  private $clickAction = 'check expand';
  private $dblClickAction = 'expand';

  private checkOnClick:boolean;
  private expandOnClick:boolean;
  private checkOnDblClick:boolean;
  private expandOnDblClick:boolean;
  private labelClickable:boolean = false;
  private labelClickManager: ClickManager;

  private cancelClick = false;
  private clicked = false;
  
  @Input() nodes: UgoTreeNode[];
  @Input() checkable: boolean = true;
  @Input() expandable: boolean = true;
  @Input() showRacine: boolean = true;
  @Input() expandClass: string = this.$expandClass;
  @Input() unexpandClass: string = this.$unexpandClass;
  @Input() checkClass: string = this.$checkClass;
  @Input() uncheckClass: string = this.$uncheckClass;
  @Input() recursiveCheck: boolean = false;
  @Input() recursiveExpand: boolean = false;
  @Input() clickAction: string = this.$clickAction; //vide pour ne rien faire, check, expand, les deux
  @Input() dblClickAction: string = this.$dblClickAction; //vide pour ne rien faire, check, expand, les deux

  @Output() onBeforeCheck: EventEmitter<any> = new EventEmitter();
  @Output() onAfterCheck: EventEmitter<any> = new EventEmitter();
  @Output() onBeforeExpand: EventEmitter<any> = new EventEmitter();
  @Output() onAfterExpand: EventEmitter<any> = new EventEmitter();


  constructor() { 
    this.labelClickManager = new ClickManager(this.levelClick.bind(this), this.levelDblClick.bind(this));
  }

  ngOnInit() {
    const lowerClick = this.clickAction.toLowerCase();
    const lowerDoubl = this.dblClickAction.toLowerCase();
    this.checkOnClick = lowerClick.match('check') !== null;
    this.expandOnClick = lowerClick.match('expand') !== null;
    this.checkOnDblClick = lowerDoubl.match('check') !== null;
    this.expandOnDblClick = lowerDoubl.match('expand') !== null;
    this.labelClickable = this.expandOnClick || this.expandOnDblClick || this.checkOnClick || this.checkOnDblClick;
  }
  
  ngAfterViewInit(): void {
    this.initOriginalExpandState(this.nodes);
  }


  private initOriginalExpandState(elements:UgoTreeNode[]) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].setOriginalState()
        this.initOriginalExpandState(elements[i].childs);
    }
  }

  /**
   * Permet de remonter les events jusqu'au parent du premier ugo-check-tree
   * @param e Event à remonter
   * @param n Node initial qui a levé l'event
   */
  emitEvent(e:EventEmitter<any>, n:UgoTreeNode){
      e.emit(n);
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
