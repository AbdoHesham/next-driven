import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'partOrNot'
})
export class PartOrNotPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value==Math.floor(value))
    return false;
    else
    return true;
  }

}
