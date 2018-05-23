import { Pipe, PipeTransform } from '@angular/core';
import { DynamicButton } from '../utils/dynamic-button';

@Pipe({
  name: 'visibleDynamicButton'
})
export class VisibleDynamicButtonPipe implements PipeTransform {

  transform(buttons: DynamicButton[], args?: any): any {
    return buttons.filter(b=>b.visible);
  }

}
