import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ElementBase } from '../../element-base';
import { ElementService } from '../../element.service';

@Component({
  selector: 'app-element-standard-action',
  templateUrl: './element-standard-action.component.html',
  styleUrls: ['./element-standard-action.component.css']
})
export class ElementStandardActionComponent implements OnInit {
  @Input() element:ElementBase;
  @Input() showEdit:boolean = true;
  @Input() showUp:boolean = true;
  @Input() showDown:boolean = true;
  @Input() showClear:boolean = true;
  @Input() showDelete:boolean = true;
  @Output() doAction:EventEmitter<string> = new EventEmitter<string>();

  constructor(private eleSrv:ElementService) { }

  ngOnInit() {
  }

  onAction(btn:string){
    this.doAction.emit(btn);
  }

  edit(){
    this.onAction('edit');
  }
  up(){
    this.eleSrv.upElement(this.element);
    this.onAction('up');
  }
  down(){
    this.eleSrv.downElement(this.element);
    this.onAction('down');
  }
  clear(){
    this.eleSrv.clearElement(this.element);
    this.onAction('clear');
  }
  delete(){
    this.eleSrv.deleteElement(this.element);
    this.onAction('delete');
  }
    
}
