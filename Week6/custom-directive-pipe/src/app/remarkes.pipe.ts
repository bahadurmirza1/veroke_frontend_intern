import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'remarkes',
  standalone: true
})
export class RemarkesPipe implements PipeTransform {

  transform(value: number): string {
    if (value==1){
      return 'Good'
    }else if(value==2){
      return 'Better'
    }else if(value==3){
      return 'Great'
    }
    else{
      return 'unknown';
    }    
  }

}
