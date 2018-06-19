import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[appMax][formControlName],[appMax][formControl],[appMax][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: MaxValidatorDirective, multi: true}]
})
export class MaxValidatorDirective implements Validator,OnChanges {
  //https://www.concretepage.com/angular-2/angular-4-min-max-validation
  @Input()
  appMax: number;

  onChange = ()=>{};

  registerOnValidatorChange?(fn: () => void): void {
    this.onChange = fn;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.appMax)
      this.onChange();
  }

  validate(c: FormControl): {[key: string]: any} {
    if (!this.appMax) 
      return null;
    const message = {
      'appMax':{
        'message':`La valeur ne peut être supérieure à ${this.appMax.toString()}`
      }
    }
    let v = c.value;
    return (v > this.appMax) ? message : null;
  }
} 