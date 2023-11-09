export enum Currency{
  Dollar = 0,
  Euro = 1,
  BulgarianLev=2,
  Pound=3
}

export function getCurrencyLabel(currency: number): string {
  switch (currency) {
    case Currency.Dollar :
      return 'Dollar';
    case Currency.Euro:
      return 'Euro';
    case Currency.BulgarianLev:
      return 'Bulgarian Lev';
    case Currency.Pound:
      return 'Pound';
    default:
      return 'Unknown Currency';
  }
}

export function getCurrencySymbol(currency: number): string {
  switch (currency) {
    case Currency.Dollar :
      return '$';
    case Currency.Euro:
      return '€';
    case Currency.BulgarianLev:
      return 'лв';
    case Currency.Pound:
      return '£';
    default:
      return 'Unknown Currency';
  }
}
