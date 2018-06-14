import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, forwardRef, ViewChild, Renderer2 } from '@angular/core';
import { TreeManager, ITreeContainer } from '../../../../utils/tree-manager';
import { UgoTreeNode } from '../../../tools/ugo-check-tree/ugo-tree-node';
import * as _ from 'lodash';
import { UniteTravail } from '../unite-travail';
import { UniteTravailService } from '../unite-travail.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-unite-travail-tree-select',
  templateUrl: './unite-travail-tree-select.component.html',
  styleUrls: ['./unite-travail-tree-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UniteTravailTreeSelectComponent),
      multi: true
    }
  ]
})
export class UniteTravailTreeSelectComponent implements ControlValueAccessor, OnInit, OnChanges, ITreeContainer {
  @ViewChild('mycontrol') mycontrol;
  @Input() disabled = false;
  @Input() required = false;
  
  unites: number[];
  @Input() multiSelect:boolean = true;

  treeConfig:TreeManager;
  private selectedNodes = new Array<UgoTreeNode>();
  private isFocused = false;
  onChange = (unites: number[]) => {}; // Function to call when the rating changes.
  onTouched = () => {}; // Function to call when the input is touched (when a star is clicked).

  constructor(private uniteSrv:UniteTravailService, private renderer: Renderer2) { 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.required)
        this.required = changes.required.currentValue;
    if (this.treeConfig)
        this.treeConfig.isRequired = this.required;
  }

  ngOnInit() {
      this.treeConfig = new TreeManager(this.toggleEditMode.bind(this));
      this.treeConfig.isRequired = this.required;
      this.loadData();
      this.toggleEditMode(false);
  }

  writeValue(obj: any): void {
    this.unites = obj;
    this.findCurrent();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;

    const div = this.mycontrol.nativeElement;
    const action = isDisabled ? 'addClass' : 'removeClass';
    this.renderer[action](div, 'disabled');
  }

  setFocused(){
    this.isFocused = true;
  }
  setTouched(){
      this.onTouched();
  }

  leaveControl(){
      if (this.isFocused)
          this.setTouched();
  }
  toggleClick(){
    this.setFocused();
    this.treeConfig.onSwitchMode();
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
    if (this.disabled) return;
    if (this.multiSelect || (this.multiSelect && node.checked))
      return;
    this.setFocused();
    _.each(this.treeConfig.tree, (el) => UgoTreeNode.foreachTreeNodeAction(el, (n) => n.checked = false));
}

  setEditValue(){
    this.findSelectedNodes();
    this.treeConfig.editValue = _.map(this.selectedNodes, o=>o.value.Code).join(", ");
  }

  afterCheckAction = function (node) {
    if (this.disabled) return;

    this.setEditValue();
    this.unites = _.map(this.selectedNodes,n=>n.value.Id);
    this.onUniteChange();
  }
    
  onUniteChange() {
    this.onChange(this.unites);
  }

}


