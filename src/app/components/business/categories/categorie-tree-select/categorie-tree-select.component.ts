import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CategorieService } from '../categorie.service';
import { CategorieDetail } from '../categorie-detail';
import { TreeManager } from '../../../../utils/tree-manager';
import { UgoTreeNode } from '../../../tools/ugo-check-tree/ugo-tree-node';
import * as _ from 'lodash';

@Component({
  selector: 'app-categorie-tree-select',
  templateUrl: './categorie-tree-select.component.html',
  styleUrls: ['./categorie-tree-select.component.css']
})
export class CategorieTreeSelectComponent implements OnInit,OnChanges {
  @Input() categorie: CategorieDetail;
  @Output() categorieChange: EventEmitter<CategorieDetail> = new EventEmitter<CategorieDetail>();

  treeConfig:TreeManager;

  constructor(private catSrv:CategorieService) { 
  }

  ngOnInit() {
      this.treeConfig = new TreeManager(this.toggleEditMode.bind(this));
      this.loadData();
      this.toggleEditMode(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.categorie)
      this.findCurrent();
  }

  findCurrent(){
    if (this.categorie){
      this.treeConfig.editValue = this.categorie.Code;
      TreeManager.searchNodeAndDo(this.categorie.Id, this.treeConfig.tree, n =>{
        n.checked = true;
        UgoTreeNode.foreachTreeNodeAction(n, o=>o.expanded = true, true);
      });
    }
  }
  
  loadData() {
    this.treeConfig.isLoading = true;
    this.catSrv.arbreCategorie.subscribe(res=>{
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
      if (node.checked)
          return;
      _.each(this.treeConfig.tree, (el) => UgoTreeNode.foreachTreeNodeAction(el, (n) => n.checked = false));
  }

  afterCheckAction = function (node) {
      this.categorie = node.checked ? node.value : null;
      this.treeConfig.editValue = this.categorie ? this.categorie.Code : undefined;
      this.onCategorieChange();
  }
    
  onCategorieChange() {
    this.categorieChange.emit(this.categorie);
  }



}


