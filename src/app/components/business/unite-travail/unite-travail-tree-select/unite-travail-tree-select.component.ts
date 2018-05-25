import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TreeManager } from '../../../../utils/tree-manager';
import { UgoTreeNode } from '../../../tools/ugo-check-tree/ugo-tree-node';
import * as _ from 'lodash';
import { UniteTravail } from '../unite-travail';
import { UniteTravailService } from '../unite-travail.service';

@Component({
  selector: 'app-unite-travail-tree-select',
  templateUrl: './unite-travail-tree-select.component.html',
  styleUrls: ['./unite-travail-tree-select.component.css']
})
export class UniteTravailTreeSelectComponent implements OnInit, OnChanges {
  @Input() unites: number[];
  @Input() multiSelect:boolean = true;
  @Output() unitesChange: EventEmitter<number[]> = new EventEmitter<number[]>();

  treeConfig:TreeManager;
  private selectedNodes = new Array<UgoTreeNode>();

  constructor(private uniteSrv:UniteTravailService) { 
  }

  ngOnInit() {
      this.treeConfig = new TreeManager(this.toggleEditMode.bind(this));
      this.loadData();
      this.toggleEditMode(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.unites)
      this.findCurrent();
  }

  findCurrent(){
    if (this.unites){
      _.each(this.unites, ut=>
      TreeManager.searchNodeAndDo(ut, this.treeConfig.tree, n =>{
        n.checked = true;
        UgoTreeNode.foreachTreeNodeAction(n, no=>no.expanded = true, true);
      }));
      this.setEditValue();
    }
  }

  findSelectedNodes(){
    this.selectedNodes.splice(0,this.selectedNodes.length);
    UgoTreeNode.foreachTreeNodeAction(this.treeConfig.tree, n=> { if (n.checked) this.selectedNodes.push(n)});
  }
  
  loadData() {
    this.treeConfig.isLoading = true;
    this.uniteSrv.arbreUniteTravail.subscribe(res=>{
      this.treeConfig.tree = res;
      this.findCurrent();
      this.treeConfig.isLoading = false;
    }, err=>{
      console.log(err);
      this.treeConfig.isLoading=false;
    });
  }

  toggleEditMode(forceValue) {
    return TreeManager.toggleTreeEdit(this.treeConfig, forceValue);
  }

  beforeCheckAction = function (node) {
    if (!this.multiSelect || node.checked)
      return;
    _.each(this.treeConfig.tree, (el) => UgoTreeNode.foreachTreeNodeAction(el, (n) => n.checked = false));
}

  setEditValue(){
    this.findSelectedNodes();
    this.treeConfig.editValue = _.map(this.selectedNodes, o=>o.value.Code).join(", ");
  }

  afterCheckAction = function (node) {
      this.setEditValue();
      this.unites = _.map(this.selectedNodes,n=>n.value.Id);
      this.onUniteChange();
  }
    
  onUniteChange() {
    this.unitesChange.emit(this.unites);
  }

}


