import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, forwardRef, ViewChild, Renderer2 } from '@angular/core';
import { CategorieService } from '../categorie.service';
import { CategorieDetail } from '../categorie-detail';
import { TreeManager, ITreeContainer } from '../../../../utils/tree-manager';
import { UgoTreeNode } from '../../../tools/ugo-check-tree/ugo-tree-node';
import * as _ from 'lodash';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-categorie-tree-select',
  templateUrl: './categorie-tree-select.component.html',
  styleUrls: ['./categorie-tree-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategorieTreeSelectComponent),
      multi: true
    }
  ]
})
export class CategorieTreeSelectComponent implements ControlValueAccessor, OnInit, OnChanges, ITreeContainer {
  @ViewChild('mycontrol') mycontrol;
  @Input() disabled = false;
  @Input() required = false;

  categorie: CategorieDetail;
  treeConfig:TreeManager;
  private isFocused = false;
  onChange = (categorie: CategorieDetail) => {}; // Function to call when the rating changes.
  onTouched = () => {}; // Function to call when the input is touched (when a star is clicked).

  constructor(private catSrv:CategorieService, private renderer: Renderer2) { 
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.required){
      this.required = changes.required.currentValue;
      if (this.treeConfig)
        this.treeConfig.isRequired = this.required;
    }
  }

  ngOnInit() {
      this.treeConfig = new TreeManager(this.toggleEditMode.bind(this));
      this.treeConfig.isRequired = this.required;
      this.loadData();
      this.toggleEditMode(false);
  }

  writeValue(obj: any): void {
    this.categorie = obj;
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
    if (this.categorie){
      this.treeConfig.editValue = this.categorie.Code;
      TreeManager.searchNodeAndDo(this.categorie.Id, this.treeConfig.tree, n =>{
        n.checked = true;
        UgoTreeNode.foreachTreeNodeAction(n, o=>o.expanded = o.visible = true, true);
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
    if (this.disabled) return;
    if (node.checked) return;
    this.setFocused();
    _.each(this.treeConfig.tree, (el) => UgoTreeNode.foreachTreeNodeAction(el, (n) => n.checked = false));
  }

  afterCheckAction = function (node) {
    if (this.disabled) return;

    this.categorie = node.checked ? node.value : null;
    this.treeConfig.editValue = this.categorie ? this.categorie.Code : undefined;
    this.onCategorieChange();
  }
    
  onCategorieChange() {
    this.onChange(this.categorie);
  }



}


