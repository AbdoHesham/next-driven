import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CloseTime'
})
export class CloseTimePipe implements PipeTransform {

  transform(value: any): any {

    return value;
  }

}
