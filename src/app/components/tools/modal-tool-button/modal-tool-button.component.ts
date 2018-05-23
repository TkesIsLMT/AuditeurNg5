import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DynamicButton } from '../../../utils/dynamic-button';

@Component({
  selector: 'app-modal-tool-button',
  templateUrl: './modal-tool-button.component.html',
  styleUrls: ['./modal-tool-button.component.css']
})
export class ModalToolButtonComponent implements OnInit {
  @Input() buttons:DynamicButton[];
  @Output() buttonClick: EventEmitter<DynamicButton>;

  constructor() { this.buttonClick = new EventEmitter<DynamicButton>();}

  ngOnInit() {
    
  }

  onButtonClick(btn:DynamicButton){
    this.buttonClick.emit(btn);
  }

}
