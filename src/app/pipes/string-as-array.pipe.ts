import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringAsArray'
})
export class StringAsArrayPipe implements PipeTransform {

  transform(value: string, args: string = ","): any {
    if (value)
      return value.split(args);

    return value;
  }

}
