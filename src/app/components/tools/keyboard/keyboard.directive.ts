import { Directive, Input, Output, EventEmitter, ElementRef, Self, Optional, HostListener } from '@angular/core';
import { KeyboardRef } from './keyboard-ref.class';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { KeyboardService } from './keyboard.service';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[appKeyboard], textarea[appKeyboard]'
})
export class KeyboardDirective {

  private _keyboardRef: KeyboardRef<KeyboardComponent>;

  @Input() appKeyboard: string;

  @Input() darkTheme: boolean;

  @Input() duration: number;

  @Input() isDebug: boolean;

  @Output() enterClick: EventEmitter<void> = new EventEmitter<void>();

  @Output() capsClick: EventEmitter<void> = new EventEmitter<void>();

  @Output() altClick: EventEmitter<void> = new EventEmitter<void>();

  @Output() shiftClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _elementRef: ElementRef,
              private _keyboardService: KeyboardService,
              @Optional() @Self() private _control?: NgControl) {}

  ngOnDestroy() {
    this._hideKeyboard();
  }

  @HostListener('focus', ['$event'])
  private _showKeyboard() {
    this._keyboardRef = this._keyboardService.open(this.appKeyboard, {
      darkTheme: this.darkTheme,
      duration: this.duration,
      isDebug: this.isDebug
    });

    // reference the input element
    this._keyboardRef.instance.setInputInstance(this._elementRef);

    // set control if given, cast to smth. non-abstract
    if (this._control) {
      this._keyboardRef.instance.attachControl(this._control.control);
    }

    // connect outputs
    this._keyboardRef.instance.enterClick.subscribe(() => this.enterClick.next());
    this._keyboardRef.instance.capsClick.subscribe(() => this.capsClick.next());
    this._keyboardRef.instance.altClick.subscribe(() => this.altClick.next());
    this._keyboardRef.instance.shiftClick.subscribe(() => this.shiftClick.next());
  }

  @HostListener('blur', ['$event'])
  private _hideKeyboard() {
    if (this._keyboardRef) {
      this._keyboardRef.dismiss();
    }
  }

}