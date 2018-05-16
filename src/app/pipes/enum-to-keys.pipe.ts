import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToKeys'
})
export class EnumToKeysPipe implements PipeTransform {

  transform(value): string[] {
    let k = Object.keys(value);
    return k.slice(k.length / 2)
  }

}
