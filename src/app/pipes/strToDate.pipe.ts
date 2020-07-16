import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'strToDate'
})
export class StrToDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return moment(value).format('H:mm | DD.MM.YYYY');
  }

}
