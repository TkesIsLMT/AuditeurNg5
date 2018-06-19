import { Directive, Input, HostListener, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: 'input[appMin][formControlName],input[appMin][formControl],input[appMin][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinValidatorDirective, multi: true}]
})
export class MinValidatorDirective implements Validator,OnChanges {
  //https://www.concretepage.com/angular-2/angular-4-min-max-validation
  @Input()
  appMin: number;

  constructor(private el:ElementRef){}

  onChange = ()=>{};
  
  registerOnValidatorChange?(fn: () => void): void {
    this.onChange = fn;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.appMin)
      this.onChange();
  }

  validate(c: FormControl): {[key: string]: any} {
    if (!this.appMin) 
      return null;
    const message = {
      'appMin':{
        'message':`La valeur ne peut être inférieure à ${this.appMin.toString()}`
      }
    }

    let v = c.value;
    return (v < this.appMin) ? message : null;
  }

} 