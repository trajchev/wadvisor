import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculatePercentage'
})
export class CalculatePercentgePipe implements PipeTransform {

  transform(value: number, counterpart: number, args?: any): any {
    return Math.round((100 / (value + counterpart)) * value) + '%';
  }

}
