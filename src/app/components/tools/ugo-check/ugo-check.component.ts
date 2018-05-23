import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ugo-check',
  templateUrl: './ugo-check.component.html',
  styleUrls: ['./ugo-check.component.css']
})
export class UgoCheckComponent {
  @Input() isSelected: boolean;
  @Output() isSelectedChange:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() isToggleOnKeypress: boolean = true;
  @Input() checkedClass: string = 'far fa-check-square';
  @Input() uncheckedClass: string = 'far fa-square';

  @Output() onToggle :EventEmitter<any> = new EventEmitter();

  runOnToggle(){
      this.onToggle.emit(null);
      this.isSelectedChange.emit(!this.isSelected);
  }
  runOnKeyDown(e) {
      console.log(e);
      if (this.isToggleOnKeypress === false)
          return;
      if (e.keyCode === 32) {
          e.preventDefault();
          this.runOnToggle();
      }
  }
}
