import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "formatNumber"
})
export class FormatNumberPipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (value != undefined) {
      return (Math.round(value * 100) / 100).toFixed(2);
    }
    return 'None';
  }

}
