import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "formatNumber"
})
export class FormatNumberPipe implements PipeTransform {
  transform(value: number | undefined): string {


    if (value == undefined) {
      return '';
    }

    const suffixes = ['', 'K', 'M', 'B', 'T']; // You can add more suffixes as needed

    const round = (num: number, precision: number) => {
      const factor = Math.pow(10, precision);
      return Math.round(num * factor) / factor;
    };

    let tier = Math.log10(Math.abs(value)) / 3 | 0;

    if (tier === 0) {
      return (Math.round(value * 100) / 100).toFixed(2).toString();
    }

    const suffix = suffixes[tier];
    const scaled = value / Math.pow(1000, tier);

    if (suffix != undefined){

    return `${round(scaled, 3)}${suffix}`;
    }
    else{
      return `${round(scaled, 3)}`;
    }
  }

}
