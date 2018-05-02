import { Component, OnInit, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-show-errors',
  template: `
   <div *ngIf="shouldShowErrors()" class="text-danger small">
     <div *ngFor="let error of listOfErrors()">* {{error}}</div>
   </div>
 `,
  styleUrls: ['./show-errors.component.css']
})
export class ShowErrorsComponent {

//source : https://www.toptal.com/angular-js/angular-4-forms-validation

  private static readonly errorMessages = {
    'required': () => 'Le champ est obligatoire',
    'minlength': (params) => 'La longueur minimale est de ' + params.requiredLength,
    'maxlength': (params) => 'La longueur maximale est de ' + params.requiredLength,
    'pattern': (params) => 'Le format requis est : ' + params.requiredPattern,
    'uniqueValue': (params) => params.message,
  };
 
  @Input()
  private control: AbstractControlDirective | AbstractControl;
 
  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }
 
  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }
 
  private getMessage(type: string, params: any) {
    return ShowErrorsComponent.errorMessages[type](params);
  }
}
