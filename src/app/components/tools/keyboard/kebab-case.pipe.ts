import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyboardKebabCase',
  pure: false
})
export class KeyboardKebabCasePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/\s+/g, '-')
      .toLowerCase();
  }

}
