import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TreeManager } from '../../../../utils/tree-manager';
import { UgoTreeNode } from '../../../tools/ugo-check-tree/ugo-tree-node';
import * as _ from 'lodash';
import { PiDetail } from '../pi-detail';
import { PiService } from '../pi.service';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pi-tree-select',
  templateUrl: './pi-tree-select.component.html',
  styleUrls: ['./pi-tree-select.component.css']
})
export class PiTreeSelectComponent implements  OnInit,OnChanges {
  @Input() piwebid: string;
  @Output() piwebidChange: EventEmitter<string> = new EventEmitter<string>();

  treeConfig:TreeManager;

  private piRootWebId = environment.piRootWebId;
  private prefixeToRemove = environment.piRootAddress;
  private racine:UgoTreeNode;
  private startingBranch: PiDetail[];
  private startingRoot:UgoTreeNode;
  private startingNode:UgoTreeNode;
  private isFirstExpand = true;
  private selectedElement:PiDetail;
  private isUserCheckAction = false;
  private isLoadingBranche = false;

  constructor(private piSrv:PiService) { 
  }

  ngOnInit() {
      this.treeConfig = new TreeManager(this.toggleEditMode.bind(this));
      this.loadRacine();
      this.toggleEditMode(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.piwebid && changes.piwebid.currentValue != changes.piwebid.previousValue){
        if (!_.isNil(this.piwebid)){
            this.loadStartingBranch();
        }
    }
  }

  reexpandStartingNode(node) {
    if (!node) return;
      this.beforeExpandAction(node);
    if (node.childs && node.childs.length === 1)
      this.reexpandStartingNode(node.childs[0]);
  }

  toggleEditMode(forceValue) {
    if (this.startingRoot && this.isFirstExpand) {
        this.reexpandStartingNode(this.startingRoot);
        this.isFirstExpand = false;
    }
    return TreeManager.toggleTreeEdit(this.treeConfig, forceValue);
  }
  
  loadRacine() {
    this.treeConfig.isLoading = true;
    this.racine = new UgoTreeNode(this.piRootWebId,"UGO");
    this.racine.expanded = true;
    this.createChildren(this.racine).subscribe(() => {
        if (!_.isNil(this.piwebid))
            this.loadStartingBranch();
        else
            this.finalizeLoading();
    });
  }

  finalizeLoading() {
    this.treeConfig.tree = this.racine.childs;
    this.treeConfig.isLoading = this.isLoadingBranche; // false;
  }

  loadStartingBranch() {
    if (this.isUserCheckAction) 
        return;
    this.treeConfig.isLoading = true;
    this.isLoadingBranche = true;
    this.piSrv.getPiBranche(this.piwebid).subscribe(res => {
        this.startingBranch = res;
        let lstNodes = [];
        _.each(this.startingBranch, el => {
            if (el.WebId != this.racine.id) {
                let node:UgoTreeNode = this.createNode(el);
                node.additionalProperty.partialLoad = true;
                node.checked = (node.id === this.piwebid);
                lstNodes.push(node);
            }
        });
        _.each(lstNodes, node => {
            let parentNode:UgoTreeNode = _.find(lstNodes, ['id', node.value.ParentWebId]);
            if (parentNode){
                parentNode.expanded = true;
                parentNode.addChild(node);
            }
        })
        this.startingRoot = _.find(lstNodes, n => n.parent === undefined );
        this.startingNode = _.find(lstNodes, ['id', this.piwebid]);

        if (this.startingRoot) {
            var index = -1;
            for (var i = 0; i < this.racine.childs.length; i++) {
                if (this.racine.childs[i].id === this.startingRoot.id)
                    index = i;
            }
            if (index > -1) {
                this.racine.childs.splice(index, 1, this.startingRoot);
            }
            if (this.startingNode) {
                this.changeCurrentElement(this.startingNode.value, false);
            }
        }
        this.isUserCheckAction = false;
        this.isLoadingBranche = false;
        this.finalizeLoading();
    },
    error => console.log(error));
  }


  createChildren(parentNode:UgoTreeNode) :Observable<void> {
      var webId = parentNode.id,
          typeEle = "Element",
          isPartialLoad = parentNode.additionalProperty.partialLoad;
  
      if (parentNode.value && parentNode.value.IsAttribut)
          typeEle = "Attribut";
      parentNode.additionalProperty.partialLoad = false;
  
      return this.piSrv.getPiRelation(webId, typeEle).pipe(map(res => {
          _.each(res, item => {
              var existant = isPartialLoad && _.find(parentNode.childs, s => s.id === item.WebId);
              if (!existant) {
                  parentNode.addChild(this.createNode(item));
              }
          });
          parentNode.childs = _.sortBy(parentNode.childs, function (el) {
              return ('' + el.value.IsAttribut) + el.value.Name;
          });
      }));
  }
  createNode(item:PiDetail):UgoTreeNode {
    let node = new UgoTreeNode(item.WebId, item.Name, item);
    let hasChild = item.HasChildren || item.IsElement;
    node.nodeClass = "pi-" + (item.IsElement ? "element" : "attribut");
    node.checkable = item.IsAttribut;
    node.expanded = false;
    node.expandable = hasChild;
    node.hasDynamicChild = hasChild;
    node.additionalProperty = { partialLoad:false };
    return node;
  }

  beforeExpandAction = function (node:UgoTreeNode) {
    if (node.expanded && !node.additionalProperty.partialLoad)
        return;
    if ((node.hasDynamicChild && node.childs.length === 0) || node.additionalProperty.partialLoad) {
        var sauv = node.label;
        node.label += " (loading...)"
        this.createChildren(node).subscribe(() => node.label = sauv, erreur => node.label="!erreur de chargement!");
    }
  }

  beforeCheckAction = function (node:UgoTreeNode) {
    if (node.checked || !node.checkable)
        return;
    UgoTreeNode.foreachTreeNodeAction(this.treeConfig.tree, n=>n.checked = false);
  }

  afterCheckAction = function (node:UgoTreeNode) {
    this.isUserCheckAction = true;
    this.changeCurrentElement((node.checkable && node.checked) ? node.value : null, true);
  }

  changeCurrentElement(newValue:PiDetail, launch:boolean) {
    this.selectedElement = newValue;
    if (this.selectedElement)
        this.treeConfig.editValue = this.selectedElement.Path.replace(this.prefixeToRemove, '');
    else
        this.treeConfig.editValue = undefined;
    if (launch)
        this.onPiChange();
  }

  onPiChange() {
    this.piwebidChange.emit(this.selectedElement ? this.selectedElement.WebId : undefined);
  }
}





