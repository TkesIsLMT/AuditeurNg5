import { Directive, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { tap, map } from 'rxjs/operators';

@Directive({
  selector: '[uniqueValue]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueValidatorDirective, multi: true}]
})
export class UniqueValidatorDirective implements Validator{
  @Input('uniqueValue') backendCall : (value:any) => Observable<boolean>;
  
  validate(c: AbstractControl): { [key: string]: any; } {
    const message = {
      'uniqueValue':{
        'message':`Le champ n'est pas unique`
      }
    }

    return this.backendCall(c.value).pipe(map((rst)=> rst ? null:message));
    // ou avec une promise plutôt qu'un observable...
    //return this.backendCall(c.value).toPromise().then((rst)=> rst ? null:message);
  }
  registerOnValidatorChange?(fn: () => void): void {
    
  }
}
