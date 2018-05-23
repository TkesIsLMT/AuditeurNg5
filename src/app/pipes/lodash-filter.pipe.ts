import { Pipe, PipeTransform } from '@angular/core';
//import { DynamicButton } from '../utils/dynamic-button';
import * as _ from 'lodash';

@Pipe({
  name: 'lodashFilter'
})
export class LodashFilterPipe implements PipeTransform {

  transform(data: Array<any>, args: any): any {
    return _.filter(data, args);
  }

  // transform(buttons: DynamicButton[], args?: any): any {
  //   return buttons.filter(b=>b.visible);
  // }

}
