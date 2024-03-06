import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coutdomntimer'
})
export class CoutdomntimerPipe implements PipeTransform {

  transform(value: any): number {
      
     var x= (new Date().getTime()-new Date(value).getTime())/1000;
  
    if (((new Date(value).getTime()-new Date().getTime())/1000)<0)
    return ((new Date().getTime()-new Date(value).getTime())/1000);
    else
    return((new Date(value).getTime()-new Date().getTime())/1000);

  }

}
