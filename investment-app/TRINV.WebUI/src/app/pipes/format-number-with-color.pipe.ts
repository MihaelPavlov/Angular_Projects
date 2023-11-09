import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "numberFormatForCandle"
})
export class FormatNumberWithColorPipe implements  PipeTransform{
  transform(value: number | undefined): string {
    if (value == undefined){
      return '';
    }

    return value >= 0 ? 'text-green' : 'text-red';
  }

}
