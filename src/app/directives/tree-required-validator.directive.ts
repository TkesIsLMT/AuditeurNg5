
import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { tap, map } from 'rxjs/operators';
import { TreeManager, ITreeContainer } from '../utils/tree-manager';
import { UgoTreeNode } from '../components/tools/ugo-check-tree/ugo-tree-node';

@Directive({
  selector: '[appTreeRequired]',
  providers: [{provide: NG_VALIDATORS, useExisting: TreeRequiredValidatorDirective, multi: true}]
})
export class TreeRequiredValidatorDirective implements Validator{
  @Input('appTreeRequired') treeConfig : TreeManager;
  
  validate(c: AbstractControl): { [key: string]: any; } {
    const message = {
      'appTreeRequired':{
        'message':`Au moins un élément doit être sélectionné`
      }
    }
    
    const rst = this.treeConfig.isRequired && !this.treeConfig.hasValue();
    return rst ? message:null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    
  }
}
